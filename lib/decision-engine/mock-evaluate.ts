import type { Opportunity } from '@/schemas/opportunity';
import type { ActivityProposal } from '@/schemas/activity-proposal';
import type { LlmEvaluation } from '@/schemas/evaluation';
import type { StudentProfile } from '@/schemas/student';

const has = (text: string, words: string[]) => words.some((word) => text.includes(word));

export function evaluateWithMock(profile: StudentProfile, proposal: ActivityProposal, opportunities: Opportunity[]): LlmEvaluation {
  const text = `${proposal.title} ${proposal.description}`.toLowerCase();
  const projectText = profile.projects.map((p) => `${p.title} ${p.description} ${(p.technologies ?? []).join(' ')}`).join(' ').toLowerCase();
  const activityText = profile.activities.map((a) => `${a.title} ${a.description}`).join(' ').toLowerCase();
  const missing = (profile.missingDimensions ?? []).join(' ').toLowerCase();
  const isSaas = has(text, ['saas', 'full-stack', 'full stack', 'productivity app']);
  const isOpenSource = has(text, ['open-source', 'open source', 'repository', 'ml infrastructure', 'production codebase']);
  const isResearch = has(text, ['research', 'professor', 'lab']);
  const isWorkshop = has(text, ['workshop', 'teach', 'younger students']);
  const isClub = has(text, ['coding club', 'join club', 'club meetings']);
  const isDevTool = has(text, ['developer tool', 'developers using']);
  const shippedCount = profile.projects.length;
  const saasOverlap = isSaas ? Math.min(56, shippedCount * 12 + (has(projectText, ['saas', 'full-stack', 'full stack']) ? 18 : 0)) : 0;
  const clubOverlap = isClub && has(activityText, ['coding club']) ? 70 : 0;
  const gapBoost = (isSaas && shippedCount === 0) ||
    (isOpenSource && has(missing, ['open-source', 'open source', 'production codebase'])) ||
    (isResearch && has(missing, ['research'])) ||
    (isWorkshop && has(missing, ['communication', 'leadership'])) ||
    (isDevTool && has(missing, ['systems', 'infrastructure'])) ? 26 : 0;
  const noveltyPenalty = Math.max(saasOverlap, clubOverlap);
  const measurable = has(text, ['50', 'users', 'six-week', 'six week', 'contribute', 'ship']) || isOpenSource || isWorkshop || isResearch;
  const alignment = isClub ? 54 : isWorkshop ? 76 : isSaas || isOpenSource || isResearch || isDevTool ? 88 : 68;
  const scores = {
    goalAlignment: alignment,
    skillGrowth: Math.max(32, Math.min(94, 65 + gapBoost - Math.round(noveltyPenalty * 0.34))),
    marginalProfileValue: Math.max(31, Math.min(96, 62 + gapBoost - noveltyPenalty)),
    differentiation: Math.max(28, Math.min(94, 61 + Math.round(gapBoost * 0.7) - Math.round(noveltyPenalty * 0.28))),
    evidencePotential: measurable ? (isClub ? 42 : 86) : 58,
    timeEfficiency: isResearch ? 68 : isClub ? 72 : proposal.estimatedHoursPerWeek && proposal.estimatedHoursPerWeek > (profile.constraints?.hoursAvailablePerWeek ?? 10) ? 38 : isSaas ? 57 : 76,
  };

  const lowMarginal = scores.marginalProfileValue < 50;
  const highLeverage = scores.marginalProfileValue > 75;
  const overlapEvidence = isSaas
    ? profile.projects.slice(0, 3).map((p) => p.title)
    : isClub
      ? profile.activities.filter((a) => a.title.toLowerCase().includes('coding club')).map((a) => a.title)
      : [];
  const newDimensions = isOpenSource
    ? ['Open-source collaboration', 'Production codebase fluency', 'Maintainer feedback']
    : isResearch
      ? ['Research practice', 'Experimental rigor', 'Technical mentorship']
      : isWorkshop
        ? ['Teaching', 'Leadership', 'Communication']
        : isDevTool
          ? ['Developer discovery', 'Distribution', 'Product depth']
          : shippedCount === 0 && isSaas
            ? ['Product building', 'Shipping software', 'Working with users']
            : [];

  const overlapExplanation = isSaas && shippedCount > 1
    ? `You already demonstrate full-stack product development across ${shippedCount} shipped projects. Another similar SaaS adds little evidence unless the technical depth, users, or operating context changes.`
    : isClub && clubOverlap
      ? 'You already have sustained coding-club participation. More attendance repeats existing evidence without adding ownership or measurable impact.'
      : shippedCount === 0 && isSaas
        ? 'You have not yet shipped a software product. This would create genuinely new evidence of end-to-end product building.'
        : 'This direction has limited overlap with your current evidence and can expand the environments in which you have operated.';

  return {
    verdict: lowMarginal ? 'Useful, but it mostly reinforces strengths you already have.' : highLeverage ? 'A high-leverage bet that fills a real gap in your profile.' : 'Promising—make the outcome more concrete before committing.',
    summary: lowMarginal ? 'The idea is aligned, but alignment alone does not make it the best use of your next 8–12 weeks.' : 'This adds capabilities and proof that your current portfolio does not yet show clearly.',
    recommendation: lowMarginal ? (isClub ? 'skip' : 'modify') : 'do',
    scores,
    profileOverlap: {
      score: Math.min(100, noveltyPenalty + 18),
      explanation: overlapExplanation,
      overlappingEvidence: overlapEvidence,
    },
    strengths: [
      alignment > 75 ? 'Directly aligned with your software, ML, and startup goals' : 'Could strengthen your peer learning environment',
      measurable ? 'Can produce concrete evidence rather than participation alone' : 'Has a manageable starting point',
    ],
    weaknesses: lowMarginal
      ? ['Repeats evidence already visible in your profile', 'Consumes scarce project time without a sufficiently new challenge']
      : ['Success depends on defining a specific shipped outcome', 'The first two weeks need a clear scope and feedback loop'],
    missingDimensionsAddressed: newDimensions,
    opportunityCost: {
      severity: lowMarginal && (proposal.durationWeeks ?? 12) >= 8 ? 'high' : highLeverage ? 'low' : 'medium',
      explanation: lowMarginal
        ? `At roughly ${proposal.estimatedHoursPerWeek ?? 10} hours/week, this could consume most of your available project time while adding limited new evidence.`
        : 'The time commitment is meaningful, but it targets a current gap and can create durable proof of growth.',
    },
    reasoning: [
      overlapExplanation,
      newDimensions.length ? `The strongest new dimensions are ${newDimensions.join(', ').toLowerCase()}.` : 'The current framing does not introduce a clearly new environment or responsibility.',
      'Leverage improves when the work has a real stakeholder, measurable outcome, and external feedback.',
    ],
    betterVersions: lowMarginal ? [
      { id: 'better-open-source-tool', title: 'Build an open-source developer tool', description: 'Solve one narrow workflow problem, publish the code, recruit contributors, and document adoption.', estimatedScore: 82, whyBetter: 'Keeps the product-building energy but adds public collaboration and developer feedback.', newDimensionsAdded: ['Open source', 'Collaboration', 'Developer adoption'] },
      { id: 'best-ml-infra', title: 'Contribute to ML infrastructure used by real developers', description: 'Own a scoped issue in an established repository and ship it through maintainer review.', estimatedScore: 89, whyBetter: 'Adds large-codebase experience, systems depth, and evidence that survives external review.', newDimensionsAdded: ['ML infrastructure', 'Production codebase', 'Code review'] },
      { id: 'better-real-org', title: 'Build it for a real organization and reach 50 users', description: 'Start with one organization, observe its workflow, and measure weekly active use.', estimatedScore: 84, whyBetter: 'Turns a familiar build into proof of discovery, adoption, and sustained real-world impact.', newDimensionsAdded: ['User research', 'Distribution', 'Measured impact'] },
    ] : [
      { id: 'sharpen-outcome', title: `${proposal.title.replace(/[.]$/, '')} — with a shipped milestone`, description: 'Define one external stakeholder, one difficult deliverable, and one measurable result.', estimatedScore: Math.min(94, scores.marginalProfileValue + 8), whyBetter: 'A bounded outcome makes learning visible and creates a stronger feedback loop.', newDimensionsAdded: ['External feedback', 'Measurable evidence'] },
      { id: 'add-collaboration', title: 'Do it inside an established team', description: 'Find a lab, maintainer, or organization where your work must integrate with others.', estimatedScore: Math.min(95, scores.marginalProfileValue + 5), whyBetter: 'Adds collaboration, standards, and responsibility beyond solo execution.', newDimensionsAdded: ['Team execution', 'Accountability'] },
    ],
    alternativeOpportunities: opportunities.slice(0, 3).map((opportunity, index) => ({
      opportunityId: opportunity.id,
      title: opportunity.title,
      estimatedScore: [89, 86, 81][index] ?? 80,
      whyBetter: opportunity.description,
    })),
    nextSteps: ['Define the one new capability this should prove.', 'Choose a measurable outcome and external feedback source.', 'Set a two-week checkpoint before committing the full duration.'],
  };
}
