import type { Opportunity } from '@/schemas/opportunity';

export const demoOpportunities: Opportunity[] = [
  { id: 'ml-open-source', title: 'Open-source ML infrastructure contributor', organization: 'Community project', category: 'Open source', description: 'Ship scoped issues in a production ML tooling repository with maintainer review.', skills: ['Python', 'ML systems', 'Git collaboration'], estimatedHoursPerWeek: 7, duration: '8–12 weeks' },
  { id: 'research-engineering', title: 'ML systems research assistant', organization: 'University lab', category: 'Research', description: 'Help reproduce experiments and build reliable research tooling.', skills: ['Research', 'Python', 'Experimentation'], estimatedHoursPerWeek: 10, duration: 'One term' },
  { id: 'devtools-hackathon', title: 'Developer tools build sprint', organization: 'Regional hackathon', category: 'Build sprint', description: 'Build for working developers and validate the tool with five teams.', skills: ['Developer research', 'Product engineering'], estimatedHoursPerWeek: 10, duration: '2 weeks' },
];

export const seededProposals = [
  "Join my school's coding club.",
  'Build another full-stack productivity SaaS.',
  'Contribute to an open-source ML infrastructure project.',
  'Run a six-week AI workshop for younger students.',
  'Cold-email professors asking to contribute to ML research.',
  'Spend three months building an AI developer tool and try to get 50 developers using it.',
];
