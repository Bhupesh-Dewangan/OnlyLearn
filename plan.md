# OnlyLearn — Project Plan & Feature Roadmap

## 1. Project Overview & Mission

**OnlyLearn** is a **distraction-free, curated learning video platform**.

### The Problem
Traditional video platforms (like YouTube) are engineered for maximum watch time and algorithmic engagement. When students and self-learners try to study, they are bombarded with:
- Algorithmic recommendation rabbit holes and clickbait
- Addictive short-form videos (Shorts/Reels)
- Irrelevant comment sections and ads
- Disorganized learning materials scattered across watch histories

### The Solution
OnlyLearn provides a dedicated, focused study environment where users **intentionally import only the learning content they need**. The platform strips away distractions, organizes study material into structured courses, and provides productivity analytics and gamification to keep learners consistent.

---

## 2. Tech Stack & Architecture

- **Frontend**:
  - React 19 + Vite 8
  - Tailwind CSS v4
  - React Router v7 (`react-router-dom`)
  - Icons: `react-icons`
  - Global State: React Context (`ThemeContext`, `ContentContext`)
- **Backend**:
  - Node.js + Express 5
  - `dotenv` (Environment configurations)
  - `nodemon` (Development runtime)
- **Database**:
  - **MongoDB** with **Mongoose** ODM for flexible document storage (users, playlists, video metadata, notes, and study analytics).

### Backend Modular Architecture
All backend application code lives strictly inside `server/src/`:
```
server/src/
├── app.js               # Express application setup, global middleware & route registration
├── server.js            # HTTP server listener, MongoDB initialization & socket setup
├── config/              # Central configurations (e.g., db.js for MongoDB connection)
├── middleware/          # Express middlewares (errorHandler.js, auth, validation, etc.)
├── socket/              # WebSockets / Socket.io real-time event handlers
└── modules/             # Domain modules, each strictly containing 4 files:
    ├── user/            # user.routes.js, user.controller.js, user.service.js, user.model.js
    ├── video/           # video.routes.js, video.controller.js, video.service.js, video.model.js
    ├── playlist/        # playlist.routes.js, playlist.controller.js, playlist.service.js, playlist.model.js
    ├── progress/        # progress.routes.js, progress.controller.js, progress.service.js, progress.model.js
    ├── note/            # note.routes.js, note.controller.js, note.service.js, note.model.js
    └── analytics/       # analytics.routes.js, analytics.controller.js, analytics.service.js, analytics.model.js
```
Every module strictly separates responsibilities:
- **Routes (`*.routes.js`)**: Endpoint URI definitions and middleware attachment.
- **Controller (`*.controller.js`)**: HTTP request handling, input validation, and response formatting.
- **Service (`*.service.js`)**: Core business logic, external API integrations, and database interactions.
- **Model (`*.model.js`)**: Mongoose schema and document models.

> Detailed endpoint specifications, sample inputs, and JSON responses are documented in [server/endpoints.md](file:///h:/`Web%20Dev%20Projects/OnlyLearn/server/endpoints.md).

---

## 3. Core Target Features

### Feature 1: Link Importer & Content Ingestion
- **Navbar Import Bar**: Support pasting video and playlist URLs (e.g., YouTube video/playlist links).
- **Metadata Extraction Service**:
  - Parse video ID, title, channel name, thumbnail, duration, and chapter markers.
  - Parse playlists and import batches of sequential lectures.
- **Validation & Sanitization**: Ensure only valid media URLs are accepted and formatted.

### Feature 2: Distraction-Free Video Player & Study Workspace
- **Zero-Distraction Player**:
  - Embedded player with no external suggestions or sidebar rabbit holes.
  - Playback speed controls, theater/focus mode.
- **Study Companion Tools**:
  - **In-Video Notes**: Markdown-enabled notes tied to specific video timestamps.
  - **Timestamps / Chapter Index**: Quick jump between key lecture sections.
  - **Completion Toggle**: Mark videos as "Completed" or "In Progress".

### Feature 3: Content Organization & Library
- **Home (`/`)**: Central dashboard with "Continue Learning", recently imported videos, and overall progress.
- **Videos (`/videos`)**: Comprehensive catalog of all imported individual videos with search and tag filters.
- **Playlists (`/playlists`)**: Group imported videos into custom learning roadmaps (e.g., "Full-Stack Web Dev", "Linear Algebra").
- **Recently / History (`/history`)**: Chronological timeline of imported and watched lessons with resume timestamps.
- **Favorites (`/favorites`)**: Bookmarked lectures for quick revision and reference.
- **Subscriptions (`/subscriptions`)**: Tracked educational channels/creators to easily import their newest tutorials.

### Feature 4: Learning Analytics & Gamification
- **Analytics (`/analytics`)**:
  - Total study time tracked (daily, weekly, monthly).
  - Study streak counter (consecutive days of learning).
  - Subject/Topic breakdown (visual charts of time spent per subject).
- **Leaderboard (`/leaderboard`)**:
  - Gamified study hours and streak scores.
  - Optional peer accountability / study group rankings.

### Feature 5: User Accounts & Data Persistence
- **Authentication**: User sign-up, sign-in, and session management (JWT / OAuth).
- **Persistent Storage**:
  - User profiles and preferences (Dark/Light mode, sidebar state).
  - Saved videos, playlists, watch history, and timestamps.
  - Personal timestamped study notes.

### Planned MongoDB Schema Design (Mongoose)
- **`User`**: `username`, `email`, `passwordHash`, `avatarUrl`, `streakCount`, `totalStudyHours`, `preferences` (theme, sidebar).
- **`Video`**: `url`, `platform` (e.g. YouTube), `platformId`, `title`, `description`, `thumbnailUrl`, `channelName`, `duration`, `tags`, `importedBy` (User ref), `createdAt`.
- **`Playlist`**: `title`, `description`, `thumbnailUrl`, `videos` ([Video ref]), `createdBy` (User ref), `isPublic`, `order`.
- **`History` / `WatchProgress`**: `userId`, `videoId`, `lastWatchedAt`, `playbackPositionSeconds`, `isCompleted`.
- **`Note`**: `userId`, `videoId`, `timestampSeconds`, `contentMarkdown`, `createdAt`, `updatedAt`.
- **`StudyLog`**: `userId`, `date`, `minutesLearned`, `completedVideosCount`.

---

## 4. Implementation Roadmap & Current Status

| Phase | Milestone | Status | Key Deliverables |
|---|---|---|---|
| **Phase 1** | **UI Shell & Navigation** | ✅ Completed | Foldable sidebar, responsive navbar, dark/light theme toggle, routing, and placeholder pages. |
| **Phase 2** | **Backend Setup & MongoDB** | ✅ Completed | Express 5, CORS, and Mongoose configured. MongoDB connected (`127.0.0.1:27017/onlylearn`). Modular structure with `routes`, `controller`, `service`, `model` for 6 modules (`user`, `video`, `playlist`, `progress`, `note`, `analytics`). Health check endpoint `/api/health` live. |
| **Phase 3** | **Networking Bridge & Link Ingestion** | ✅ Completed | Vite proxy configured, centralized API client created (`frontend/src/services/api.js`), automatic YouTube URL metadata extractor (oEmbed) integrated, Navbar link importer connected to MongoDB with animated spinner and toast notifications. |
| **Phase 4** | **Video Library & Feed UI** | ✅ Completed | Created `VideoCard` and `VideoGrid` components with skeleton loading states; replaced `EmptyPage` on `Home.jsx` (with stats banner and recent videos), `Videos.jsx` (with search and sorting), and `Favorites.jsx` (with bookmark filtering). Fixed all ESLint issues. |
| **Phase 5** | **Distraction-Free Video Player** | 🔄 In Progress / Next | Create `/watch/:id` route, embed clean distraction-free YouTube player, auto-sync playback position with `/api/progress/update`, and enable resume on `History`. |
| **Phase 6** | **In-Video Study Notes** | ⏳ Planned | Add side study panel on watch page: timestamped markdown notes, 1-click jump to lecture moments, and CRUD via `/api/notes`. |
| **Phase 7** | **Playlists & Learning Paths** | ⏳ Planned | Create playlist modal, video playlist selector, and course player view on `/playlists`. |
| **Phase 8** | **Authentication & User System** | ⏳ Planned | Add JWT + bcrypt auth module on backend (`/api/auth`), AuthContext & Login/Signup modal on frontend, protected routes, and user profile management. |
| **Phase 9** | **Analytics & Gamified Leaderboard** | ⏳ Planned | Interactive study time charts on `Analytics.jsx`, streak tracker, and competitive rankings on `Leaderboard.jsx`. |

### Detailed Phase Execution Breakdown

#### Phase 3: Networking Bridge & Link Ingestion (Priority #1)
- **Frontend Proxy**: Add `server.proxy` for `/api` in `frontend/vite.config.js`.
- **API Client**: Create `frontend/src/services/api.js` with centralized `fetch`/`axios` error handling and methods (`getVideos`, `importVideo`, `toggleFavorite`, etc.).
- **URL Metadata Extractor (Backend)**:
  - Add YouTube URL parser utility in `server/src/modules/video/video.service.js`.
  - Fetch metadata from YouTube oEmbed API (`https://www.youtube.com/oembed?url=...&format=json`) to extract title, thumbnail, and author.
  - Automatically extract video ID from YouTube standard (`watch?v=`), short (`youtu.be/`), and embed URLs.
- **Navbar Connection**:
  - Connect `Navbar.jsx` form submission to `api.importVideo(url)`.
  - Add loading spinner and visual toast feedback (success, duplicate, invalid link).

#### Phase 4: Video Library & Feed UI
- **Components**:
  - `VideoCard.jsx`: Displays thumbnail, title, channel, duration, favorite heart toggle, and watch button.
  - `VideoGrid.jsx`: Responsive multi-column layout with loading skeletons and empty states.
- **Page Implementations**:
  - `Home.jsx`: "Recently Imported" video carousel/grid + quick study stats.
  - `Videos.jsx`: Full video catalog with live search filter and topic tags.
  - `Favorites.jsx`: Videos filtered by `isFavorite: true`.

#### Phase 5: Distraction-Free Video Player & Progress Tracking
- **Route**: Add `/watch/:id` in `frontend/src/App.jsx`.
- **`Watch.jsx` Page**:
  - Distraction-free embedded player with playback controls and focus mode.
  - Periodic progress reporter: calls `POST /api/progress/update` every 10–15 seconds with current timestamp.
  - "Mark as Completed" button.
- **`History.jsx`**:
  - Display recently watched videos with visual progress bar and "Resume at [MM:SS]" button.

#### Phase 6: In-Video Study Notes
- **Study Companion Panel**:
  - Collapsible side panel next to the video player on `/watch/:id`.
  - "Capture Timestamp Note" button: captures current video second automatically.
  - Markdown editor for quick formatted notes.
  - Interactive notes list: clicking any note timestamp seeks the video to that exact second.

#### Phase 7: Playlists & Course Learning Paths
- **Playlist Management**:
  - "New Playlist" modal with title and description.
  - "Add to Playlist" action on each video card.
  - Playlist viewer on `/playlists` displaying video counts and cumulative duration.

#### Phase 8: Authentication & Security
- **Backend Auth Module**:
  - Endpoints: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.
  - Password hashing with `bcryptjs`.
  - JWT token generation and verification middleware (`protect`).
- **Frontend Auth Integration**:
  - `AuthContext` to persist tokens in `localStorage`.
  - Login / Register modal triggered from navbar avatar.
  - Route guard for personalized features.

#### Phase 9: Analytics & Gamification
- **`Analytics.jsx`**:
  - Visual charts for daily/weekly study hours (via `GET /api/analytics/user`).
  - Study streak counter badge.
- **`Leaderboard.jsx`**:
  - Community/Peer table ranked by total study hours and active streaks.

---

## 5. UI Page Reference Guide

| Route | Page Component | Current State | Target Functionality |
|---|---|---|---|
| `/` | `Home.jsx` | `EmptyPage` placeholder | Dashboard with "Continue Watching", recent courses, and quick stats. |
| `/history` | `History.jsx` | `EmptyPage` placeholder | Watch history with progress bars and resume buttons. |
| `/playlists` | `Playlists.jsx` | `EmptyPage` placeholder | Custom learning playlists and imported course series. |
| `/videos` | `Videos.jsx` | `EmptyPage` placeholder | Grid of all imported videos with search and filter. |
| `/favorites` | `Favorites.jsx` | `EmptyPage` placeholder | Bookmarked videos and lectures. |
| `/subscriptions`| `Subscriptions.jsx`| `EmptyPage` placeholder | Tracked educational channels. |
| `/analytics` | `Analytics.jsx` | Bare placeholder | Study time charts, streaks, and subject distribution. |
| `/leaderboard` | `Leaderboard.jsx` | Bare placeholder | Peer learning rankings and streak milestones. |
| `/settings` | `Settings.jsx` | Bare placeholder | User profile, theme preferences, and data export. |
| `/feedback` | `Feedback.jsx` | Bare placeholder | Feedback form for platform improvements. |
| `/help` | `Help.jsx` | Bare placeholder | FAQ and guide on importing content. |

