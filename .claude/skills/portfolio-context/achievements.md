# Achievements — Marcos Lott

Key accomplishments to highlight in the portfolio. This file should be used as the evidence layer for case studies, homepage proof points, project pages, and recruiter-facing narratives.

This list is curated around outcomes, technical decisions, ownership, and career positioning. It should not read like a task list. Each achievement should help the portfolio answer one question: **why should a strong engineering team trust Marcos with complex product work?**

---

## Selection Principles

1. **Impact over activity**: prioritize measurable business, product, or engineering outcomes.
2. **Ownership over participation**: highlight cases where Marcos shaped the solution, not only implemented tickets.
3. **Architecture over isolated code**: show decisions around state, real-time data, reliability, design systems, and maintainability.
4. **Range without dilution**: keep the main narrative centered on frontend/product engineering, while showing credible full-stack and systems awareness.
5. **Public signal matters**: include content creation when it strengthens technical authority, communication, and positioning.

---

## Featured Achievements

### 1. Architected and delivered UCITS Web, opening a new revenue stream for Avenue

- **One-line summary**: Led the development of UCITS Web, a European funds trading experience that generated **$161k in commissions within 4 months**, represented **33% of total UCITS revenue**, and performed **418% better than the previous product launch** in the same initial window.
- **Context**: Avenue needed to expand its investment platform beyond existing asset classes and bring UCITS trading to web users with a reliable, production-ready experience.
- **Contribution**: Owned the frontend architecture and delivery of the web trading flow using **React, TypeScript, Redux Toolkit, and real-time streaming**, including the order ticket, user experience, state handling, and integration with investment platform constraints.
- **Outcome**: The launch produced **5,615 orders in 4 months**, increased client autonomy on web, and became a concrete example of Marcos connecting frontend engineering decisions to business growth.
- **Portfolio angle**: Use this as the main flagship case study. It proves product impact, fintech domain depth, execution speed, and architectural ownership.

### 2. Built and evolved investment order flows at scale

- **One-line summary**: Contributed to critical investment flows across **equities, ETFs, funds, fixed income, and UCITS**, supporting **200k+ monthly orders**, **$620M+ in monthly transaction volume**, and **70k+ active users**.
- **Context**: Trading interfaces require reliability, correctness, clear state management, and strong user trust. Small UI or state issues can affect order confidence and operational stability.
- **Contribution**: Built and improved order experiences, frontend state flows, validation paths, and platform integrations for multiple asset classes in a regulated fintech environment.
- **Outcome**: Helped maintain and evolve a high-volume investment platform while balancing product velocity, reliability, and maintainability.
- **Portfolio angle**: Use this to show that Marcos has worked beyond isolated UI screens. He has experience in real product surfaces where correctness, latency, and user trust matter.

### 3. Improved real-time market data reliability during high-volume trading conditions

- **One-line summary**: Stabilized EventSource-based market data behavior with **circuit-breaker** and **exponential backoff** patterns, preventing UI freezes during volatile periods and supporting trading flows during a **$75.51M peak daily volume** scenario.
- **Context**: Real-time financial products depend on stable streaming connections. Instability in price updates can degrade user trust, freeze the interface, and create operational risk.
- **Contribution**: Diagnosed the EventSource instability, designed a safer recovery strategy, and implemented resilience patterns to protect the user experience under failure conditions.
- **Outcome**: Increased reliability of live market data consumption and reduced the risk of degraded trading sessions during high-volatility periods.
- **Portfolio angle**: Use this as a reliability/system-design story: not just React UI, but frontend resilience for real-time systems.

### 4. Modernized frontend state architecture from JavaScript to TypeScript

- **One-line summary**: Modernized investment frontend state management by migrating Redux logic from JavaScript to TypeScript, normalizing state structures, improving maintainability, and creating a stronger foundation for complex financial flows.
- **Context**: Investment products accumulate complex business rules, state transitions, and edge cases. Weak typing and fragmented state make future development slower and riskier.
- **Contribution**: Refactored state structures, improved typing, applied cleaner architectural boundaries, and documented key flows to reduce bus factor and increase confidence in future changes.
- **Outcome**: Improved maintainability, made state behavior easier to reason about, and strengthened the frontend foundation for future investment features.
- **Portfolio angle**: Use this to show architectural maturity and the ability to improve a live codebase without stopping product delivery.

### 5. Built AI-assisted tooling to accelerate design system migration

- **One-line summary**: Created and adapted AI agents in Cursor/Claude to automate parts of the **Midas V1 → V2** migration, contributing **+8% toward the quarterly engineering migration goal** in less than a week.
- **Context**: Design system migrations are usually repetitive, slow, and error-prone. The team needed progress without sacrificing feature delivery.
- **Contribution**: Built an AI-assisted workflow for component migration, validation, and repetitive refactoring, using AI as a controlled craft tool rather than a black-box code generator.
- **Outcome**: Accelerated migration progress, reduced manual effort, and helped the team move faster while preserving consistency with design system standards.
- **Portfolio angle**: Use this as a signature AI-engineering case study. It connects Marcos's portfolio itself to his real professional practice with AI-assisted development.

### 6. Became the top frontend contributor at Avenue over a 6-month cycle

- **One-line summary**: Was the **#1 contributor** across key frontend repositories and responsible for **41% of all frontend production deploys** in the period, while contributing to UCITS, portfolio revamp, Landings, Midas, and platform health.
- **Context**: Avenue's frontend platform required simultaneous delivery of new features, migrations, bug fixes, code health, and cross-team support.
- **Contribution**: Maintained high delivery velocity, led or contributed to critical projects, performed housekeeping, supported peers through pair programming, and helped validate design system migration work.
- **Outcome**: Became a technical reference for the team, with peers recognizing his ability to quickly absorb business and code context, define implementation patterns, and unblock delivery.
- **Portfolio angle**: Use carefully. This is a strong proof of execution speed and trust, but should be balanced with the quality/validation growth narrative.

### 7. Led major frontend scope in Landings and Midas V2 components

- **One-line summary**: Delivered **16 of 22 Landings components**, owned route structure and portfolio-related implementation, and created **25 Midas V2 components**, including **16 during pre-building**.
- **Context**: The team needed to move fast on product surfaces while also evolving the design system and keeping UI implementation consistent.
- **Contribution**: Implemented core components, defined reusable structures, supported the design system evolution, and delivered critical scope ahead of schedule.
- **Outcome**: Helped the team finish work weeks before deadline and contributed directly to engineering migration goals.
- **Portfolio angle**: Use this for design system, component architecture, and execution velocity.

### 8. Strengthened technical communication through documentation, pair programming, and knowledge sharing

- **One-line summary**: Produced documentation for web order tickets, UCITS frontend flows, token generation, and Midas migration workflows, while supporting developers from other tribes through pair programming.
- **Context**: Fast-moving fintech teams need more than implementation speed; they need shared context, reduced bus factor, and maintainable delivery paths.
- **Contribution**: Documented technical flows, presented implementation patterns, validated code, supported other teams, and helped align platform, design, and product constraints.
- **Outcome**: Reduced knowledge silos, increased confidence in future maintenance, and strengthened Marcos's role as an emerging technical reference.
- **Portfolio angle**: Use this to show communication and leadership without forcing a people-management narrative.

### 9. Built a Flutter tracking SDK at Dito CRM for behavioral data capture

- **One-line summary**: Led development of a cross-platform Flutter SDK for behavioral tracking, supporting mobile data capture for CRM and marketing automation use cases.
- **Context**: Dito CRM clients needed reliable behavioral data from mobile applications to power segmentation, analytics, and marketing workflows.
- **Contribution**: Designed and implemented SDK behavior around local persistence, offline queues, retries, and request signing, translating tracking requirements into reusable client-side infrastructure.
- **Outcome**: Expanded the platform's ability to collect behavioral data from mobile clients and gave Marcos experience beyond traditional web UI implementation.
- **Portfolio angle**: Use as proof of range: SDK work, data capture, mobile context, reliability concerns, and platform thinking.

### 10. Built internal systems and real-time telemetry at Fórmula Tesla UFMG

- **One-line summary**: Built an internal project management platform and a real-time telemetry dashboard for an electric race car team, supporting **30+ members** and sensor visualization with sub-second latency.
- **Context**: A multidisciplinary engineering team needed software to coordinate work and interpret real-time vehicle data during testing and competitions.
- **Contribution**: Developed end-to-end software with **React, Node.js, Express, and PostgreSQL**, designed interfaces in Figma, implemented REST APIs, and collaborated with mechanical and electrical teams.
- **Outcome**: Helped the team coordinate engineering work and visualize telemetry data in real operational contexts.
- **Portfolio angle**: Use as the early full-stack/systems origin story: practical software built close to hardware and engineering operations.

### 11. Built public technical authority through content creation

- **One-line summary**: Started building a public technical presence through **LinkedIn in English** and **Instagram in Portuguese** under the lott.dev direction, focusing on frontend engineering, AI-assisted development, system design, architecture, and career growth.
- **Context**: Marcos's career goal is to move toward international opportunities and become known not only as an implementer, but as a product-minded engineer who communicates technical ideas clearly.
- **Contribution**: Creates and refines content around topics such as React in the AI era, frontend fundamentals, repository architecture for AI-assisted workflows, system design for frontend engineers, and the evolution from coding features to understanding systems.
- **Outcome**: Builds communication leverage, strengthens recruiter-facing positioning, and turns learning into public career capital.
- **Portfolio angle**: Treat content as part of the portfolio, not a separate side project. It should demonstrate taste, clarity, communication, and technical judgment.

---

## Proof Points to Reuse Across the Portfolio

- **$161k** in UCITS Web commissions within 4 months.
- **5,615** UCITS Web orders in 4 months.
- **33%** of total UCITS revenue attributed to web after launch.
- **418%** more revenue than Options Web in the first comparable 4-month window.
- **200k+** monthly investment orders supported.
- **$620M+** monthly transaction volume supported.
- **70k+** active users supported.
- **$75.51M** peak daily volume context for real-time reliability work.
- **41%** of frontend production deploys in a 6-month period.
- **+8%** contribution toward Midas migration goal through AI-assisted tooling.
- **16/22** Landings components delivered.
- **25** Midas V2 components created.
- **30+** Fórmula Tesla team members supported by internal tooling.

---

## Recommended Case Studies

### Primary Case Study

**UCITS Web — Bringing European funds trading to web users**

Recommended framing:

> From product opportunity to production trading experience: how Marcos helped launch a new fintech revenue stream with React, TypeScript, real-time streaming, and careful state architecture.

### Secondary Case Study

**AI-assisted Midas migration — Turning repetitive migration into controlled engineering leverage**

Recommended framing:

> How Marcos used Cursor, Claude, and custom workflows to accelerate a design system migration without treating AI as an unchecked code generator.

### Supporting Case Study

**Real-time reliability — Making financial interfaces resilient under streaming instability**

Recommended framing:

> How circuit-breaker and exponential backoff patterns improved market data reliability and protected trading UX during high-volume conditions.

### Origin Story Case Study

**Fórmula Tesla telemetry — Software close to hardware**

Recommended framing:

> Early full-stack work translating mechanical and electrical engineering needs into useful software for a real race car team.

---

## Growth Narrative to Keep Honest

Marcos's strongest pattern is high-velocity ownership. The portfolio should also show maturity around quality, validation, and communication of scope. This is not a weakness to hide; it is part of the seniority narrative.

A strong framing:

> Marcos has learned that speed only compounds when paired with validation, documentation, and clear communication of trade-offs. His current evolution is from fast executor to technical leader who creates systems, standards, and alignment around the work.
