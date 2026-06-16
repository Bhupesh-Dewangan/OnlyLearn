# OnlyLearn — Backend API Documentation & Endpoints Reference

**Base URL**: `http://localhost:3000`  
**Content-Type**: `application/json`

---

## Standard Response Format

All API responses follow a uniform JSON structure:

### Success Response
```json
{
  "success": true,
  "count": 1,          // (Optional) present in array responses
  "data": { ... }      // Object or Array of data
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## Table of Contents
1. [System & Health](#1-system--health)
2. [User Module (`/api/users`)](#2-user-module-apiusers)
3. [Video Module (`/api/videos`)](#3-video-module-apivideos)
4. [Playlist Module (`/api/playlists`)](#4-playlist-module-apiplaylists)
5. [Progress & History Module (`/api/progress`)](#5-progress--history-module-apiprogress)
6. [Note Module (`/api/notes`)](#6-note-module-apinotes)
7. [Analytics & Leaderboard Module (`/api/analytics`)](#7-analytics--leaderboard-module-apianalytics)

---

## 1. System & Health

### 1.1 Base Root Check
- **Endpoint**: `GET /`
- **Description**: Verifies that the Express server listener is online.
- **Request Body**: None
- **Sample Response** (`200 OK`):
```text
Backend is running smoothly!
```

### 1.2 Health & Database Status
- **Endpoint**: `GET /api/health`
- **Description**: Checks service vitality and MongoDB connection status.
- **Request Body**: None
- **Sample Response** (`200 OK`):
```json
{
  "status": "ok",
  "database": "Connected",
  "timestamp": "2026-10-31T15:00:00.000Z"
}
```

---

## 2. User Module (`/api/users`)

### 2.1 Get User Profile
- **Endpoint**: `GET /api/users/:id`
- **Description**: Retrieves public user profile and learning statistics (excludes `passwordHash`).
- **URL Parameters**:
  - `id`: MongoDB User ID (`ObjectId`)
- **Request Body**: None
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "6723789a1f2b3c4d5e6f7a8b",
    "username": "bhupesh_dev",
    "email": "bhupesh@example.com",
    "avatarUrl": "https://api.dicebear.com/7.x/identicon/svg?seed=bhupesh",
    "streakCount": 7,
    "totalStudyMinutes": 320,
    "preferences": {
      "theme": "dark",
      "isSidebarFolded": false
    },
    "createdAt": "2026-10-25T10:00:00.000Z",
    "updatedAt": "2026-10-31T12:00:00.000Z"
  }
}
```

### 2.2 Update User Preferences
- **Endpoint**: `PATCH /api/users/:id/preferences`
- **Description**: Updates user UI settings (theme mode and sidebar state).
- **URL Parameters**:
  - `id`: MongoDB User ID (`ObjectId`)
- **Sample Input**:
```json
{
  "theme": "dark",
  "isSidebarFolded": true
}
```
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "6723789a1f2b3c4d5e6f7a8b",
    "username": "bhupesh_dev",
    "email": "bhupesh@example.com",
    "preferences": {
      "theme": "dark",
      "isSidebarFolded": true
    }
  }
}
```

---

## 3. Video Module (`/api/videos`)

### 3.1 Get All Videos
- **Endpoint**: `GET /api/videos`
- **Description**: Returns all imported learning videos sorted newest to oldest. Supports query filtering.
- **Query Parameters**:
  - `favorite` (optional): `true` to filter only bookmarked videos.
  - `tag` (optional): Tag name (e.g. `javascript`, `react`).
- **Request Body**: None
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "67237a011f2b3c4d5e6f7a90",
      "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "platform": "youtube",
      "platformId": "dQw4w9WgXcQ",
      "title": "React 19 Full Course 2026",
      "description": "Comprehensive tutorial covering React 19 and modern hooks.",
      "thumbnailUrl": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      "channelName": "Tech Academy",
      "channelUrl": "https://www.youtube.com/@techacademy",
      "duration": 5400,
      "tags": ["react", "frontend", "webdev"],
      "isFavorite": true,
      "createdAt": "2026-10-31T14:00:00.000Z"
    }
  ]
}
```

### 3.2 Import / Save New Video
- **Endpoint**: `POST /api/videos`
- **Description**: Ingests a new video entry into the library. If the video with the same `platformId` already exists, returns the existing record without duplicates.
- **Sample Input**:
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "platform": "youtube",
  "platformId": "dQw4w9WgXcQ",
  "title": "React 19 Full Course 2026",
  "description": "Comprehensive tutorial covering React 19 and modern hooks.",
  "thumbnailUrl": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  "channelName": "Tech Academy",
  "channelUrl": "https://www.youtube.com/@techacademy",
  "duration": 5400,
  "tags": ["react", "webdev"],
  "importedBy": "6723789a1f2b3c4d5e6f7a8b"
}
```
- **Sample Response** (`201 Created`):
```json
{
  "success": true,
  "data": {
    "_id": "67237a011f2b3c4d5e6f7a90",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "platform": "youtube",
    "platformId": "dQw4w9WgXcQ",
    "title": "React 19 Full Course 2026",
    "duration": 5400,
    "tags": ["react", "webdev"],
    "isFavorite": false,
    "createdAt": "2026-10-31T15:20:00.000Z"
  }
}
```

### 3.3 Get Video Details
- **Endpoint**: `GET /api/videos/:id`
- **Description**: Fetches metadata for a single video.
- **URL Parameters**:
  - `id`: Video `ObjectId`
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "67237a011f2b3c4d5e6f7a90",
    "title": "React 19 Full Course 2026",
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "duration": 5400
  }
}
```

### 3.4 Toggle Video Favorite Bookmark
- **Endpoint**: `PATCH /api/videos/:id/favorite`
- **Description**: Toggles `isFavorite` between `true` and `false`.
- **URL Parameters**:
  - `id`: Video `ObjectId`
- **Request Body**: None
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "67237a011f2b3c4d5e6f7a90",
    "title": "React 19 Full Course 2026",
    "isFavorite": true
  }
}
```

### 3.5 Delete Video
- **Endpoint**: `DELETE /api/videos/:id`
- **Description**: Removes a video from the library.
- **URL Parameters**:
  - `id`: Video `ObjectId`
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Video removed successfully"
}
```

---

## 4. Playlist Module (`/api/playlists`)

### 4.1 Get All Playlists
- **Endpoint**: `GET /api/playlists`
- **Description**: Retrieves all learning playlists with their contained videos populated.
- **Request Body**: None
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "67237b121f2b3c4d5e6f7aa1",
      "title": "Full-Stack Web Development Bootcamp",
      "description": "Structured curriculum of frontend and backend lectures.",
      "thumbnailUrl": "https://example.com/playlist-thumb.jpg",
      "videos": [
        {
          "_id": "67237a011f2b3c4d5e6f7a90",
          "title": "React 19 Full Course 2026",
          "duration": 5400
        }
      ],
      "isPublic": false,
      "createdAt": "2026-10-31T15:30:00.000Z"
    }
  ]
}
```

### 4.2 Create Playlist
- **Endpoint**: `POST /api/playlists`
- **Description**: Creates a new custom learning playlist.
- **Sample Input**:
```json
{
  "title": "Full-Stack Web Development Bootcamp",
  "description": "Structured curriculum of frontend and backend lectures.",
  "thumbnailUrl": "https://example.com/playlist-thumb.jpg",
  "sourceUrl": "https://www.youtube.com/playlist?list=PL12345",
  "createdBy": "6723789a1f2b3c4d5e6f7a8b",
  "isPublic": false
}
```
- **Sample Response** (`201 Created`):
```json
{
  "success": true,
  "data": {
    "_id": "67237b121f2b3c4d5e6f7aa1",
    "title": "Full-Stack Web Development Bootcamp",
    "videos": [],
    "createdAt": "2026-10-31T15:30:00.000Z"
  }
}
```

### 4.3 Get Playlist by ID
- **Endpoint**: `GET /api/playlists/:id`
- **Description**: Returns a specific playlist and all populated video objects.
- **URL Parameters**:
  - `id`: Playlist `ObjectId`
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "67237b121f2b3c4d5e6f7aa1",
    "title": "Full-Stack Web Development Bootcamp",
    "videos": [
      {
        "_id": "67237a011f2b3c4d5e6f7a90",
        "title": "React 19 Full Course 2026",
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
    ]
  }
}
```

### 4.4 Add Video to Playlist
- **Endpoint**: `POST /api/playlists/:id/videos`
- **Description**: Appends a video to a playlist (prevents duplicates via `$addToSet`).
- **URL Parameters**:
  - `id`: Playlist `ObjectId`
- **Sample Input**:
```json
{
  "videoId": "67237a011f2b3c4d5e6f7a90"
}
```
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "67237b121f2b3c4d5e6f7aa1",
    "title": "Full-Stack Web Development Bootcamp",
    "videos": [
      {
        "_id": "67237a011f2b3c4d5e6f7a90",
        "title": "React 19 Full Course 2026"
      }
    ]
  }
}
```

### 4.5 Remove Video from Playlist
- **Endpoint**: `DELETE /api/playlists/:id/videos/:videoId`
- **Description**: Removes an individual video from a playlist.
- **URL Parameters**:
  - `id`: Playlist `ObjectId`
  - `videoId`: Video `ObjectId`
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "67237b121f2b3c4d5e6f7aa1",
    "videos": []
  }
}
```

### 4.6 Delete Playlist
- **Endpoint**: `DELETE /api/playlists/:id`
- **Description**: Deletes a playlist document (does not delete the underlying videos).
- **URL Parameters**:
  - `id`: Playlist `ObjectId`
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Playlist deleted successfully"
}
```

---

## 5. Progress & History Module (`/api/progress`)

### 5.1 Get Watch History
- **Endpoint**: `GET /api/progress/history`
- **Description**: Retrieves recent watch activity with populated video objects, sorted newest to oldest.
- **Query Parameters**:
  - `userId` (optional): Filter history by user.
  - `limit` (optional): Max items to return (default: `50`).
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "67237c441f2b3c4d5e6f7ab5",
      "userId": "6723789a1f2b3c4d5e6f7a8b",
      "videoId": {
        "_id": "67237a011f2b3c4d5e6f7a90",
        "title": "React 19 Full Course 2026",
        "thumbnailUrl": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        "duration": 5400
      },
      "playbackPositionSeconds": 1845,
      "durationSeconds": 5400,
      "isCompleted": false,
      "lastWatchedAt": "2026-10-31T15:40:00.000Z"
    }
  ]
}
```

### 5.2 Save / Update Playback Progress
- **Endpoint**: `POST /api/progress/update`
- **Description**: Upserts the user's current playback position, total duration, and completed status for a video.
- **Sample Input**:
```json
{
  "userId": "6723789a1f2b3c4d5e6f7a8b",
  "videoId": "67237a011f2b3c4d5e6f7a90",
  "playbackPositionSeconds": 2400,
  "durationSeconds": 5400,
  "isCompleted": false
}
```
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "67237c441f2b3c4d5e6f7ab5",
    "userId": "6723789a1f2b3c4d5e6f7a8b",
    "videoId": {
      "_id": "67237a011f2b3c4d5e6f7a90",
      "title": "React 19 Full Course 2026"
    },
    "playbackPositionSeconds": 2400,
    "durationSeconds": 5400,
    "isCompleted": false,
    "lastWatchedAt": "2026-10-31T15:42:00.000Z"
  }
}
```

### 5.3 Clear Watch History
- **Endpoint**: `DELETE /api/progress/history`
- **Description**: Clears watch history for a user.
- **Query Parameters**:
  - `userId` (optional): User ID whose history should be wiped.
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "message": "History cleared successfully"
}
```

---

## 6. Note Module (`/api/notes`)

### 6.1 Get Notes for a Video
- **Endpoint**: `GET /api/notes/video/:videoId`
- **Description**: Returns all markdown study notes for a specific video, sorted chronologically by timestamp.
- **URL Parameters**:
  - `videoId`: Video `ObjectId`
- **Query Parameters**:
  - `userId` (optional): Filter to current user's personal notes.
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "67237d881f2b3c4d5e6f7ac3",
      "userId": "6723789a1f2b3c4d5e6f7a8b",
      "videoId": "67237a011f2b3c4d5e6f7a90",
      "timestampSeconds": 420,
      "title": "Understanding useActionState",
      "contentMarkdown": "- Replaces useFormState in React 19\n- Returns `[state, formAction, isPending]`",
      "createdAt": "2026-10-31T15:50:00.000Z",
      "updatedAt": "2026-10-31T15:50:00.000Z"
    }
  ]
}
```

### 6.2 Create Timestamped Note
- **Endpoint**: `POST /api/notes`
- **Description**: Creates a new note anchored to a specific second in the video playback.
- **Sample Input**:
```json
{
  "userId": "6723789a1f2b3c4d5e6f7a8b",
  "videoId": "67237a011f2b3c4d5e6f7a90",
  "timestampSeconds": 420,
  "title": "Understanding useActionState",
  "contentMarkdown": "- Replaces useFormState in React 19\n- Returns `[state, formAction, isPending]`"
}
```
- **Sample Response** (`201 Created`):
```json
{
  "success": true,
  "data": {
    "_id": "67237d881f2b3c4d5e6f7ac3",
    "userId": "6723789a1f2b3c4d5e6f7a8b",
    "videoId": "67237a011f2b3c4d5e6f7a90",
    "timestampSeconds": 420,
    "title": "Understanding useActionState",
    "contentMarkdown": "- Replaces useFormState in React 19\n- Returns `[state, formAction, isPending]`",
    "createdAt": "2026-10-31T15:50:00.000Z"
  }
}
```

### 6.3 Update Note
- **Endpoint**: `PATCH /api/notes/:id`
- **Description**: Updates note title, content, or timestamp.
- **URL Parameters**:
  - `id`: Note `ObjectId`
- **Sample Input**:
```json
{
  "contentMarkdown": "Updated summary note: also remember Server Actions support!"
}
```
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "67237d881f2b3c4d5e6f7ac3",
    "contentMarkdown": "Updated summary note: also remember Server Actions support!",
    "updatedAt": "2026-10-31T15:55:00.000Z"
  }
}
```

### 6.4 Delete Note
- **Endpoint**: `DELETE /api/notes/:id`
- **Description**: Deletes a study note.
- **URL Parameters**:
  - `id`: Note `ObjectId`
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

## 7. Analytics & Leaderboard Module (`/api/analytics`)

### 7.1 Record Study Session
- **Endpoint**: `POST /api/analytics/session`
- **Description**: Records learning time in minutes for today's calendar date (`YYYY-MM-DD`). Automatically increments the user's cumulative `totalStudyMinutes`.
- **Sample Input**:
```json
{
  "userId": "6723789a1f2b3c4d5e6f7a8b",
  "minutes": 45,
  "completed": true
}
```
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "_id": "67237e191f2b3c4d5e6f7ad0",
    "userId": "6723789a1f2b3c4d5e6f7a8b",
    "date": "2026-10-31",
    "minutesLearned": 45,
    "videosCompleted": 1,
    "createdAt": "2026-10-31T16:00:00.000Z",
    "updatedAt": "2026-10-31T16:00:00.000Z"
  }
}
```

### 7.2 Get User Analytics History
- **Endpoint**: `GET /api/analytics/user`
- **Description**: Fetches daily study logs for charts and habit tracking (streaks and hours studied).
- **Query Parameters**:
  - `userId` (required): User `ObjectId`
  - `days` (optional): Number of recent days (default: `30`).
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "67237e191f2b3c4d5e6f7ad0",
      "date": "2026-10-31",
      "minutesLearned": 45,
      "videosCompleted": 1
    },
    {
      "_id": "672288331f2b3c4d5e6f7001",
      "date": "2026-10-30",
      "minutesLearned": 60,
      "videosCompleted": 2
    }
  ]
}
```

### 7.3 Get Global / Peer Leaderboard
- **Endpoint**: `GET /api/analytics/leaderboard`
- **Description**: Returns top learning ranks sorted by `totalStudyMinutes` and `streakCount`.
- **Query Parameters**:
  - `limit` (optional): Max users to return (default: `20`).
- **Sample Response** (`200 OK`):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6723789a1f2b3c4d5e6f7a8b",
      "username": "bhupesh_dev",
      "avatarUrl": "https://api.dicebear.com/7.x/identicon/svg?seed=bhupesh",
      "streakCount": 7,
      "totalStudyMinutes": 320
    },
    {
      "_id": "6723789a1f2b3c4d5e6f7a99",
      "username": "alex_code",
      "avatarUrl": "https://api.dicebear.com/7.x/identicon/svg?seed=alex",
      "streakCount": 5,
      "totalStudyMinutes": 210
    }
  ]
}
```

