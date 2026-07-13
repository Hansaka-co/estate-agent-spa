# Estate Agent SPA

A client-side property search application built with React and Vite, inspired by Rightmove. No server-side code — everything runs in the browser.

## Features
- Search properties by type, price range, bedrooms, date added, and postcode area
- Enhanced form widgets (react-widgets) for all search fields
- Property results displayed as cards with photo, price, and description
- Individual property pages with an image gallery and tabs (description, floor plan, map)
- Favourites list — add/remove via button or drag-and-drop, with duplicate prevention
- Responsive layout with a hand-written breakpoint at 1024px
- Content Security Policy for basic XSS protection
- Jest test suite covering search logic, favourites logic, and component rendering

## Running locally

\`\`\`
npm install
npm run dev
\`\`\`

Then open the printed localhost address in your browser.

## Running tests

\`\`\`
npm test
\`\`\`

## Live site
[Add your GitHub Pages URL here]

## Tech stack
React, Vite, React Router, react-widgets, react-tabs, Jest, React Testing Library