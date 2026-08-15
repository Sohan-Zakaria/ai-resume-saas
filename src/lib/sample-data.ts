import { ResumeData, ScanResult } from './types';

export const SAMPLE_RESUMES: Record<string, { label: string; role: string; data: ResumeData; rawText: string }> = {
  software_engineer: {
    label: 'Senior Full Stack Engineer',
    role: 'Senior Software Engineer',
    rawText: `Alex Chen
San Francisco, CA | alex.chen@example.com | (555) 382-9910 | linkedin.com/in/alexchen-dev | github.com/alexchen

SUMMARY
Results-driven Senior Full-Stack Engineer with 6+ years of experience designing high-scale SaaS architectures and microservices. Expert in TypeScript, React, Next.js, Node.js, and AWS. Spearheaded migration that decreased cloud infrastructure costs by 34% and accelerated CI/CD build speeds by 3x.

EXPERIENCE
Senior Full Stack Engineer | CloudScale Technologies | San Francisco, CA
03/2022 - Present
- Architected and deployed microservices handling 25M+ daily API requests using Node.js, Redis, and PostgreSQL, maintaining 99.99% uptime.
- Led front-end modernization to Next.js 14 and Tailwind CSS, reducing First Contentful Paint by 42% and increasing mobile user conversion by 18%.
- Mentored team of 6 engineers, standardizing code review practices and reducing production bug escalations by 28%.
- Integrated Stripe billing and automated tax calculation pipeline processing $4.2M in annual recurring revenue.

Software Engineer | FinFlow Systems | Austin, TX
06/2019 - 02/2022
- Developed secure transaction monitoring dashboard in React and TypeScript used by 12,000+ financial analysts.
- Optimized PostgreSQL database queries and indexing strategies, reducing median query execution latency from 850ms to 45ms.
- Built automated test suites using Jest and Cypress achieving 92% code coverage across critical payment pathways.

EDUCATION
B.S. in Computer Science | University of California, Berkeley
09/2015 - 05/2019 | GPA: 3.82

SKILLS
- Languages: TypeScript, JavaScript, Python, Go, SQL, HTML5, CSS3
- Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS, GraphQL, Redux
- Cloud & DevOps: AWS (ECS, Lambda, S3, RDS), Docker, Kubernetes, GitHub Actions, Terraform
- Databases & Tools: PostgreSQL, Redis, MongoDB, Git, Datadog, Jest, Vitest

PROJECTS
DevPulse - Real-time Infrastructure Monitoring Tool (github.com/alexchen/devpulse)
- Built open-source telemetry dashboard monitoring cluster health with WebSockets and Go, receiving 1,200+ GitHub stars.`,
    data: {
      id: 'res_sample_swe',
      title: 'Full Stack Engineer Resume',
      lastModified: new Date().toISOString(),
      template: 'modern',
      accentColor: '#2563eb',
      fontFamily: 'sans',
      personal: {
        fullName: 'Alex Chen',
        jobTitle: 'Senior Full Stack Engineer',
        email: 'alex.chen@example.com',
        phone: '(555) 382-9910',
        location: 'San Francisco, CA',
        website: 'https://alexchen.dev',
        linkedin: 'linkedin.com/in/alexchen-dev',
        github: 'github.com/alexchen',
        summary:
          'Results-driven Senior Full-Stack Engineer with 6+ years of experience designing high-scale SaaS architectures and microservices. Expert in TypeScript, React, Next.js, Node.js, and AWS. Spearheaded migration that decreased cloud infrastructure costs by 34% and accelerated CI/CD build speeds by 3x.',
      },
      experience: [
        {
          id: 'exp_1',
          company: 'CloudScale Technologies',
          role: 'Senior Full Stack Engineer',
          location: 'San Francisco, CA',
          startDate: '2022-03',
          endDate: 'Present',
          current: true,
          bullets: [
            'Architected and deployed microservices handling 25M+ daily API requests using Node.js, Redis, and PostgreSQL, maintaining 99.99% uptime.',
            'Led front-end modernization to Next.js 14 and Tailwind CSS, reducing First Contentful Paint by 42% and increasing mobile user conversion by 18%.',
            'Mentored team of 6 engineers, standardizing code review practices and reducing production bug escalations by 28%.',
            'Integrated Stripe billing and automated tax calculation pipeline processing $4.2M in annual recurring revenue.',
          ],
        },
        {
          id: 'exp_2',
          company: 'FinFlow Systems',
          role: 'Software Engineer',
          location: 'Austin, TX',
          startDate: '2019-06',
          endDate: '2022-02',
          current: false,
          bullets: [
            'Developed secure transaction monitoring dashboard in React and TypeScript used by 12,000+ financial analysts.',
            'Optimized PostgreSQL database queries and indexing strategies, reducing median query latency from 850ms to 45ms.',
            'Built automated test suites using Jest and Cypress achieving 92% code coverage across critical payment pathways.',
          ],
        },
      ],
      education: [
        {
          id: 'edu_1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          location: 'Berkeley, CA',
          startDate: '2015-09',
          endDate: '2019-05',
          gpa: '3.82',
          achievements: ["Dean's Honors List (6 Semesters)", 'President of Open Source Developers Club'],
        },
      ],
      skills: [
        {
          category: 'Languages',
          items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'HTML5/CSS3'],
        },
        {
          category: 'Frameworks & Tools',
          items: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Express', 'Redux'],
        },
        {
          category: 'Cloud & Infrastructure',
          items: ['AWS (ECS, Lambda, RDS)', 'Docker', 'Kubernetes', 'GitHub Actions', 'PostgreSQL', 'Redis'],
        },
      ],
      projects: [
        {
          id: 'proj_1',
          title: 'DevPulse - Telemetry & Cluster Monitor',
          subtitle: 'Open Source System Monitor',
          link: 'https://github.com/alexchen/devpulse',
          technologies: ['Go', 'WebSockets', 'React', 'Docker'],
          bullets: [
            'Built high-throughput telemetry collector supporting 50+ nodes with real-time UI dashboard.',
            'Attracted 1,200+ GitHub stars and featured on Hacker News front page.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert_1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          date: '2023-04',
        },
      ],
    },
  },
  product_manager: {
    label: 'Senior Product Manager',
    role: 'Lead Product Manager',
    rawText: `Maya Lin
New York, NY | maya.lin@example.com | (555) 819-4420 | linkedin.com/in/mayalin-pm

SUMMARY
Growth-oriented Product Manager with 5+ years of experience leading B2B SaaS products from 0 to 1 and scaling to $12M ARR. Adept at customer discovery, PLG funnels, data-informed roadmaps, and agile execution.

EXPERIENCE
Lead Product Manager | PulseMetrics AI | New York, NY
01/2022 - Present
- Owned the core AI Analytics suite, increasing self-serve onboarding conversion from 4.2% to 11.8% through iterative experimentation.
- Partnered with engineering and design to launch real-time anomaly detection, driving $3.4M in new enterprise ARR in 9 months.
- Managed a cross-functional squad of 9 engineers, 2 designers, and a data scientist across 2-week agile sprints.

Product Manager | SaaSify Tech | Boston, MA
08/2019 - 12/2021
- Defined roadmap and executed launch for mobile app expansion, achieving 4.8-star App Store rating with 150k+ downloads.
- Conducted 80+ user interviews to identify high-friction workflows, directly reducing churn by 22%.

EDUCATION
B.A. in Economics & Data Science | Columbia University
09/2015 - 05/2019

SKILLS
Product Strategy, Agile / Scrum, User Research, Mixpanel, Amplitude, SQL, Jira, Figma, A/B Testing, Go-To-Market (GTM)`,
    data: {
      id: 'res_sample_pm',
      title: 'Senior Product Manager Resume',
      lastModified: new Date().toISOString(),
      template: 'executive',
      accentColor: '#0f766e',
      fontFamily: 'sans',
      personal: {
        fullName: 'Maya Lin',
        jobTitle: 'Senior Product Manager',
        email: 'maya.lin@example.com',
        phone: '(555) 819-4420',
        location: 'New York, NY',
        website: 'https://mayalin.pm',
        linkedin: 'linkedin.com/in/mayalin-pm',
        summary:
          'Growth-oriented Product Manager with 5+ years of experience leading B2B SaaS products from 0 to 1 and scaling to $12M ARR. Adept at customer discovery, PLG funnels, data-informed roadmaps, and agile execution.',
      },
      experience: [
        {
          id: 'exp_pm_1',
          company: 'PulseMetrics AI',
          role: 'Lead Product Manager',
          location: 'New York, NY',
          startDate: '2022-01',
          endDate: 'Present',
          current: true,
          bullets: [
            'Owned the core AI Analytics suite, increasing self-serve onboarding conversion from 4.2% to 11.8% through iterative experimentation.',
            'Partnered with engineering and design to launch real-time anomaly detection, driving $3.4M in new enterprise ARR in 9 months.',
            'Managed a cross-functional squad of 9 engineers, 2 designers, and a data scientist across 2-week agile sprints.',
          ],
        },
      ],
      education: [
        {
          id: 'edu_pm_1',
          institution: 'Columbia University',
          degree: 'Bachelor of Arts',
          fieldOfStudy: 'Economics & Data Science',
          location: 'New York, NY',
          startDate: '2015-09',
          endDate: '2019-05',
        },
      ],
      skills: [
        {
          category: 'Strategy & Analytics',
          items: ['Product Strategy', 'PLG Funnels', 'A/B Testing', 'SQL', 'Mixpanel', 'Amplitude'],
        },
        {
          category: 'Execution',
          items: ['Agile / Scrum', 'Jira', 'Figma', 'Customer Discovery', 'Roadmapping'],
        },
      ],
      projects: [],
      certifications: [],
    },
  },
};
