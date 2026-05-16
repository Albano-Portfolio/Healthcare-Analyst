# Jason Albano — AI-Enabled Healthcare Analytics Portfolio

> **Senior Healthcare Data Analyst & Business Intelligence Professional**  
> Cigna · Nashville, TN · 18+ Years Experience

---

## 📁 File Structure

```
portfolio/
├── index.html                    ← Main HTML (all 7 sections)
├── styles.css                    ← Complete styling & animations
├── script.js                     ← Neural canvas, typewriter, terminal, interactions
├── assets/
│   └── images/
│       ├── logo-tableau.svg      ← Tableau certification logo
│       ├── logo-databricks.svg   ← Databricks certification logo
│       ├── logo-snowflake.svg    ← Snowflake SnowPro logo
│       ├── logo-microsoft.svg    ← Microsoft AI certification logo
│       ├── logo-google.svg       ← Google GenAI logo
│       ├── logo-aws.svg          ← AWS logo
│       ├── logo-vanderbilt.svg   ← Vanderbilt University logo
│       ├── logo-johnshopkins.svg ← Johns Hopkins University logo
│       ├── logo-uofl.svg         ← University of Louisville logo
│       ├── logo-deeplearning.svg ← DeepLearning.AI logo
│       └── logo-cigna.svg        ← Cigna company logo
└── README.md                     ← This file
```

---

## 🚀 DEPLOYMENT — Step-by-Step

### ✅ OPTION 1: GitHub Pages (Recommended — Free & Professional)

#### Step 1 — Create/Log In to GitHub
- Go to **[github.com](https://github.com)** → Sign up or log in

#### Step 2 — Create a New Repository
1. Click the **green "New"** button (top left)
2. Name it: `jasonalbano` or `portfolio` or `jasonalbano.github.io`
   - **Pro tip**: If you name it exactly `[your-username].github.io` (e.g., `jalbano.github.io`), your site URL will be just `https://jalbano.github.io` — no subfolder!
3. Set to **Public**
4. ❌ Do NOT initialize with README (we have our own files)
5. Click **"Create repository"**

#### Step 3 — Upload Your Files
**Easiest method (drag & drop):**
1. On the empty repo page, click **"uploading an existing file"**
2. Open your `portfolio` folder on your computer
3. Select ALL files and folders:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - The entire `assets/` folder
4. Drag everything onto the GitHub upload area
5. Scroll down → Add commit message: `"Launch portfolio site"`
6. Click **"Commit changes"**

**⚠️ Important:** GitHub's web uploader doesn't handle nested folders well. For the `assets/images/` subfolder, you may need to:
- Drag the files in, then manually set the path to `assets/images/filename.svg`
- OR use the GitHub Desktop app (see below)

**GitHub Desktop method (easier for folders):**
1. Download **[GitHub Desktop](https://desktop.github.com)**
2. Clone your new empty repo to your computer
3. Copy all portfolio files into the cloned folder
4. In GitHub Desktop: click "Commit to main" → "Push origin"

#### Step 4 — Enable GitHub Pages
1. Go to your repo → Click **"Settings"** (top tab)
2. Left sidebar → Click **"Pages"**
3. Under "Source": select **"Deploy from a branch"**
4. Branch: **main**, Folder: **/ (root)**
5. Click **Save**

#### Step 5 — Your Site is Live! 🎉
- Wait 2–5 minutes
- GitHub will show you the URL at the top of the Pages settings
- It will be: `https://[your-username].github.io/[repo-name]/`
- Share it with the world!

---

### ⚡ OPTION 2: Netlify (Absolute Easiest — 60 Seconds)

1. Go to **[app.netlify.com](https://app.netlify.com)** → Sign up free
2. On the dashboard, look for **"Deploy manually"** or drag the box
3. **Drag your entire `portfolio` folder** onto the Netlify drop zone
4. Site goes live in ~30 seconds at a URL like: `talented-tesla-abc123.netlify.app`
5. Click **"Site settings" → "Change site name"** → set to `jasonalbano`
6. Your URL becomes: `jasonalbano.netlify.app` ✨

**To connect a custom domain on Netlify:**
- Go to Site settings → Domain management → Add custom domain

---

### 🌐 OPTION 3: Custom Domain (Optional but Professional)

Buy a domain like `jasonalbano.com` from:
- [Namecheap](https://namecheap.com) (~$12/year)
- [GoDaddy](https://godaddy.com)
- [Google Domains](https://domains.google)

**Connect to GitHub Pages:**
1. Add a file named `CNAME` in your repo root containing just: `jasonalbano.com`
2. In your domain registrar DNS settings, add:
   ```
   Type: A  →  185.199.108.153
   Type: A  →  185.199.109.153
   Type: A  →  185.199.110.153
   Type: A  →  185.199.111.153
   ```
3. In GitHub Pages settings → add your custom domain
4. Check "Enforce HTTPS" (after DNS propagates, ~24hrs)

---

## ✏️ PERSONALIZATION CHECKLIST

Before going live, update these in `index.html`:

- [x] **Email** — Already set to `Japi782004@yahoo.com`
- [x] **Phone** — Already set to `615.598.1794`
- [x] **Location** — Already set to Antioch, TN
- [x] **LinkedIn** — Already set to `linkedin.com/in/jasonalbano`
- [x] **Cigna current role** — Already populated with your real data
- [x] **All certifications** — Tableau, Databricks, Snowflake, Microsoft, etc.
- [x] **Education** — U of Louisville, Vanderbilt, Johns Hopkins, U of Houston
- [ ] **Add your LinkedIn profile photo** — Replace the "JA" initials with your actual photo by adding an `<img>` tag inside `.orb-core`

### Adding Your Photo (Optional)
1. Add your headshot as `assets/images/photo.jpg`
2. In `index.html`, find `.orb-core` and replace:
   ```html
   <div class="orb-initials">JA</div>
   ```
   With:
   ```html
   <img src="assets/images/photo.jpg" alt="Jason Albano" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>
   ```

---

## 🔌 CONNECT THE CONTACT FORM (Real Emails)

Currently the form simulates sending. To receive real emails:

### Formspree (Free, Easiest)
1. Go to [formspree.io](https://formspree.io) → Create account
2. Create a new form → Get your form ID
3. In `index.html`, change:
   ```html
   <form class="contact-form" id="contactForm">
   ```
   To:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Remove the fake submit handler in `script.js` (the `setTimeout` block in the contact form section)

### EmailJS (Free, No Backend)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Connect your Gmail/Yahoo
3. Replace the form submit handler in `script.js` with EmailJS SDK call

---

## 🎨 Design System

| Property | Value |
|----------|-------|
| Primary Accent | `#06FFA5` (Electric Mint) |
| Secondary Accent | `#00D4FF` (Cyan) |
| Background | `#080B10` (Deep Navy Black) |
| Display Font | Syne (Google Fonts) |
| Mono Font | DM Mono (Google Fonts) |
| Serif Accent | Cormorant Garamond |
| Effects | Neural particle canvas, 3D card tilt, typewriter, skill bars, scroll reveals |

---

## 🌟 Special Features

- **Live neural network canvas** — animated background that reacts to mouse movement
- **AI code terminal** — 4 interactive scenarios showing real healthcare AI workflows
- **Typewriter hero** — cycles through 6 professional role descriptions
- **3D card tilt** — cert cards & experience cards respond to mouse movement
- **Skill bars** — animate on scroll with percentage fills
- **Glitch effect** — subtle glitch on hero name every 5 seconds
- **Custom cursor** — teal dot + ring cursor with hover scaling
- **Stat counters** — 18+, 8+, 20+, 50+ animate when scrolled into view
- **Certification logos** — All 10+ company/institution logos (SVG, no dependencies)
- **Interactive timeline** — 7 employers with full role details
- **Scroll-triggered reveals** — elements animate in on scroll

---

## 📱 Browser & Device Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| iOS Safari | ✅ Responsive |
| Android Chrome | ✅ Responsive |

---

*Zero frameworks · Zero dependencies · Pure HTML, CSS & Vanilla JS*  
*All fonts loaded from Google Fonts CDN (no install required)*
