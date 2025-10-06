# TypeRacer-Clone

## LinkedIn Project Description
I engineered a real-time multiplayer typing race inspired by TypeRacer where friends can spin up private lobbies, invite others with a generated code, and compete to post the fastest words-per-minute score. The React front end lets players create or join games, handles countdowns, and visualises progress with live word highlights and progress bars powered by Socket.IO events. 【F:frontend/src/components/GameMenu.js†L1-L17】【F:frontend/src/components/DisplayGameCode.js†L1-L38】【F:frontend/src/components/TypeRacer.js†L1-L51】【F:frontend/src/components/ProgressBar.js†L1-L38】

Behind the scenes, an Express and Socket.IO server orchestrates game state while persisting sessions in Supabase. It seeds each match with fresh prompts from the Quotable API, tracks the leader’s countdown, locks the lobby when the race begins, and continually recalculates player WPM until the final scoreboard is broadcast. 【F:server/app.js†L1-L201】【F:server/app.js†L200-L242】

### Tech Stack Highlights
- **Frontend:** React, React Router, Tailwind CSS utility classes, and Socket.IO client for real-time UX. 【F:frontend/src/App.js†L1-L41】【F:frontend/src/components/Form.js†L1-L44】
- **Backend:** Node.js with Express and Socket.IO coordinating multiplayer events and timers. 【F:server/app.js†L1-L199】
- **Database & Auth:** Supabase tables for games and players, enabling shared state across connected clients. 【F:server/app.js†L18-L122】
- **Content & Packaging:** Dynamic race text from the Quotable API and optional Electron wrapper for desktop builds. 【F:server/app.js†L94-L122】【F:package.json†L1-L5】

### Gameplay Flow
1. A host creates a lobby and becomes the party leader; friends join by entering the shared game code. 【F:frontend/src/components/CreateGame.js†L1-L44】【F:frontend/src/components/JoinGame.js†L1-L49】
2. The leader launches a synchronized countdown before typing begins, preventing late joins once the race starts. 【F:frontend/src/components/StartBtn.js†L1-L32】【F:server/app.js†L124-L176】
3. Players type through the prompt while their progress bars, highlighted text, and live WPM leaderboard update in real time until the match ends. 【F:frontend/src/components/DisplayWords.js†L1-L33】【F:frontend/src/components/ProgressBar.js†L1-L38】【F:frontend/src/components/ScoreBoard.js†L1-L33】【F:server/app.js†L24-L201】
