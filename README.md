# Campus Lost & Found Application

A React + Vite web application for reporting, browsing, and resolving lost or found items on campus .

## Features

- Student login using USN records .
- Admin login for monitoring all reports and leaderboard activity
- Post lost and found item reports with category, date, location, contact details, image upload, importance flag, and optional reward
- Live location support through the browser Geolocation API
- Dashboard statistics for lost, found, and resolved items
- Search and filters for category, location, reward-only, and important-only reports
- Item detail page with reporter information, image preview, reward status, and pseudo payment flow
- Item-specific chat with text and image messages
- Points system that awards students for successful returns
- Admin leaderboard showing top helpers
- Light and dark theme toggle
- In-app notifications for new posts and resolved items

## Tech Stack

- HTML
- CSS
- JavaScript
- React 19
- Vite 8
- React Router
- CSS
- ESLint

## Getting Started

### Prerequisites

Install Node.js and npm before running the project.

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Usage Flow

1. Log in as a student using a valid USN from the CSV file.
2. Post a lost or found item with all required details.
3. Browse reports from the dashboard using filters and search.
4. Open an item page to chat with the reporter or finder.
5. If a reward is offered, complete the pseudo payment before resolving.
6. Mark the item as resolved once it is returned.
7. Admin can view all activity and the helper leaderboard.
