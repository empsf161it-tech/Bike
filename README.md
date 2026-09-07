# APEX MOTORS — Premium Luxury Motorcycle Showroom Website

A modern, high-performance, fully responsive multi-page e-commerce & showroom website designed for a luxury motorcycle brand.

## 🚀 Features

- **11 Fully Self-Contained Pages**:
  - `index.html` — Homepage with 7 high-impact sections, GSAP animations, JSON-LD structured data
  - `home2.html` — Alternate layout featuring typing effect & interactive horizontal motorcycle showcase
  - `services.html` — Services & pricing comparison table, process steps, FAQ accordion
  - `about.html` — Brand genesis story, mission, timeline milestones, and engineering team grid
  - `blog.html` — Journal listing with category tags and featured hero article
  - `blog-single.html` — In-depth article view with telemetry graphs, author bio card & comment thread
  - `contact.html` — Contact info cards, Google Maps iframe, and client-side validated form
  - `login.html` — Centered login page with Google/Apple OAuth buttons & validation
  - `register.html` — Centered register page with T&C agreement & validation
  - `404.html` — Custom 404 page with track metaphor design
  - `coming-soon.html` — Launch page with live JS countdown timer & email capture

- **Design System**:
  - Luxury-Refined + Industrial Edge dark showroom aesthetic
  - Google Fonts: *Playfair Display*, *Space Grotesk*, *JetBrains Mono*
  - Remix Icons via CDN
  - CSS Variables in `:root` with full dark mode (`[data-theme="dark"]`)
  - Strict typography rules (headings max font-weight 580)
  - 5 responsive breakpoints (1440px, 1025px, 1024px, 768px, 360px)

- **Interactivity & Engineering**:
  - **GSAP & ScrollTrigger Animations**: Fade, slide, scale reveals, and stagger grids
  - **Dark / Light Mode**: LocalStorage persistence & system preference auto-detection
  - **RTL / LTR Support**: Toggleable via `dir="rtl"` with dedicated `rtl.css` overrides
  - **Navigation Drawer**: Full horizontal nav at >1024px, slide drawer at ≤1024px
  - **Form Validation**: Real-time email regex, password strength, matching passwords, and required checkboxes

## 📂 File Structure

```
[Bike Store]/
├── index.html
├── home2.html
├── about.html
├── services.html
├── blog.html
├── blog-single.html
├── contact.html
├── login.html
├── register.html
├── 404.html
├── coming-soon.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── rtl.css
│   └── js/
│       └── main.js
└── README.md
```

## 🛠️ Technology Stack

- **HTML5**: Semantic tags, Schema.org JSON-LD, WCAG 2.1 AA accessibility
- **Vanilla CSS3**: CSS Variables, Grid, Flexbox, logical properties
- **JavaScript (ES6+)**: GSAP 3, ScrollTrigger, LocalStorage, IntersectionObserver
