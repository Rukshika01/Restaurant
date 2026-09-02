# 🍽️ Luma — Restaurant Website

A modern, elegant multi-page restaurant website for the fictional restaurant **Luma** in Colombo, Sri Lanka.

The website uses clean HTML, CSS, and JavaScript with responsive layouts, premium visuals, smooth animations, and separate pages for the main restaurant experience.

## ✨ Features

- Modern restaurant homepage
- Dedicated menu page with dynamic category filtering
- About Us page with restaurant story, philosophy, experience highlights, and animated counters
- Contact Us page with contact information and message form
- Premium responsive footer across all pages
- Mobile-friendly navigation with hamburger menu
- Responsive desktop, tablet, and mobile design
- SEO-friendly metadata and sitemap
- Luma logo and favicon
- High-quality Unsplash demo imagery

## 📄 Pages

- **Home** — Hero, gallery, Why Choose Luma, opening hours, and CTA sections
- **Menu** — Category tabs, menu item cards, LKR prices, dietary labels, popular badges, and Chef's Signatures
- **About Us** — Our Story, restaurant philosophy, Luma experience, and animated statistics
- **Contact Us** — Restaurant address, opening hours, and secure contact form UI

## 📂 Project Structure

```text
Restaurant/
├── index.html
├── menu/
│   └── index.html
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── styles.css
├── script.js
├── server.js
├── logo.svg
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## 🚀 Live Website

GitHub Pages URL:

https://rukshika01.github.io/Restaurant/

SEO metadata and `sitemap.xml` currently use this GitHub Pages URL.

## ⚙️ Running Locally

Open `index.html` directly in a browser, or run the local Node server:

```bash
node server.js
```

Then open:

```text
http://127.0.0.1:4173/
```

## 📬 Contact Form Backend

The contact form posts to a server-side endpoint:

```text
/api/contact
```

For secure email sending, the backend requires environment variables:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

No email address API keys, SMTP credentials, or secrets are exposed in frontend JavaScript.

Note: GitHub Pages is static and cannot run `server.js`. For the contact form to actually send email, deploy the backend to a platform that supports server-side code, such as Vercel serverless functions or a Node hosting provider.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js local/server-side contact endpoint
- Git & GitHub
- GitHub Pages

## 👩‍💻 Author

**Rukshika**

This project is intended for educational and portfolio purposes.
