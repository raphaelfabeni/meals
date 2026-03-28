# Library Functions

This folder contains helper functions that don't belong to any specific component.

## Files

### api.js
Functions for fetching recipe data from TheMealDB API.

**Functions:**
- `searchByName(term)` - Search recipes by dish name (e.g., "pasta", "curry")
- `searchByIngredient(term)` - Search recipes by ingredient (e.g., "chicken", "tomato")
- `randomMeal()` - Get one random recipe

**Example:**
```javascript
import { searchByName } from "@/app/_lib/api";

const results = await searchByName("pizza");
// Returns an array of pizza recipes
```

### normalize.js
Converts messy API data into a clean format our app can use.

**Why we need this:** TheMealDB returns data in a weird format with fields like `strIngredient1`, `strIngredient2`, etc. This file cleans it up into simple arrays and objects.

**Functions:**
- `normalizeMeal(meal)` - Converts one recipe from API format to our app format

**What it does:**
- Combines 20 separate ingredient fields into one clean array
- Renames confusing field names to simple ones
- Handles missing data (some recipes don't have YouTube links, etc.)

### constants.js
Configuration values used across the app.

**Constants:**
- `MEALDB_API_BASE` - The base URL for the recipe API
- `SEARCH_DETAIL_LIMIT` - Maximum number of recipes to fetch details for (prevents too many API calls)
- `DEFAULT_FETCH_OPTIONS` - Standard settings for API requests

**Why constants?** If we ever need to change the API URL or limits, we only change it in one place instead of hunting through all the files.
