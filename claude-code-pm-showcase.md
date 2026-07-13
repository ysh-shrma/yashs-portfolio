# How I Use Claude Code as a Product Manager

I'm a PM at Spyne, where we build conversational AI agents for US auto dealerships. Over the past 6 months, I've built an entire working environment inside Claude Code that handles the full spectrum of PM work: brainstorming, spec writing, stakeholder simulation, data analysis, and documentation. This isn't about using AI to fill in templates. It's about restructuring how PM work gets done.

---

## The Setup: A Persistent PM Operating System

My Claude Code workspace isn't a chat window. It's a structured repository with ground truth context, output templates, role personas, analysis scripts, and 27+ project folders. Every conversation Claude has with me is grounded in the same source of truth and the same constraints.

### What lives in the repo

```
context/           Ground truth: product context, dealer economics,
                   domain knowledge, CEO strategy workshops, roadmap

templates/         Output formats: one-pagers, wiki pages, emails,
                   Slack updates, writing style guide, brand guidelines

templates/personas/ 6 role-based personas I invoke for different lenses

workflows/         Playbooks for recurring multi-step work

projects/          27 active and past project folders with specs,
                   tickets, requirements, feedback docs

analytics/         7 Python scripts, real call data, weekly performance
                   reports across sales, service, and receptionist agents
```

### The CLAUDE.md file: rules for every conversation

Every session starts with Claude reading my rules file. Key constraints:

- **Always read the product context file before any product work.** No hallucinated capabilities.
- **Follow the writing style guide on all output.** Plain language, active voice, no filler.
- **Never use em dashes.** Always use colons. (Small detail, but it keeps writing consistent.)
- **Anchor every feature to dealer economics.** Which flywheel stage does this accelerate? How many days does it remove from inventory? What's the dollar-per-car impact?

That last rule comes directly from our CEO's framework: a car sitting on the lot costs ~$50/day in holding costs. A dealer's gross margin is $2,000-$4,000 per car. If a feature doesn't reduce days-in-inventory or protect gross margin, it doesn't ship. Claude knows this before I say a word.

---

## The Persona System: Simulating Stakeholder Feedback Before the Meeting

This is the highest-leverage part of my setup. I've built 6 detailed personas that Claude adopts fully when invoked:

| Invoke with | Who they are | What they pressure-test |
|-------------|-------------|------------------------|
| `Yash, ...` | PM (me): brainstorming partner | Structures rough ideas into specs and one-pagers |
| `Sanjay, ...` | CEO | Strategic fit, resource tradeoffs, "why now?" |
| `Sahil, ...` | Senior Backend Engineer | Technical feasibility, edge cases, scope risk |
| `Jordan, ...` | Senior Product Designer | UX gaps, user journey blind spots, accessibility |
| `Mike, ...` | Dealership GM (22-year veteran) | Will this work on a busy Saturday? Will salespeople use it? |
| `Priya, ...` | Product Analyst | Data verification, metric integrity, weekly reporting |

Each persona file is detailed: how they think, what earns their trust, what makes them push back, specific questions they always ask. Mike (the dealership GM) measures everything in gross-per-unit and close ratio, not engagement metrics. Sahil (the engineer) hates vague requirements and always asks "what happens when this fails?" Sanjay (the CEO) gives you 5 minutes and expects the bottom line first.

### How this plays out in practice

When I designed the inbound agent follow-up sequences, I ran the spec through three personas in one session:

**Mike (Dealership GM)** caught that the hot-lead handoff protocol was missing: "A customer replies to your Day 2 SMS at 11am on a Saturday: 'I'm ready to buy.' What happens next? If the answer is 'we alert you and you handle it,' that's not a product: that's me doing the job your system was supposed to do." He also flagged inventory feed lag: "On a busy Saturday, a used car can move in 2 hours. If your feed updates every 12 hours, your agent is going to pitch a sold vehicle."

**Sahil (Engineer)** questioned the retry logic, state management, and CRM write-back complexity.

**Sanjay (CEO)** asked whether the effort was proportional to the revenue impact and whether we'd validated the sub-5-minute response claim with real data.

I got three rounds of feedback before a single human reviewed the doc. The real reviews went faster because the obvious gaps were already closed.

---

## What I Actually Build With It

### 1. Feature specs and one-pagers

Every feature goes through the same flow:
1. Read the product context file
2. Brainstorm with the PM persona
3. Anchor to dealer economics (which flywheel stage? how many days removed? $/car?)
4. Draft using the one-pager template
5. Pressure-test with CEO, engineer, and dealership personas
6. Save in the project folder

Projects shipped this way include: CRM integration improvements (lead status sync spec with VinSolutions/Tekion display normalization rules), pre-approved offer outbound agents, SMS-first agent requirements, follow-up sequences, appointment booking nudge framework, and more.

### 2. Technical specs reviewed by simulated engineers

The CRM lead status spec is a good example. I drafted the field design (`externalLeadStatus` + enhanced `leadStatus` enum), ran it through Sahil's persona, then shared it with the real Sahil. His persona had already flagged: max column length validation, null/empty status handling, CRM write-back risks. The real engineering review focused on architecture decisions, not basic gaps.

### 3. Agent performance analysis (weekly)

I built a full analytics pipeline:

- **7 Python scripts** that process real call data: intent classification, outcome tiering, call pattern analysis, duration bucketing, transcript sampling
- **Weekly performance reports** with tiered call funnels, intent resolution scorecards, dealer-level breakdowns
- **The Priya persona** runs verification checklists (tier counts sum correctly, appointments don't exceed qualified calls) and writes the analyst commentary

A typical weekly report covers 450+ calls across 18 dealerships, breaking down qualified call funnels (appointment booked / transferred to human / callback scheduled / info resolved / dead end) and intent-level resolve rates. Each report ties findings back to business impact: which intent gaps cost the most in lost appointments, what prompt changes would move the needle.

### 4. Compliance and regulatory research

Claude helped me work through TCPA, FCC, and state-level DNC requirements for AI voice agents. I wrote compliance tickets covering: AI disclosure requirements, recording consent, opt-out tracking, PEWC (Prior Express Written Consent) for outbound agents, and EBR API integration for DNC scrubbing. This was deeply technical regulatory work that would have taken weeks of back-and-forth with legal.

### 5. Agent conversation design

For the Benjamin project (white-labeled SMS agent for Vincue), I designed complete conversation flows across 4 customer journeys: lease-end, trade-in, service cross-sell, and appointment confirmation. Each flow required handling objections, opt-outs, edge cases (missing trade-in data, expired offers), and compliance language. I built 22+ test scenarios covering all data permutations.

### 6. Evaluation frameworks

Built a full agent eval system under `projects/sales-ib-evals/`: eval prompts for intent classification, information accuracy, tool usage accuracy, conversation quality, escalation handling, and conversion. Includes Python scripts for running evals, aggregating results, and comparing human notes to automated scores.

### 7. Self-appraisal and work portfolio

When appraisal season came around, I pointed Claude at my conversation history and it extracted 40+ distinct work items across 8 categories: agent quality and prompt engineering, outbound agent design, compliance, dealer ROI frameworks, product specs, conversation flow design, documentation, and customer insights. Each tagged with dates and competencies. Six months of PM work, structured and documented in one session.

---

## The Writing System

All output follows a writing style guide that enforces:

- **Write like you talk.** If you wouldn't say it in a meeting, don't write it.
- **Cut filler.** "In order to" becomes "to." "It should be noted that" gets deleted entirely.
- **Be specific.** "Response time dropped from 3 days to 4 hours" beats "significant improvement in key metrics."
- **Use active voice.** "The team wrote the report," not "the report was written by the team."
- **No jargon.** "Use" not "utilize." "Use" not "leverage." "Teamwork" not "synergy."

I also built a custom `/humanize` command: point it at any document, and it rewrites the entire thing following the style guide while preserving structure, data, and meaning.

---

## Cross-System Sync

Every requirement gets pushed to both Jira (as a Story under RETCONVAI) and Notion (as a Task with Jira ticket URL). A sync map in the repo tracks every task by Notion page ID, Jira key, initiative, and sync status. Claude flags any spec that was drafted but not yet pushed to both systems before a session ends.

---

## The Persistent Memory Layer

Claude Code's memory system tracks:
- **Project context** that carries across sessions (decisions made, open items, who reviewed what)
- **Feedback rules** (e.g., "integration tests must hit a real database, not mocks" with the reason why)
- **Reference pointers** to external systems (which Linear project tracks pipeline bugs, which Grafana board pages oncall)

This means I don't re-explain context between sessions. Claude picks up where we left off.

---

## Why This Works

This isn't "PM uses chatbot." It's a system.

**Speed.** A feature that used to take 2-3 days from idea to reviewed spec now takes hours. Not because the thinking is skipped, but because the iteration cycles are compressed. Write the first draft, get three rounds of persona feedback, refine, and ship: all in one sitting.

**Consistency.** Every spec follows the same template. Every feature is anchored to the same dealer economics framework. Every document follows the same writing style. The quality floor is high because the constraints are enforced automatically.

**Better first drafts.** By the time a real stakeholder sees a spec, it's already survived a simulated CEO review, an engineer's skepticism, and a dealership GM's "will this actually work on my floor?" test. The real reviews are faster and more focused.

**Compounding knowledge.** The context files, memory, and project folders mean that work done 3 months ago informs work done today. Claude knows the CRM field design decisions. It knows why we chose dynamic normalization over manual config. It knows which compliance requirements apply to outbound agents. I don't rebuild context from scratch.

**Analysis at PM speed.** I'm not an analyst, but I run weekly agent performance reviews across 450+ calls and 18 dealerships. The Python scripts and Priya persona handle the heavy lifting. I focus on what the data means and what to do about it.

---

## The Numbers

| Metric | Value |
|--------|-------|
| Active project folders | 27 |
| Persona-reviewed specs | 15+ |
| Analysis scripts built | 7 |
| Weekly performance reports generated | 8+ |
| Jira tickets written via Claude Code | 30+ |
| Conversation flows designed | 4 journeys, 22+ test scenarios |
| Compliance tickets from regulatory research | 5+ |
| Work items extracted for self-appraisal | 40+ across 8 categories |

---

## What I'd Tell Other PMs

Start with the context file. If Claude doesn't know your product, your customers, and your constraints, it's just a fancy autocomplete. The value comes from making your working knowledge persistent and enforced.

Build personas for the people whose feedback matters most. Not generic "stakeholder" personas: real people with real opinions, real red flags, and real trust signals. The more specific the persona, the more useful the pushback.

Use templates and style guides as constraints, not suggestions. The best output happens when Claude knows exactly what "good" looks like for your team.

Don't use AI to skip the thinking. Use it to think faster, iterate more, and catch gaps earlier. The PM still makes the calls. The system just makes sure those calls are better informed.
