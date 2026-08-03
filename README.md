# Pranav Raj — Portfolio

Single-page, fully responsive personal portfolio. No build step, no dependencies.

```
index.html
style.css
script.js
assets/
  profile.jpg              <- add your photo here (square, ~800x800)
  profile-placeholder.svg  <- shown automatically if profile.jpg is missing
  favicon.svg
  Pranav_Raj_Resume.pdf    <- add your resume here for the download button
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Customise

- **Profile photo** — drop a square image at `assets/profile.jpg`.
- **Resume** — drop the PDF at `assets/Pranav_Raj_Resume.pdf`.
- **Links** — GitHub / LinkedIn URLs are in `index.html` (hero + contact sections).
- **Colors** — all tokens live in the `:root` block at the top of `style.css`.
- **Typing phrases** — `phrases` array in `script.js`.
- **Skill levels** — `data-level` attributes on `.bar__fill` in `index.html`.
- **Counters** — `data-target` / `data-suffix` attributes on `.counter` spans.

## Notes

- Animations respect `prefers-reduced-motion`.
- The hero particle canvas pauses its animation loop when scrolled out of view.
- SEO: meta/OG/Twitter tags plus JSON-LD `Person` schema in `index.html`.
