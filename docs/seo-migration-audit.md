# SEO Migration & Toolkit Audit Report

This document reports the findings of the full audit of the `claude-seo` directory and the current codebase's SEO setup.

## 1. Full Folder Inventory of claude-seo

The copied folder `claude-seo/` consists of:
- **`agents/`**: 18 sub-agents used for automated analysis workflows.
- **`skills/`**: 25 sub-skills written in markdown format.
- **`scripts/`**: 70 Python scripts, including CLI wrappers, API integrations (GSC, Pagespeed, Google Auth), and reporting tools.
- **`schema/`**: Contains `templates.json` mapping out standard structured data formats.
- **`branding/`**: Contains HTML templates (`final.html`, `diagrams-preview.html`) and scripts for asset visualization.
- **`tests/`**: Pytest testing suites.
- **`data/`**: JSON updates log (`google-updates.json`).
- **`hooks/`**: post-tool schema validation rules.
- **`extensions/`**: MCF extensions setup (Banana, Firecrawl, DataForSEO).
- **`Lib/` & `Include/`**: Python virtual environment directories (containing packages like `playwright`, `numpy`, `weasyprint`, etc.).

---

## 2. Classification & Risks

### Safer Internal Tooling
- All scripts under `scripts/`, `agents/`, and `skills/` are helper tools for offline analysis and planning. They are completely safe and do not run as web pages.

### Project-Facing SEO Files
- None of the files in `claude-seo/` are imported by the Next.js app in the current codebase.

### Contamination Risk Analysis
- **Old Brand Data**: None of the files in `claude-seo` are generating public pages or layout metadata in the current Next.js code. The Next.js code is fully configured with "MJ-TH Express" brand and "095-583-0371" phone number.
- **AI Agent Prompts**: The AI agents inside `claude-seo/agents/` are configured to execute analysis but refer to generic parameters. However, `CLAUDE.md` and `AGENTS.md` describe "claude-seo" as the local name, which might confuse developer agents when prompting. We will clean them up.
- **Virtualenv Exposure**: The python virtualenv (`Lib/`, `Include/`, `.venv/`) clutter the root path and might get scanned by IDE indexes or lint configurations. They must be moved.

---

## 3. Recommended Actions

1. **Move `claude-seo/` to `tools/claude-seo/`** to isolate the entire directory from project indexing and ensure Next.js never treats it as app content.
2. **Update exclusions** in `tsconfig.json` and `eslint.config.mjs` to target `tools/claude-seo/` instead of the root-level folder.
3. **Consolidate project SEO assets** into a dedicated architecture (`src/lib/seo/` and `src/data/seo/`) with `src/lib/seo/site-config.ts` as the single source of truth.
