# Contributing Guide

Welcome! This guide will help you understand how the project is organized and how to make changes.

## 📁 Project Structure

```
src/
├── app/
│   ├── _components/          # Reusable UI components
│   │   ├── SearchBar/        # Search input field
│   │   ├── RecipeCard/       # Recipe thumbnail card
│   │   ├── RecipeModal/      # Recipe details popup
│   │   ├── SearchSection/    # Main search area
│   │   ├── FunFacts/         # Colorful tip cards
│   │   └── ui/
│   │       └── Button/       # Reusable button component
│   ├── _lib/                 # Helper functions
│   │   ├── api.js           # Functions to fetch recipes
│   │   ├── normalize.js     # Clean up API data
│   │   └── constants.js     # Configuration values
│   ├── layout.jsx           # Page wrapper (header, meta tags)
│   ├── page.jsx             # Home page
│   └── globals.css          # Global styles
├── public/                   # Static files (images, robots.txt)
└── tests/e2e/               # End-to-end tests
```

## 🎨 How to Add a New Component

1. **Create a folder** in `src/app/_components/` with your component name
2. **Create the component file** named `YourComponent.jsx`
3. **Import and use it** in your page or parent component

**Example:**
```jsx
// src/app/_components/Badge/Badge.jsx
export default function Badge({ text }) {
  return <span className="badge">{text}</span>;
}

// Use it in page.jsx
import Badge from "@/app/_components/Badge/Badge";

<Badge text="New!" />
```

## 🔌 How to Add a New API Function

1. **Open** `src/app/_lib/api.js`
2. **Add your function** following the existing pattern
3. **Use the constants** from `constants.js` for the API base URL

**Example:**
```javascript
// In api.js
export async function searchByCategory(category) {
  const url = `${MEALDB_API_BASE}/filter.php?c=${encodeURIComponent(category)}`;
  const res = await fetch(url, DEFAULT_FETCH_OPTIONS);
  if (!res.ok) throw new Error(`Network error (${res.status})`);
  
  const data = await res.json();
  const meals = data.meals || [];
  return meals.map(normalizeMeal);
}
```

## 🎯 Import Paths

We use the `@/` alias to import from the `src/` folder:

```javascript
// ✅ Good - using alias
import Button from "@/app/_components/ui/Button/Button";
import { searchByName } from "@/app/_lib/api";

// ❌ Avoid - relative paths get messy
import Button from "../../../_components/ui/Button/Button";
```

## 🧪 Testing Your Changes

### Run the development server:
```bash
npm run dev
```
Open http://localhost:3000 to see your changes.

### Run e2e tests:
```bash
npm run e2e
```

### Run e2e tests with UI (helpful for debugging):
```bash
npm run e2e:ui
```

## 🎨 Styling

We use **Tailwind CSS** for styling. Add classes directly to your JSX:

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello!
</div>
```

For custom styles, add them to `src/app/globals.css`.

## 🐛 Common Pitfalls

### 1. Forgot to add "use client"
If your component uses hooks like `useState` or `useEffect`, add this at the top:
```jsx
"use client";

import { useState } from "react";
```

### 2. Import errors
Make sure you're importing the full file path:
```jsx
// ✅ Correct
import Button from "@/app/_components/ui/Button/Button";

// ❌ Wrong
import Button from "@/app/_components/ui/Button";
```

### 3. API errors not showing
Check the browser console (F12) - we log all API errors there to help you debug.

## 💡 Tips for Learning

- **Start small** - Change text, colors, or add a simple component first
- **Use the browser console** - Press F12 to see errors and logs
- **Read the comments** - The code has lots of helpful comments explaining what things do
- **Check the README files** - Each folder has a README explaining what's inside
- **Ask questions** - If something is confusing, that's feedback to improve the docs!

## 🚀 Ready to Build?

1. Pick a small feature or fix
2. Make your changes
3. Test it with `npm run dev`
4. Run e2e tests with `npm run e2e`
5. Commit your work!

Happy coding! 🎉
