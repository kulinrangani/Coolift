# Phase 7 Plan — Progressive Overload, Enhancements & Deployment

*Focus: Smart progressive overload recommendations, exercise notes, production build, and AWS/Vercel server deployment.*

---

## 🎯 Phase Goal
Deliver advanced usability features (progressive overload recommendations, exercise form notes) and deploy the production-ready frontend (Vercel/Amplify) and backend API (AWS EC2 + PM2 + Nginx + MongoDB Atlas).

---

## 📋 Task Breakdown

### 1. Progressive Overload Suggestion Engine (`progressiveOverload.ts`)
* **Logic:** Analyze completed set history for an exercise.
* **Criteria:** If user hits top rep range (e.g. 10 reps on a target 6-10 rep range) for all working sets across 2 consecutive sessions:
  * Suggest +2.5 kg for upper body isolation / +5 kg for lower body compound movements.
  * Show recommendation badge on Workout screen: `"Suggested weight: 62.5 kg (+2.5 kg)"`.
* Keep reps in reserve (1-3 RIR) guidance without forcing automatic weight changes.

### 2. Exercise Notes & Machine Setup
* Add collapsible notes field per exercise card (e.g., *"Seat height: 4, Grip width: wide, keep elbows tucked"*).
* Persist exercise notes locally in Dexie and sync with backend.

### 3. Production Deployment Setup

#### A. Frontend (Vercel / AWS Amplify):
* Production bundle build verification (`npm run build`).
* Custom domain configuration (e.g., `gym.kulin.online`).
* Environment variables configuration (`VITE_API_URL`).

#### B. Backend Server (AWS EC2 + PM2 + Nginx):
* **PM2 Setup:** Create `ecosystem.config.js` for process management and auto-restart.
* **Nginx Reverse Proxy:** Route port 80/443 to Node.js backend port 5000.
* **SSL / HTTPS:** Enable HTTPS via Let's Encrypt / Certbot (`certbot --nginx`).
* **MongoDB Atlas:** Secure connection URI with IP whitelisting & environment variables.

---

## 🧪 Acceptance Criteria
1. Progressive overload suggestions appear correctly when top rep range criteria are met.
2. Exercise notes persist across sessions.
3. Production build completes without TypeScript or linting errors.
4. Live deployment serves frontend PWA and backend HTTPS API securely.
