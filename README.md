# aprenderbitcoin.mx - MVP Website

Free Bitcoin education platform for Mexico and Latin America.

## Features

- ✅ Landing page (Spanish, mobile-responsive)
- ✅ 4 chapter pages (Caps 1-4) with:
  - Embedded YouTube videos
  - Pre-reading materials
  - Discussion questions
  - Deep-dive content
  - Mexican case studies with ArcadiaB CTAs
  - Practical exercises
  - Disqus forum per chapter
- ✅ "Ask Maxi" AI chat feature
- ✅ Mobile responsive design

## Deployment

### Netlify (Recommended)

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `netlify deploy --prod`

### Manual Deploy

Upload all files to Netlify via web interface:
- Drag and drop the entire `aprenderbitcoin-mx` folder
- Netlify will auto-detect as static site

## Structure

```
aprenderbitcoin-mx/
├── index.html          # Landing page
├── cap01.html          # Chapter 1: Dinero
├── cap02.html          # Chapter 2: Historia
├── cap03.html          # Chapter 3: Oro
├── cap04.html          # Chapter 4: Fiat
├── ask-maxi.html       # AI chat interface
├── styles.css          # Global styles
├── netlify.toml        # Netlify configuration
└── README.md           # This file
```

## Content Source

Educational materials created from Jose Carlos Flores's OyeBitcoin video series, expanded with supplementary content by Maxi ₿.

## Domain

Once deployed and reviewed, point `aprenderbitcoin.mx` to the Netlify URL.

---

Created by Maxi ₿ | Videos by OyeBitcoin
