# Surya T Portfolio

Static site: HTML + Tailwind (CDN) + vanilla JS + GSAP. No build step.

## Files
```
index.html
styles.css
script.js
assets/
  avatar.png / avatar.webp  <- your illustrated portrait (transparent background)
  surya-resume.pdf    <- ADD your resume here
  favicon.svg
```

## Add resume
Save your resume as `assets/surya-resume.pdf`.

## GitHub
```
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<username>/portfolio.git
git push -u origin main
```

## Deploy on Vercel (free)
1. vercel.com > Sign up with GitHub.
2. Add New > Project > import the repo.
3. Framework Preset: Other. Leave build settings empty. Deploy.

## After deploy
Add the Vercel URL to LinkedIn (Contact info > Website) and your resume.
GitHub link (https://github.com/surmus18) is already added in the contact section and footer.

## Notes
- Tech logos load from the Devicon CDN (jsDelivr), pinned to v2.16.0. Any logo that fails to load is hidden.
- Tailwind CDN prints a "not for production" console warning; safe to ignore for a personal site.

## Hero intro
After the loader, `assets/avatar-video.mp4` plays once (muted, with Skip and Sound buttons), then the portrait appears and the eyes follow the cursor.
Eye assets: `avatar-eyes.*` (portrait with eye openings), `eye-l/r-back.png`, `eye-l/r-iris.png`, `eye-l/r-lid.png`.
