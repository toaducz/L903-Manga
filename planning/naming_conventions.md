# Naming Conventions

To ensure consistency and maintainability, the project follows a strict naming convention for all files and directories.

## Core Standard: Kebab-Case
All files and directories should follow the **kebab-case** convention unless specified otherwise (e.g., React Components).

### 1. API Services & Data Fetchers
Files that "get" or fetch data must use the `get-something` pattern in kebab-case.
- **Current**: `getChapter.tsx`, `getMangaById.tsx`, `searchManga.tsx`
- **Standard**: `get-chapter.tsx`, `get-manga-by-id.tsx`, `search-manga.tsx`

### 2. Directories
All directories should be in kebab-case.
- **Current**: `src/codebase/api/Manga`, `src/app/manga-detail`
- **Standard**: `src/codebase/api/manga`, `src/app/manga-detail`

### 3. Utility & Logic Files
Helper functions and logic-only files should be in kebab-case.
- **Current**: `format.ts`, `localStorage.ts`
- **Standard**: `format.ts`, `local-storage.ts`

### 4. React Components
React components should follow **PascalCase**.
- **Standard**: `MangaCard.tsx`, `ChapterList.tsx`, `ReaderHeader.tsx`

### 5. Styles
CSS modules or global style files should be in kebab-case.
- **Standard**: `main-layout.module.css`, `global.css`

## Migration Plan
We will systematically rename existing files to match this standard:
1.  Rename directories in `src/codebase/api/` to lowercase (e.g., `Manga` -> `manga`).
2.  Rename all files inside API directories to `get-something.tsx`.
3.  Update all imports across the project to reflect the new file names.
