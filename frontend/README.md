# Blogify - Frontend Documentation

This is the documentation for the Blogify frontend. It is built using **React 19** and **Vite**, focusing on a modular, hook-driven architecture that separates visual components from business logic.

---

## Overall Architecture

The application follows a layered architecture to ensure that the code is easy to test and maintain. Each layer has a specific responsibility:

### 1. View Layer (`src/pages`, `src/containers`, `src/components`)

This layer is responsible for what the user sees and interacts with.

- **Pages**: These are the entry points for each route (e.g., Home, Dashboard). They are generally kept very thin, acting as shells that render high-level containers.
- **Containers**: These manage the "big picture" logic for a screen. They bridge the gap between global state (hooks/services) and individual UI components. For example, the `DashboardContainer` manages the state for post listing, editing, and deleting.
- **Components**: The actual UI building blocks.
  - **auth**: Logic for signing in, signing up, and password management.
  - **posts & comments**: Core features for interacting with blog content.
  - **common**: Reusable elements like avatars, loading indicators, and protected route wrappers.
  - **ui**: Low-level, pure presentation components (buttons, inputs) derived from shadcn/ui.
  - **custom**: Specialized form components that integrate our validation and styling logic.

### 2. Logic Layer (`src/hooks`)

We encapsulate nearly all our business logic and data-fetching orchestration into custom hooks.

- **Feature Hooks**: Separated by domain (auth, posts, comments). They handle things like "fetch all comments for this post" or "delete this post."
- **Utility Hooks**: Handle generic UI logic like Cloudinary uploads or managing the state of imperative dialogs.
- **React Query**: We use TanStack Query for caching and synchronizing server state, making the app feel extremely fast by avoiding unnecessary reloads.

### 3. Data Layer (`src/services`, `src/middleware`)

This layer handles all communication with the backend API.

- **Services**: Each file (e.g., `postService.js`) maps to a specific part of the backend API. They perform the actual network requests.
- **Middleware (fetchClient)**: A central hub for all outgoing requests. It handles security (JWT tokens), error catching (showing toasts for failures), and data normalization so the rest of the app gets clean objects.

### 4. Support Layer (`src/utils`, `src/validations`, `src/contexts`)

- **Validations**: Centralized schemas using Yup. These define the "rules" for our forms (e.g., "password must be 8 characters") so the UI and API are always in sync.
- **Contexts & Reducers**: Used for long-term global state, specifically the user's authentication session.
- **Utils**: Pure helper functions for formatting dates, calculating read times, and managing tokens.

---

## Workflow & Development

- **State Management**: We prefer "server state" (React Query) for anything coming from the API and "local state" (React hooks) for UI-only changes. Global context is reserved strictly for authentication.
- **Form Handling**: We use a unified pattern combining React Hook Form and our custom `FormField` components to ensure a consistent look and feel across all forms.
- **Routing**: Handled by React Router, with specialized wrappers to protect certain areas of the site from unauthorized access.

## Getting Started

1. Install everything: `npm install`
2. Environment: Define your `VITE_API_BASE_URL` in a `.env` file.
3. Run: `npm run dev` to start the local development environment at `localhost:5173`.
