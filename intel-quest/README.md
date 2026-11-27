# Intel Quest

A 2-3 minute in-store game for Gen-Z shoppers (CMRIT x Intel 1 Million Minds, Round 1).
Flow: Hook -> Persona, budget and priority -> 3 playable challenges (timer, XP, badges) -> Intel vs alternatives -> personalised AI PC + QR + "Try it in store".
Extras: "Ask Qi" assistant, Engine Lab (CPU/GPU/NPU simulator), English/Hindi/Kannada UI with read-aloud, before/after intent survey, shareable quest card + WhatsApp share, 90-second kiosk auto-reset.

## Dashboards
- **User dashboard**: `/#/me` (also the header button). Nickname, avatar, level, XP, badges, past recommendations, device leaderboard.
- **Admin dashboard**: `/#/admin` (footer link). Default PIN `intel2026`, change it under Store setup. Shows funnel, completion rate, average XP/time, "Try in store" rate, intent shift (before vs after), profiles, budgets, challenge scores, daily quests, sessions table, CSV export. Store setup lets staff enter real models in stock (shown to matching shoppers), the store name, and the ask-for text.
- "Load sample data" fills the admin view for demos. It is clearly marked and removable.
- Data lives in the browser (localStorage) of the device running the kiosk. Aggregating across stores would need a backend (e.g. Supabase).

## Run in Antigravity (or VS Code)
1. Install Node.js LTS from https://nodejs.org (v18+).
2. Unzip, then File > Open Folder > `intel-quest`.
3. Open the terminal (Ctrl+`) and run:
   ```
   npm install
   npm run dev
   ```
4. Open http://localhost:5173 and play the whole flow once.
5. Check the production build: `npm run build` (should end with "built in ...").

## Deploy (public URL)
1. Create a GitHub repo `intel-quest` and push this folder (`.gitignore` already skips node_modules, dist and .env).
2. vercel.com > Sign in with GitHub > Add New > Project > import the repo.
3. Framework: Vite, Build: `npm run build`, Output: `dist` > Deploy.
4. Open the `*.vercel.app` URL in a private window to confirm it loads without login, then submit it in the Google Form.

## Accuracy notes
- No benchmark numbers or prices are invented. Recommendations are categories plus specs to check, not specific models.
- Copilot+ is a separate Microsoft category (NPU 40+ TOPS). Core Ultra Series 3 is up to 50 TOPS and 200V is 48 TOPS. Value-tier chips and earlier Core Ultra may not qualify.
- On-device AI reduces data leaving the PC but does not guarantee privacy.
