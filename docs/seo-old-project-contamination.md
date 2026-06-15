# Old Project Contamination Risk Table

Below is the classification of audited files regarding potential old project metadata leakage.

| File / Folder | Old Data Found | Risk Level | Action Taken | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `claude-seo/CLAUDE.md` | References to AgriciDaniel/claude-seo, claude-seo.md | Low | Kept & Moved | This is developer guidance for the toolkit itself, not user-facing. |
| `claude-seo/AGENTS.md` | References to Cursor/Antigravity integration with claude-seo | Low | Kept & Moved | Relates to local plugin setup. |
| `claude-seo/branding/` | HTML previews for `claude-seo` brand styling | Low | Kept & Moved | Internal brand templates for the plugin. |
| `claude-seo/data/` | Google search updates records | Low | Kept & Moved | Pure reference data. |
| `claude-seo/schema/templates.json` | Placeholder values like `[Brand Name]`, `[Publisher Name]` | Low | Kept & Moved | Structured data templates. |
| `src/data/site.ts` | None | Low | Migrated | Fully configured with MJ-TH Express data. |
| `src/data/seo-expansion.ts` | None | Low | Kept | Fully configured with MJ-TH Express details. |
| `src/lib/schema.ts` | None | Low | Refactored | Correctly points to MJ-TH Express variables. |

### Assessment Summary
- **Old Project Leakage**: **None**. No old client or old website strings (e.g. from previous moving sites) exist in active Next.js rendering modules.
- **Exposure Risk**: **Low**. The toolkit `claude-seo/` is ignored by TypeScript and ESLint, and is not public-facing. Moving it to `tools/` guarantees isolation.
