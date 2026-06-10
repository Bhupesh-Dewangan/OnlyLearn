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
| **Phase 1** | **UI Shell & Navigation** | ✅ Completed | Foldable sidebar, responsive navbar, dark/light theme toggle, routing, empty state placeholders. |
| **Phase 2** | **Backend Setup & MongoDB** | ✅ Completed | Express 5, CORS, and Mongoose configured. MongoDB connected (`127.0.0.1:27017/onlylearn`). Schemas created for `User`, `Video`, `Playlist`, `WatchProgress`, `Note`, and `StudyLog`. Health check endpoint `/api/health` live. |
| **Phase 3** | **Link Parser & Content API** | 🔄 In Progress / Next | Build endpoints to accept URLs, fetch video/playlist metadata (e.g. YouTube Data API or oEmbed), and save to DB. |
| **Phase 4** | **Video Player & Home Feed** | ⏳ Planned | Replace `EmptyPage` on Home and Videos with interactive video cards, player modal/page, and playlist view. |
| **Phase 5** | **Note Taking & Study Tools** | ⏳ Planned | Timestamped notes sidebar, markdown export, video completion tracking. |
| **Phase 6** | **Analytics & Gamification** | ⏳ Planned | Watch time tracker, streak calculator, analytics charts, and leaderboard. |

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

