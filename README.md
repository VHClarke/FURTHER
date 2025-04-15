# 📝 GTM + Next.js Tracking Exercise

## Overview

This exercise demonstrates my ability to integrate **Google Tag Manager (GTM)** into a **Next.js App Router** application, while tracking:
- A custom event on button click (`dataLayer.push()`)
- Pageviews during client-side navigation (SPA routing)

I also maintained version control via Git and documented blockers I encountered and overcame throughout the process.

## ✅ Tasks Completed

| Requirement | Status | Notes |
|------------|--------|-------|
| Set up GTM in Next.js | ✅ | GTM script injected using `<Script>` from `next/script` |
| Use Git for version control | ✅ | Full Git history available in connected GitHub repo |
| Track custom event (`dataLayer.push()`) | ✅ | Fires on "Request Demo" button click |
| Track pageviews on route change (Bonus) | ✅ | Implemented via Next.js `router.events` in a reusable tracker |

## 🛠️ Setup & Implementation Details

- **GTM Integration:**
  - The GTM ID was stored as an environment variable using `.env.local` for secure access via `process.env.NEXT_PUBLIC_GTM_ID`.
  - Used `next/script` with `strategy="afterInteractive"` to inject GTM safely on the client side.
  - Added a `<noscript>` fallback for non-JavaScript users.
  - `window.dataLayer` was initialized in a browser-safe way to avoid SSR issues.

- **Custom Event Tracking:**
  - On "Request Demo" button click, `window.dataLayer?.push()` fires a `request_demo` event.
  - Event confirmed using GTM Preview Mode and browser console.

- **SPA Pageview Tracking (Bonus):**
  - Added a reusable route change tracker component that listens to `router.events`.
  - On every route change, a `page_view` event is pushed to `dataLayer`.

## 🧱 Challenges & Blockers

Before diving into development, I ran into several environment-level blockers:

- 🔄 **Outdated Tooling:**
  - My local dev environment was out of date, preventing me from running the app (`npm run dev` failed).
  - I updated:
    - **Node.js**
    - **Homebrew**
    - **Codecs** (to fix internal system toolchains)

- 🔐 **GitHub Sync Issues:**
  - My terminal wasn’t authenticated with GitHub.
  - I reconnected my terminal to GitHub by updating SSH credentials and reinitializing my remote origin to successfully push code.

Once all these foundational issues were resolved, I was able to dive into the implementation without further friction.

## 🔧 Code Highlights

### GTM Injection (App Router layout)
```tsx
<Script
  id="gtm-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `,
  }}
/>
```

### Button Click Event
```tsx
const handleClick = () => {
  window.dataLayer?.push({
    event: 'request_demo',
    timestamp: new Date().toISOString(),
  });
}
```

### SPA Route Change Tracker
```tsx
useEffect(() => {
  const handleRouteChange = (url) => {
    window.dataLayer?.push({
      event: 'page_view',
      page_url: url,
    });
  }

  router.events.on('routeChangeComplete', handleRouteChange)
  return () => router.events.off('routeChangeComplete', handleRouteChange)
}, [])
```

## 🤖 AI Usage

Yes, I used **ChatGPT** to support this exercise. Specifically, I used it to:
- Troubleshoot environment setup blockers
- Clarify best practices for GTM with SSR in Next.js App Router
- Reword and structure this README to be clean and professional

I made sure to fully understand each step and implementation detail so I can speak confidently about my approach in any interview or technical discussion.
