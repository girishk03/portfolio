# Girish Challa — Developer Portfolio

[![CI](https://github.com/girishk03/portfolio/actions/workflows/ci.yml/badge.svg?branch=vercel-deploy)](https://github.com/girishk03/portfolio/actions/workflows/ci.yml)
[![Live](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://girish-challa-portfolio.vercel.app/)
[![License](https://img.shields.io/badge/Code-MIT-yellow)](LICENSE)

Personal engineering portfolio for Girish Challa, a Python backend developer and final-year computer science student. The site presents selected backend, optimization, NLP, analytics, and computer-vision projects through interactive case studies.

## Live Site

[girish-challa-portfolio.vercel.app](https://girish-challa-portfolio.vercel.app/)

## Featured Work

- **GlobalScart 360** — FastAPI commerce backend with authentication, checkout, PostgreSQL, analytics, Docker, and CI.
- **University Timetabling Solver** — Hybrid CP-SAT and LNS scheduling optimizer.
- **Hate Speech Detection** — TF-IDF and LinearSVC classifier with Flask moderation interfaces.
- **Power Theft Detection** — Heuristic electricity-risk prioritization dashboard.
- **Smart Marine AI** — YOLOv8n and Streamlit marine-debris detection prototype with software vessel simulation.

Detailed performance, provenance, and limitation claims belong to each linked project repository and take precedence over portfolio summaries.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| UI | Tailwind CSS, shadcn/ui, Radix UI |
| Motion and visualization | Framer Motion, Recharts |
| Testing | Vitest, Testing Library |
| Quality | TypeScript, ESLint configuration |
| Deployment | Vercel |

## Local Development

Prerequisite: Node.js 20 or later.

```bash
git clone https://github.com/girishk03/portfolio.git
cd portfolio
git switch vercel-deploy
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Validation

```bash
npm run test
npm run build
```

GitHub Actions runs tests and the production build on pushes and pull requests targeting `vercel-deploy`. ESLint is configured, but existing case-study typing errors must be resolved before lint can become a required CI check.

## Project Structure

```text
src/
├── components/      Shared portfolio sections and UI components
├── pages/           Home page and project case studies
├── hooks/           Reusable React hooks
├── lib/             Shared utilities
└── test/            Vitest setup and tests
public/              Resume, certificates, and static project assets
```

## Deployment

The production site is deployed on Vercel from the `vercel-deploy` branch. Vite produces the static application in `dist/`:

```bash
npm run build
```

## License

Project-authored source code is available under the [MIT License](LICENSE). Resume content, certificates, screenshots, logos, and third-party assets retain their respective rights and are not relicensed by the MIT grant.
