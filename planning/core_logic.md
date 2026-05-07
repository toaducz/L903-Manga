# Core Logic & State Management

The application's core logic is decoupled from the UI, resides in `src/codebase/`, and is managed through several layers.

## Data Fetching (API Layer)
Located in `src/codebase/api/`, this layer handles all external communication.
- **Service Pattern**: API calls are grouped by domain (e.g., manga, chapters, user).
- **Fetchers**: Uses standard `fetch` or a wrapper for consistent error handling and header management (e.g., JWT tokens from cookies).
- **Hooks**: Custom React Query hooks are used to wrap these services, providing caching, revalidation, and loading states.

## Global State (Recoil)
Located in `src/codebase/store/`, global state is managed using Recoil.
- **Atoms**: Small units of state (e.g., `currentUserAtom`, `readingSettingsAtom`, `historyAtom`).
- **Selectors**: Derived state (e.g., `isLoggedInSelector`, `favoriteMangasSelector`).
- **Persistence**: Some atoms are synced with `localStorage` or `cookies` for persistence across sessions.

## Utility Logic
Located in `src/codebase/utils/`, this contains pure functions and helpers.
- **Formatting**: Date formatting, string manipulation, etc.
- **Validation**: Input validation, schema checks.
- **Manga Specific**: Logic for calculating reading progress, handling image loading, or parsing manga metadata.

## Middleware
The `src/middleware.ts` currently implements a strict redirection policy:
- **Global Redirect**: Almost all routes (except internal Next.js paths, APIs, and static files) are redirected to `/self-host`.
- **Bypasses**: `/self-host`, `/_next/`, `/api/`, and core static files like `favicon.ico` are allowed.
- **Purpose**: This suggests the application is currently in a "maintenance" or "landing" mode, focusing on the self-hosting setup.
