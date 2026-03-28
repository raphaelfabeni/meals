# Components

This folder contains all the reusable UI components for the app.

## Main Components

### SearchSection
The main search area where users can search for recipes. Includes the search bar, buttons, and results grid.

**Location:** `SearchSection/index.jsx`

**What it does:**
- Shows a search input field
- Has "Surprise me" and "Clear results" buttons
- Displays recipe cards in a grid when results are found
- Shows loading spinner while searching
- Opens recipe details in a modal when you click a card

### SearchBar
A simple search input with a submit button.

**Location:** `SearchBar/index.jsx`

**What it does:**
- Lets users type a dish name or ingredient
- Submits the search when user presses Enter or clicks "Find recipes"

### RecipeCard
A card showing a recipe thumbnail and title.

**Location:** `RecipeCard/index.jsx`

**What it does:**
- Displays a recipe image
- Shows the recipe title
- Clickable to open full recipe details
- Has a hover effect to make it feel interactive

### RecipeModal
A popup dialog showing full recipe details.

**Location:** `RecipeModal/index.jsx`

**What it does:**
- Shows recipe image, ingredients, and cooking steps
- Includes links to YouTube video and original source (if available)
- Closes when user presses ESC, clicks backdrop, or clicks Close button
- Uses the native HTML `<dialog>` element

### FunFacts
Displays colorful cards with cooking tips for beginners.

**Location:** `FunFacts/index.jsx`

**What it does:**
- Shows 4 cards with encouraging messages
- Each card has an emoji and gradient background
- Makes the landing page more friendly and welcoming

## UI Components

### Button
A flexible button/link component used throughout the app.

**Location:** `ui/Button/index.jsx`

**What it does:**
- Can be a `<button>` or `<a>` link (depending on if you pass `href`)
- Has different styles: primary, secondary, subtle, hero, text
- Has different sizes: sm, md, lg
- Handles disabled states

**Example usage:**
```jsx
// Regular button
<Button onClick={handleClick} variant="primary">
  Click me
</Button>

// Link styled as button
<Button href="/about" variant="secondary">
  Learn more
</Button>
```

## Hooks

### useSearch
A custom hook that manages all the search logic.

**Location:** `SearchSection/useSearch.js`

**What it does:**
- Stores search results, loading state, and errors
- Handles searching by name or ingredient
- Handles the "Surprise me" random recipe feature
- Handles clearing results
- Keeps the UI component simple by doing all the heavy lifting

**Why it's separate:** By putting logic in a hook, the UI component (`SearchSection`) can focus on just displaying things, making both easier to understand.
