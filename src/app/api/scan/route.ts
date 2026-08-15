import { NextRequest, NextResponse } from 'next/server';
import { analyzeResume } from '@/lib/ai-analyzer';
import mammoth from 'mammoth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let resumeText = '';
    let fileName = 'resume.pdf';
    let fileSize = 20000;
    let jobDescription: string | undefined;
    let targetRole: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const directText = formData.get('text') as string | null;
      jobDescription = (formData.get('jobDescription') as string) || undefined;
      targetRole = (formData.get('targetRole') as string) || undefined;

      if (file && typeof file !== 'string') {
        fileName = file.name || 'resume.pdf';
        fileSize = file.size || 20000;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (fileName.toLowerCase().endsWith('.pdf')) {
          try {
            // Use pdf-parse
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const pdfParse = require('pdf-parse');
            const data = await pdfParse(buffer);
            resumeText = data.text;
          } catch (e) {
            console.warn('PDF parsing error, attempting raw text extraction:', e);
            resumeText = buffer.toString('utf-8');
          }
        } else if (fileName.toLowerCase().endsWith('.docx')) {
          try {
            const docxResult = await mammoth.extractRawText({ buffer });
            resumeText = docxResult.value;
          } catch (e) {
            console.warn('DOCX parsing error:', e);
            resumeText = buffer.toString('utf-8');
          }
        } else {
          resumeText = buffer.toString('utf-8');
        }
      } else if (directText) {
        resumeText = directText;
      }
    } else {
      const body = await req.json();
      resumeText = body.text || '';
      fileName = body.fileName || 'resume.pdf';
      fileSize = body.fileSize || 20000;
      jobDescription = body.jobDescription || undefined;
      targetRole = body.targetRole || undefined;
    }

    if (!resumeText || resumeText.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide at least 20 characters of resume content.' },
        { status: 400 }
      );
    }

    const result = await analyzeResume(resumeText, fileName, fileSize, jobDescription, targetRole);
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('Scan API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to scan resume';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
