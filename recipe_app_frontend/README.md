# Retro Recipe Explorer (Frontend-only)

A lightweight, frontend-only React recipe application with a retro-inspired (but modern) UI.

## Features

- Client-side routing with React Router:
  - Home (recipe grid + search)
  - Recipe detail pages
  - 404 / Not Found
- Prominent header search (debounced) that filters recipes client-side
- Local seed recipe data (no backend needed)
- Retro styling:
  - soft gradients, subtle grain/grid background
  - rounded corners, hover lift, focus rings
- Accessible defaults:
  - semantic HTML, labeled controls, keyboard-friendly navigation

## Getting started

From `recipe_app_frontend/`:

```bash
npm start
```

Then open http://localhost:3000

## Build

```bash
npm run build
```

## Testing (note)

This template includes a basic test setup (CRA + Testing Library).
No additional tests were requested for this task; if you add tests later, a good starting point is:

- unit tests for filtering/search logic
- route-level rendering tests for `Home` and `RecipeDetail`

Run tests with:

```bash
npm test
```
