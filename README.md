# second-brain-guide

Russian-language guide «Второй мозг с командой агентов Claude». Static SvelteKit site for GitHub Pages.

```bash
npm install
npm run dev      # http://localhost:5173/second-brain-guide/
npm run build    # static site in build/, with the Pagefind search index
npm run preview  # serve the build, search included
npm run check
```

- Agents: start with `CLAUDE.md`.
- Chapters: `src/content/`; components: `docs/COMPONENTS.md`; design system: `/design`.
- The site is built for `https://<user>.github.io/second-brain-guide/`. Set `BASE_PATH=''` to build for a domain root.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. In the repository, set Settings → Pages → Source to "GitHub Actions" once.
