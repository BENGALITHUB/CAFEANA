# CAFEANA — Premium Restaurant & Café Website with Visual Admin Studio

> **Brand Tagline:** *"Snap. Sip. Savour. Repeat."*  
> **Hero Headline:** *"A Little Escape. A Lot of Flavour."*

A luxury, modern, single-page restaurant and café web experience accompanied by a **complete client-side Visual Admin Studio and Live Preview CMS** built with React, Vite, GSAP, ScrollTrigger, Framer Motion, and Lenis smooth scrolling.

Designed specifically for **GitHub Pages / static hosting** without requiring any backend server or database!

---

## 🔐 Administrator Access & Credentials

* **Admin Login Route:** `#/admin` (e.g. `http://localhost:3000/#/admin`)
* **Admin Dashboard Route:** `#/admin/dashboard`
* **Credentials Configuration File:** [`src/config/adminConfig.js`](file:///d:/CAFEANA/src/config/adminConfig.js)

```javascript
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "cafeana2024"
};
```

> **Security Note:** This is a static frontend application hosted on GitHub Pages or static CDN. The credentials provide a private editing lock in the browser rather than cryptographic server-side authentication. Replace the placeholder credentials with your chosen username and password before public hosting.

---

## 🎨 Visual Studio & Live Preview CMS

When editing any section in the Admin Studio, you get a **synchronized split-screen workspace**:

* **Left Pane:** Comprehensive editing controls, text inputs, textareas, category reordering, dish managers, and image uploaders with automated browser-side WebP/JPEG compression.
* **Right Pane:** **Live Preview of the actual public website components** updating keystroke-by-keystroke in real time without refreshing the page!
* **Device Viewport Switcher:** Test responsiveness in **Desktop (100%)**, **Tablet (768px)**, and **Mobile (390px)** modes.
* **Full Website Preview:** Toggle between isolated section preview and full-page public preview at `#/admin/preview`.

---

## 🛠️ Editable Sections

1. **Header & Navbar:** Brand name, subtitle, navigation menu links (add, edit, delete, reorder), CTA button label & link, sticky navbar toggle, visibility.
2. **Hero Section:** Badge, headline line 1, headline line 2 (italic), description, primary & secondary CTAs, brand signature, overlay darkness slider, text alignment, background image uploader.
3. **About Section:** Badge, title, quote, narrative description, seal text, 3 brand pillars/hallmarks, interior and food plating image uploaders, CTA button.
4. **Menu Management:** Complete control over categories (Thai, Chinese, Continental, Indian, Coffee, Mocktails, Desserts) with add/delete/reorder/hide-show, highlights, and category image upload. Plus **Featured Dishes support** under each category (name, description, price, availability).
5. **Signature Dishes:** Dish titles, categories, tasting quotes, descriptions, floating accent badges, photography uploaders, reordering.
6. **Ambience & Atmosphere:** Moment highlights (candlelit booths, brew bar, social gatherings, architectural sanctuary), mood tags, descriptions, photography uploaders.
7. **Photo Gallery:** Batch multi-image uploader, captions, category tags (*Food*, *Coffee*, *Mocktails*, *Desserts*, *Interior*), reordering, deletion, and lightbox preview.
8. **Contact & Location:** Restaurant name, street address, city/state/zip, phone, email, weekday/weekend/Sunday hours, Google Maps URL, social media profiles (*Instagram*, *Facebook*, *Twitter*, *YouTube*).
9. **Footer:** Brand description, promise statement, closing tagline (*"Snap. Sip. Savour. Repeat."*), copyright text.
10. **Website Appearance:** Core palette tokens (*Primary Burgundy*, *Deep Burgundy*, *Espresso*, *Warm Cream*, *Champagne Gold*, *Soft Beige*), typography families, button corner radius (*sharp*, *classic*, *rounded*, *pill*), animation toggles. Includes strict guardrails preventing accidental green color themes.

---

## 🚀 Static Publishing & GitHub Pages Deployment Workflow

Because there is no backend or database, Cafeana uses a static-site-friendly publishing workflow:

1. **Edit in Studio:** All changes update the live preview immediately via React state.
2. **Save Draft:** Saves your in-progress work to browser `localStorage` (`cafeana_site_content_draft`).
3. **Publish Locally:** Applies the changes to the public website in your current browser (`cafeana_site_content_published`).
4. **Export for Global GitHub Pages Deployment:**
   - Click **"Export JSON"** in the top toolbar to download `cafeana-site-content.json`.
   - Replace [`src/data/siteContent.json`](file:///d:/CAFEANA/src/data/siteContent.json) in your project repository with the exported file (renaming it to `siteContent.json`).
   - Commit and push to GitHub:
     ```bash
     git add src/data/siteContent.json
     git commit -m "Update Cafeana website content"
     git push origin main
     ```
   - GitHub Pages will automatically build and publish the updated content to all visitors worldwide!

---

## 💻 Tech Stack

* **React 18**
* **Vite 5** (configured with relative `base: './'` for GitHub Pages subfolder compatibility)
* **React Router v6** (`HashRouter` for zero-configuration 404-free GitHub Pages routing)
* **GSAP & ScrollTrigger**
* **Lenis Smooth Scroll**
* **Framer Motion**
* **Lucide React**

---

## 🏃‍♂️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
* Public Website: `http://localhost:3000/#/`
* Admin Login: `http://localhost:3000/#/admin` (Default: `admin` / `cafeana2024`)

### 3. Build Production Static Bundle
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
