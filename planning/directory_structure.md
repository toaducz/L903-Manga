# Directory Structure

The project follows a modular structure, separating the presentation layer from the core logic.

## Root Directory
- `src/`: Main source code.
- `public/`: Static assets.
- `planning/`: Project documentation and planning files (this directory).
- `config files`: `.prettierrc.js`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`.

## Source Directory (`src/`)
- `app/`: Next.js App Router routes and layouts.
- `codebase/`: Core application logic (independent of UI).
- `components/`: Reusable UI components.
- `assets/`: Image and font assets.
- `styles/`: Global styles and CSS modules.
- `middleware.ts`: Next.js middleware for authentication and redirects.

## Codebase Directory (`src/codebase/`)
This directory contains the "brain" of the application:
- `api/`: API service definitions and fetchers.
- `constants/`: Global constants and configuration values.
- `store/`: Global state management (Recoil atoms and selectors).
- `utils/`: Helper functions and utility logic.

## App Router Structure (`src/app/`)
- `homepage/`: Main landing page.
- `manga-detail/`: Detailed information about a specific manga.
- `manga-page/`: Paginated manga listings.
- `reader/`: The core manga reading interface.
- `reading-history/`: User's reading progress tracking.
- `search/` & `filter-search/`: Discovery features.
- `self-host/`: Configuration or landing page for self-hosting.
- `api/`: Server-side API routes.

## Naming Convention Note
All directories and logic files follow the **kebab-case** standard (e.g., `get-manga-by-id.tsx`). React components follow **PascalCase**. See [naming_conventions.md](file:///d:/Personal%20Project/L903-Manga/planning/naming_conventions.md) for details.
