# Pranav Raj — Portfolio

Single-page, fully responsive personal portfolio. No build step, no dependencies.

```
WhatsApp Image 2026-07-02 at 06.46.48.jpeg
cv (3).pdf
index.html
script.js
style.css
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Customise

- **Profile photo** — drop a square image at `WhatsApp Image 2026-07-02 at 06.46.48.jpeg`.
- **Resume** — drop the PDF at `cv (3).pdf`.
- **Links** — GitHub / LinkedIn URLs are in `index.html` (hero + contact sections).
- **Colors** — all tokens live in the `:root` block at the top of `style.css`.
- **Typing phrases** — `phrases` array in `script.js`.
- **Skill levels** — `data-level` attributes on `.bar__fill` in `index.html`.
- **Counters** — `data-target` / `data-suffix` attributes on `.counter` spans.

## Notes

- Animations respect `prefers-reduced-motion`.
- The hero particle canvas pauses its animation loop when scrolled out of view.
- SEO: meta/OG/Twitter tags plus JSON-LD `Person` schema in `index.html`.
