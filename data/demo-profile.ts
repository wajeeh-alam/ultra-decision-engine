import type { StudentProfile } from '@/schemas/student';

export const demoProfile: StudentProfile = {
  id: 'wajeeh-alam',
  name: 'Wajeeh Alam',
  grade: 'First-year university student',
  goals: [
    'Become an excellent software and ML engineer',
    'Work at technically strong startups',
    'Eventually build a technology company',
  ],
  careerInterests: ['Machine learning', 'Developer infrastructure', 'Startups', 'Software engineering'],
  skills: [
    { name: 'TypeScript', level: 'Strong', evidence: ['3 shipped products'] },
    { name: 'React', level: 'Strong', evidence: ['4 projects'] },
    { name: 'Next.js', level: 'Strong' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'Machine learning', level: 'Foundational' },
    { name: 'PostgreSQL', level: 'Intermediate' },
    { name: 'APIs', level: 'Strong' },
  ],
  activities: [
    { id: 'coding-club', title: 'Coding Club', category: 'Community', description: 'Member for 2 years' },
    { id: 'hackathons', title: 'Hackathons', category: 'Competition', description: 'Participated in 5 hackathons', outcomes: ['Won one hackathon'] },
    { id: 'startup-club', title: 'Startup Club', category: 'Community', description: 'Active member' },
  ],
  projects: [
    { id: 'study-assistant', title: 'AI Study Assistant', description: 'Full-stack AI learning app', technologies: ['Next.js', 'Python'], users: 250 },
    { id: 'task-saas', title: 'Task Management SaaS', description: 'Collaborative productivity product', technologies: ['React', 'Node.js'], users: 40 },
    { id: 'resume-tool', title: 'AI Resume Tool', description: 'AI-assisted resume product', technologies: ['Next.js'], users: 120 },
    { id: 'portfolio', title: 'Portfolio', description: 'Personal portfolio', technologies: ['React'] },
  ],
  achievements: ['Won one hackathon', 'Launched several products', 'Reached real users'],
  constraints: { hoursAvailablePerWeek: 10, remotePreferred: true },
  missingDimensions: [
    'Open-source collaboration',
    'ML infrastructure depth',
    'Large production codebases',
    'Research experience',
    'Systems experience',
  ],
};

export const beginnerProfile: StudentProfile = {
  ...demoProfile,
  id: 'beginner-sam',
  name: 'Sam Rivera',
  skills: [{ name: 'HTML & CSS', level: 'Beginner' }],
  activities: [],
  projects: [],
  achievements: [],
  missingDimensions: ['Product building', 'Shipping software', 'Working with users'],
};
