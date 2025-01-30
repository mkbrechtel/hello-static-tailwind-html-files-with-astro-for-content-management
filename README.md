# Hello static Tailwind HTML files with Astro for Content Mnagement

A streamlined workflow for content editors to create and manage website content using Pinegrow and HTML files, while leveraging Astro's build system for deployment.

## 🎯 Core Concept

This project enables a workflow where:
- Content editors create and edit HTML files directly using Pinegrow
- HTML files are stored in `content/pages`
- Astro automatically builds these into full pages with consistent layouts
- Live preview available on a draft server (www-draft.*)

## 📁 Project Structure

```
├── content/
│   └── pages/            # HTML content files edited in Pinegrow
├── src/
│   ├── layouts/          # Site-wide templates
│   ├── components/       # Reusable Astro components
│   └── pages/           # Astro routing and page assembly
└── public/              # Static assets
```

## 🔄 Workflow

1. Content editors work in `content/pages/*.html` files
2. Files are pure HTML with Tailwind classes
3. Astro fetches these files and wraps them in site templates
4. Preview on draft server
5. Deploy to production when ready

## 🚀 Quick Start

1. Clone and install:
```bash
git clone [repository-url]
npm install
```

2. Start development:
```bash
npm run dev
```

3. Create content:
- Open Pinegrow
- Create/edit HTML files in `content/pages/`
- Use provided templates as starting points
- Save files and see live preview

## 📝 Content Creation Guidelines

1. All content goes in `content/pages/*.html`
2. Use Tailwind classes for styling

TODO: images/assets

## 🛠️ Technical Details

- Astro 5.0 for build system
- Dynamic content fetching from local HTML files
- Tailwind CSS for styling
- Pinegrow for visual editing
- Preview server with access control

## 🔐 Draft Server

- URL: www-draft.[your-domain]
- Access controlled environment
- Live preview of content changes
- Automatic builds on content updates

## 📦 Templates

Available starter templates in `content/templates/`:
- Basic page
- Article page
- Landing page
- (Add your templates here)

## 🚀 Deployment

1. Build the site:
```bash
npm run build
```

2. Deploy `dist/` to your hosting service

## 👥 Team Workflow

1. Developers:
   - Manage templates and components
   - Handle build and deployment
   - Version control

2. Content Editors:
   - Work in Pinegrow
   - Edit HTML files directly
   - Preview on draft server

## 📋 License

The code is "un"licensed under the You are free to copy, modify, publish, use, sell - do whatever you want with this code and content. So you can just copy&paste everything in here.

Check the UNLICENSE file for more details.
