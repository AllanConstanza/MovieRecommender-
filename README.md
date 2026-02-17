# MovieRec — Movie Recommendation App

A personalized movie recommendation web app built with React and Next.js. Users select their favorite genres, get tailored movie recommendations from TMDB, build a watchlist, and leave reviews that can influence future suggestions.

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4
- **Authentication:** Firebase Auth (Email/Password + Google)
- **Database:** Cloud Firestore
- **Movie Data:** [TMDB API](https://www.themoviedb.org/documentation/api)

## Features

- **Genre-based onboarding** — Select 3+ genres to get personalized recommendations
- **Movie recommendations** — Powered by TMDB's discover endpoint, sorted by popularity
- **Watchlist** — Bookmark movies to watch later
- **Reviews** — Rate movies (1-5 stars) with optional text reviews
- **Smart recommendations** — Toggle to factor in your review history alongside genres
- **Change genres** — Update your genre preferences anytime from the recommendations page
- **Guest & authenticated modes** — Browse as a guest (session-only) or sign in to persist your data
- **Responsive design** — Works on desktop, tablet, and mobile


### Prerequisites to Clone

- Node.js 18+
- A [TMDB API key](https://www.themoviedb.org/settings/api)
- A [Firebase project](https://console.firebase.google.com/) with Auth and Firestore enabled

