# 🧠 Generator Web App

A simple yet extensible **Next.js App Router project** with a central landing page that links to two mini-tools:

- ✍️ **Text Generator**
- 🎠 **Carousel Generator**

Built using the latest features of **Next.js 14**, this project is ideal as a foundation for AI tools, internal dashboards, or creative utilities.

---

## 📁 Project Structure

frontend/
└── src/
├── app/
│ ├── page.tsx # Landing Page ('/')
│ ├── carousel-generator/
│ │ └── page.tsx # Carousel Generator ('/carousel-generator')
│ └── linkedin-generator/
│ └── page.tsx # LinkedIn Post Generator ('/linkedin-generator')
├── components/
│ ├── FloatingCarousel.tsx # Optional carousel component
│ ├── Header.tsx # Navigation/Header UI
│ ├── ThemeProvider.tsx # Theme context provider
│ └── ThemeToggle.tsx # Button for light/dark switch
├── public/
│ └── favicon.ico
├── styles/
│ └── globals.css # Global CSS styles
├── layout.tsx # Root layout component
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── tsconfig.json
├── .eslintrc.mjs
├── .gitignore
├── README.md


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/generator-app.git
cd frontend

2. Install Dependencies
npm install
# or
yarn

3. Run the Development Server
npm run dev
# or
yarn dev

Visit http://localhost:3000 in your browser to view the app.

🌐 Routes
| Route                 | Description                     |
| --------------------- | ------------------------------- |
| `/`                   | Landing Page                    |
| `/linkedin-generator` | Text Generator (LinkedIn Posts) |
| `/carousel-generator` | Carousel Generator Page         |

🛠 Tech Stack

Next.js 14+ (App Router)

React

TypeScript

Tailwind CSS

PostCSS

Built with ❤️ by 🐢