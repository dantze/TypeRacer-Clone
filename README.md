# TypeRacer-Clone

### Tech Stack Highlights
- **Frontend:** React, React Router, Tailwind CSS utility classes, and Socket.IO client for real-time UX. 
- **Backend:** Node.js with Express and Socket.IO coordinating multiplayer events and timers. 
- **Database & Auth:** Supabase tables for games and players, enabling shared state across connected clients. 
- **Content & Packaging:** Dynamic race text from the Quotable API and optional Electron wrapper for desktop builds. 

### Gameplay Flow
1. A host creates a lobby and becomes the party leader; friends join by entering the shared game code. 
2. The leader launches a synchronized countdown before typing begins, preventing late joins once the race starts. 
3. Players type through the prompt while their progress bars, highlighted text, and live WPM leaderboard update in real time until the match ends. 
