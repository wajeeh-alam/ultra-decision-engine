# Ultra Decision Engine

A founder-demo MVP for an AI advisor that helps ambitious students make higher-leverage bets on their limited time. The engine asks a more useful question than “does this sound impressive?”: **what new capability or evidence does this add beyond what the student has already demonstrated?**

## Why marginal profile value matters

Activities are not valuable in isolation. A first full-stack product can be transformative for a student who has never shipped software, while a sixth similar product may add little. The same proposal is scored against the student’s existing goals, skills, projects, activities, achievements, missing dimensions, and time constraints.

The product optimizes for capability growth, ownership, measurable output, difficult or new environments, differentiation, compounding strengths, filling gaps, future option value, and leverage per hour. It deliberately avoids admissions probabilities and prestige scoring.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default configuration requires no API key.

For a production check:

```bash
npm run build
```

## Mock mode

`NEXT_PUBLIC_USE_MOCK_AI=true` enables a deterministic, profile-aware evaluator. It recognizes the seeded proposal families, but its overlap and novelty scores depend on the active profile rather than a fixed title-to-score lookup. Edit the profile—or use the “Test beginner profile” control—and evaluate the same SaaS proposal to see the marginal-value score change.

Mock mode is also the fallback whenever `OPENAI_API_KEY` is absent, which keeps the founder demo reliable.

## LLM configuration

Set these server-side values to use a live model:

```bash
NEXT_PUBLIC_USE_MOCK_AI=false
OPENAI_API_KEY=your_server_side_key
OPENAI_MODEL=gpt-4.1-mini
```

Keys are read only in the server evaluation path. The client never receives the model credential. Model output is JSON-validated with Zod, retried once after a formatting failure, then rejected with a friendly API error if it remains invalid.

## Architecture

```text
app/                         App Router pages and API route
components/                  Decision, profile, and shared UI
data/                        Seeded demo profile and opportunities
lib/providers/               Ultra integration boundary
lib/decision-engine/         Scoring, comparison, and mock intelligence
lib/llm/                     Prompt, schema contract, and OpenAI adapter
lib/storage/                 Device-local profile and decision history
schemas/                     Shared Zod models
```

The primary request flow is:

1. `POST /api/evaluate` validates the proposal and optional locally edited profile.
2. `StudentContextProvider` supplies the student context and relevant opportunities.
3. The mock or live evaluator returns validated dimension scores and reasoning.
4. The server computes the weighted strategic-leverage score.
5. The browser saves the evaluation locally for detail, history, and comparison views.

## StudentContextProvider and Ultra integration

No UI imports fixture data for evaluation. The API consumes the `StudentContextProvider` interface. `DemoStudentContextProvider` uses local fixtures; `UltraStudentContextProvider` intentionally throws and contains clear integration TODOs.

```text
Ultra Profile Service
        ↓
StudentContextProvider
        ↓
Decision Engine
        ↓
Evaluation
        ↓
Ultra UI


Ultra Opportunity Corpus
        ↓
StudentContextProvider
        ↓
Alternative Opportunity Ranking
```

An internal integration would implement the provider’s three methods—profile, activities, and relevant opportunities—then select that provider in the API composition root. The decision UI and evaluator contract would not change.

## Evaluation schema

The Zod contract includes:

- overall strategic leverage and a `do | modify | skip` recommendation;
- goal alignment, skill growth, marginal profile value, differentiation, evidence potential, and time efficiency;
- profile overlap with explicit existing evidence;
- strengths, weaknesses, missing dimensions addressed, and opportunity cost;
- reasoning, better versions, alternative opportunities, and next steps.

All scores are constrained to 0–100. The model cannot set the final overall score.

## Scoring methodology

```text
overallScore =
  goalAlignment         × 0.15 +
  skillGrowth           × 0.20 +
  marginalProfileValue  × 0.25 +
  differentiation       × 0.15 +
  evidencePotential     × 0.15 +
  timeEfficiency        × 0.10
```

The result is clamped to 0–100 and rounded to the nearest integer. Marginal profile value is the largest term by design.

## Future improvements

- Replace fixture providers with Ultra profile and opportunity services.
- Ground evaluator explanations in structured profile evidence IDs.
- Add explicit workload collision checks across active commitments.
- Learn from student follow-through and verified outcomes without turning the product into a prestige predictor.
- Add collaborative counselor review and a lightweight decision checkpoint workflow.
- Move local history to an authenticated store when this becomes part of the main Ultra product.
