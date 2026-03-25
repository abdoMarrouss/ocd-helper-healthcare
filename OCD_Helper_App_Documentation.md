# مساعد الوسواس — OCD Helper App
### Complete Application Documentation

---

## Table of Contents

1. [Overview](#1-overview)
2. [Clinical Foundation](#2-clinical-foundation)
3. [Technical Stack](#3-technical-stack)
4. [Features & Pages](#4-features--pages)
5. [Language Support](#5-language-support)
6. [Backend API](#6-backend-api)
7. [Mobile App Architecture](#7-mobile-app-architecture)
8. [Database Schema](#8-database-schema)
9. [Security](#9-security)
10. [Build & Deployment](#10-build--deployment)
11. [Medical Disclaimer](#11-medical-disclaimer)

---

## 1. Overview

**App Name:** مساعد الوسواس (OCD Helper)
**App ID:** `com.ocdhelper.app`
**Version:** 1.0.0
**Platform:** Android (Google Play ready)
**Target Audience:** Arabic, French, English, and Spanish speaking users affected by OCD

OCD Helper is a science-based psychological support mobile application designed to help individuals with Obsessive-Compulsive Disorder (OCD) self-monitor their symptoms, engage in structured Exposure and Response Prevention (ERP) therapy exercises, and track their progress over time.

> ⚠️ This application is a **self-help support tool** and does **not** replace professional diagnosis or specialized treatment.

---

## 2. Clinical Foundation

The app is built on three scientifically validated frameworks:

### 2.1 Y-BOCS Scale (Yale-Brown Obsessive Compulsive Scale)
- **Source:** Goodman et al., 1989
- **Purpose:** Standardized 10-question scale measuring OCD severity
- **Questions 1–5:** Obsession subscale (time, interference, distress, resistance, control)
- **Questions 6–10:** Compulsion subscale (same dimensions)
- **Scoring:** 0–40 total score
  - 0–7: Subclinical
  - 8–15: Mild
  - 16–23: Moderate
  - 24–31: Severe
  - 32–40: Extreme

### 2.2 ERP Protocol (Exposure and Response Prevention)
- **Source:** Foa & Kozak, 1986; Foa, Yadin & Lichner, 2012
- **Mechanism:** Gradual exposure to feared situations while resisting compulsive behaviors
- **SUDS Scale (0–100):** Subjective Units of Distress Scale — Wolpe, 1969
- **Habituation:** Anxiety naturally decreases without performing compulsions

### 2.3 Cognitive Model — Thought Records
- **Source:** Salkovskis cognitive model, 1985; Beck's CBT principles
- **Purpose:** Track intrusive thoughts, anxiety levels, and compulsive responses
- **Goal:** Identify patterns and reinforce resistance to compulsions

---

## 3. Technical Stack

### Backend
| Component | Technology |
|-----------|-----------|
| Framework | NestJS (Node.js) |
| Language | TypeScript |
| Database | MySQL (cPanel hosted) |
| ORM | TypeORM (`synchronize: true`) |
| Authentication | JWT (JSON Web Tokens) — 7 days expiry |
| Connection | SSH tunnel: local port 5522 → remote MySQL 3306 |
| API Base URL | `http://localhost:3000/api` |

### Frontend (Mobile)
| Component | Technology |
|-----------|-----------|
| Framework | Ionic 7 + Angular 17 |
| UI Mode | Material Design (`md`) |
| Styling | Tailwind CSS 3 |
| Native Runtime | Capacitor 5 |
| Storage | `@capacitor/preferences` (JWT token) |
| HTTP | Angular `HttpClient` with JWT interceptor |

### Android
| Property | Value |
|----------|-------|
| App ID | `com.ocdhelper.app` |
| Min SDK | 24 (Android 7.0) |
| Target SDK | 34 (Android 14) |
| Build Tool | Gradle |

---

## 4. Features & Pages

### 4.1 Authentication

#### Login Page (`/login`)
- Email + password form
- Language selector dropdown (top-right) — English by default
- JWT token stored securely via Capacitor Preferences
- Redirects to Home on success

#### Register Page (`/register`)
- Email + password form
- Language preference selector
- Creates account and logs in automatically
- Minimum password length: 6 characters

---

### 4.2 Home Page (`/tabs/home`)

**Quick Stats Dashboard:**
- Last Y-BOCS assessment score with severity color indicator
- Total ERP sessions count
- Compulsion resistance rate (%)

**Quick Action Cards:**
- Y-BOCS Assessment → `/tabs/assess`
- ERP Session → `/tabs/erp`
- Thought Journal → `/tabs/journal`
- Learn → `/tabs/learn`

**Language Switcher:** Flag buttons in the toolbar (🇸🇦 🇫🇷 🇬🇧 🇪🇸)

---

### 4.3 Y-BOCS Assessment (`/tabs/assess`)

**Form Tab:**
- 10 clinically validated questions (Goodman et al., 1989)
- 5-point Likert scale per question (None → Extreme)
- Progress counter (e.g., "7 / 10 questions answered")
- Sections: Obsessions (Q1–5) and Compulsions (Q6–10)

**Result Display:**
- Total score out of 40
- Separate obsession and compulsion subscores (each out of 20)
- Color-coded severity label
- Clinical note reminding user this is self-monitoring only

**History Tab:**
- List of all previous assessments with date, score, and severity
- Visual trend over time

---

### 4.4 ERP — Fear Ladder (`/tabs/erp`)

Based on the ERP protocol by Foa, Yadin & Lichner (2012).

**Features:**
- Add feared situations with description and SUDS rating (0–100)
- Visual SUDS bar indicator per item (green → orange → red)
- Sort by anxiety level
- Mark items as completed (crossed out)
- Delete items with confirmation dialog
- "Start Session" button → navigates to ERP Session page with pre-filled data

---

### 4.5 ERP — Session (`/tabs/erp/session`)

**Phase 1 — Baseline:**
- User records baseline anxiety level (SUDS slider 0–100)
- Displays situation label passed from Fear Ladder
- "Start Exposure" button

**Phase 2 — Active Exposure:**
- Live timer (minutes:seconds)
- SUDS slider updated in real time
- Habituation bar chart showing anxiety curve over time
- Labels: No anxiety → Extreme anxiety

**Phase 3 — Done:**
- Before/After SUDS comparison
- "Did you resist the compulsion?" yes/no
- Session notes text area
- Save session to database
- Returns to Fear Ladder

---

### 4.6 Thought Journal (`/tabs/journal`)

- Record intrusive thoughts with:
  - Thought description (textarea)
  - Anxiety level (0–10)
  - Compulsion performed (optional)
  - Auto-detect resistance (no compulsion = resisted)
- List view with color-coded anxiety score
- Green badge = compulsion resisted ✓
- Red badge = compulsion performed
- Timestamps (dd/MM HH:mm)

---

### 4.7 Learn (`/tabs/learn`)

Educational psychoeducation accordion content:

| Section | Content |
|---------|---------|
| What is OCD? | Definition, obsessions, compulsions, the OCD cycle |
| What is ERP? | Exposure mechanism, response prevention, habituation |
| Types of OCD | Contamination, harm, symmetry, religious scrupulosity, unwanted thoughts |
| Common Myths | 3 myths with corrections and 2 key facts |

All content is translated in all 4 languages.

---

### 4.8 Grounding / Relaxation (`/tabs/grounding`)

**4-7-8 Breathing Exercise:**
- Animated breathing circle
- Inhale 4s → Hold 7s → Exhale 8s
- Auto-cycles with visual feedback

**5-4-3-2-1 Grounding Exercise:**
- Step-by-step sensory grounding technique
  1. 5 things you can **see**
  2. 4 things you can **touch**
  3. 3 things you can **hear**
  4. 2 things you can **smell**
  5. 1 thing you can **taste**
- Next/Previous navigation

**Urge Surfing (ACT):**
- Acceptance and Commitment Therapy technique
- Guided instructions to observe and ride out urges without acting

---

### 4.9 Settings (`/tabs/settings`)

**Language:**
- Switch between Arabic, French, English, Spanish
- Checkmark on active language
- Saved to device storage (persists across sessions)

**Profile:**
- Change password (current → new → confirm)
- Validates match and minimum length

**Export Data:**
- Export all session data as CSV file

**About:**
- Clinical references (Foa & Kozak 1986, Goodman et al. 1989)
- App version
- Medical disclaimer

**Logout:**
- Confirmation alert before logout
- Clears JWT token from storage

---

## 5. Language Support

The app supports **4 languages** with complete translation coverage:

| Language | Code | Direction | Flag |
|----------|------|-----------|------|
| Arabic | `ar` | RTL (right-to-left) | 🇸🇦 |
| French | `fr` | LTR | 🇫🇷 |
| English | `en` | LTR | 🇬🇧 |
| Spanish | `es` | LTR | 🇪🇸 |

**Default language:** English (on first launch)
**Persistence:** Language preference saved to device storage
**RTL Support:** Full layout direction switching for Arabic (`dir="rtl"`)
**Fonts:** Tajawal (Arabic) + Inter (Latin) via Google Fonts

All translated content includes:
- Navigation tabs
- Auth forms and error messages
- All 10 Y-BOCS questions
- Answer labels (None → Extreme)
- Severity labels
- ERP ladder and session UI
- Thought journal dialogs
- Learn page educational content
- Grounding exercise steps
- Settings, profile, export labels
- Clinical disclaimers

---

## 6. Backend API

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login, returns JWT |
| GET | `/users/me` | Get current user profile |

### Y-BOCS Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ybocs` | Submit new assessment |
| GET | `/ybocs/history` | Get all past assessments |

### Fear Hierarchy Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/fear-hierarchy` | Get all fear items |
| POST | `/fear-hierarchy` | Create new item |
| PATCH | `/fear-hierarchy/:id` | Update item (completed, SUDS) |
| DELETE | `/fear-hierarchy/:id` | Delete item |

### ERP Sessions Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/erp-sessions` | Save completed ERP session |
| GET | `/erp-sessions` | Get all sessions |
| GET | `/erp-sessions/stats` | Get stats (total sessions, resistance rate) |

### Thought Records Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/thought-records` | Create thought record |
| GET | `/thought-records` | Get all thought records |

### Authentication
All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 7. Mobile App Architecture

```
src/app/
├── pages/
│   ├── auth/
│   │   ├── login/          # Login page + language dropdown
│   │   └── register/       # Register page + language dropdown
│   ├── home/               # Dashboard with stats + quick actions
│   ├── assess/             # Y-BOCS 10-question form + history
│   ├── erp/
│   │   ├── ladder/         # Fear hierarchy list
│   │   └── session/        # Live ERP session with timer
│   ├── journal/            # Thought records
│   ├── learn/              # Psychoeducation accordion
│   ├── grounding/          # Breathing + 5-4-3-2-1 + urge surfing
│   └── settings/           # Language, profile, export, logout
├── services/
│   ├── api.ts              # Base HTTP service with JWT
│   ├── auth.ts             # Login/register/logout
│   ├── language.ts         # i18n service (ar/fr/en/es)
│   ├── ybocs.ts            # Y-BOCS API calls
│   ├── fear-hierarchy.ts   # Fear ladder API calls
│   ├── erp-sessions.ts     # ERP session API calls
│   └── thought-records.ts  # Journal API calls
├── guards/
│   └── auth-guard.ts       # Redirect to /login if no token
└── tabs/
    └── tabs-routing.module.ts  # Tab navigation routing
```

---

## 8. Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment |
| email | VARCHAR | Unique |
| password | VARCHAR | Bcrypt hashed |
| language | VARCHAR | Preferred language |
| createdAt | DATETIME | Registration date |

### Y-BOCS Assessments Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment |
| userId | INT (FK) | Reference to user |
| answers | JSON | Array of 10 answers (0–4) |
| obsessionScore | INT | Sum Q1–5 (0–20) |
| compulsionScore | INT | Sum Q6–10 (0–20) |
| totalScore | INT | Total (0–40) |
| severity | VARCHAR | subclinical/mild/moderate/severe/extreme |
| assessedAt | DATETIME | Assessment timestamp |

### Fear Hierarchy Items Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment |
| userId | INT (FK) | Reference to user |
| situation | TEXT | Feared situation description |
| sudsRating | INT | Anxiety level 0–100 |
| completed | BOOLEAN | Whether overcome |
| createdAt | DATETIME | Creation date |

### ERP Sessions Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment |
| userId | INT (FK) | Reference to user |
| fearItemId | INT (FK) | Related fear item |
| baselineSuds | INT | SUDS before exposure |
| peakSuds | INT | Highest SUDS during |
| endSuds | INT | SUDS after exposure |
| durationSeconds | INT | Session duration |
| resistedCompulsion | BOOLEAN | Compulsion resisted? |
| notes | TEXT | Session notes |
| sessionDate | DATETIME | Session timestamp |

### Thought Records Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment |
| userId | INT (FK) | Reference to user |
| intrusiveThought | TEXT | Thought description |
| anxietyLevel | INT | Anxiety 0–10 |
| compulsionPerformed | VARCHAR | Compulsion done (if any) |
| resisted | BOOLEAN | Compulsion resisted? |
| recordedAt | DATETIME | Record timestamp |

---

## 9. Security

| Feature | Implementation |
|---------|---------------|
| Password hashing | bcrypt |
| Authentication | JWT (7-day expiry) |
| Token storage | Capacitor Preferences (native secure storage) |
| Route protection | Angular AuthGuard |
| API authorization | Bearer token on all protected routes |
| HTTPS | Recommended for production deployment |

---

## 10. Build & Deployment

### Development Setup

**Prerequisites:**
- Node.js 18+
- MySQL (or SSH tunnel to cPanel MySQL)
- Android Studio (for APK build)

**Start SSH Tunnel (required for DB):**
```bash
ssh -i ~/Downloads/id_rsa wallnmht@server400.web-hosting.com \
    -p 21098 -L 5522:127.0.0.1:3306 -N \
    -o ServerAliveInterval=30 -o ServerAliveCountMax=6
```

**Start Backend API:**
```bash
cd ocd-api
npm install
npm run start:dev
# Runs on http://localhost:3000/api
```

**Start Ionic Dev Server:**
```bash
cd ocd-app
npm install
ionic serve
# Opens http://localhost:8100
```

**Test on Phone (same WiFi):**
```bash
ionic serve --host 0.0.0.0
# Open http://YOUR_PC_IP:8100 on phone browser
```

### Build Android APK

```bash
cd ocd-app
ionic build
npx cap sync
npx cap open android
# In Android Studio: Build → Build APK(s)
```

**APK Output Path:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Environment Variables (`ocd-api/.env`)
```env
DB_HOST=127.0.0.1
DB_PORT=5522
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
JWT_SECRET=your_jwt_secret
```

---

## 11. Medical Disclaimer

> This application is a **psychological self-help support tool** based on scientifically validated therapeutic methods. It is designed to complement, not replace, professional mental health care.
>
> - This app does **not** provide medical diagnosis
> - This app does **not** replace therapy with a licensed mental health professional
> - In case of crisis or severe symptoms, please contact a qualified doctor or therapist immediately
> - The Y-BOCS assessment in this app is for **self-monitoring only**

### Clinical References

| Reference | Details |
|-----------|---------|
| Y-BOCS | Goodman, W.K., Price, L.H., Rasmussen, S.A., et al. (1989). *The Yale-Brown Obsessive Compulsive Scale*. Archives of General Psychiatry, 46(11), 1006–1011. |
| ERP Protocol | Foa, E.B., & Kozak, M.J. (1986). *Emotional processing of fear: Exposure to corrective information*. Psychological Bulletin, 99(1), 20–35. |
| ERP Manual | Foa, E.B., Yadin, E., & Lichner, T.K. (2012). *Exposure and Response (Ritual) Prevention for Obsessive-Compulsive Disorder*. Oxford University Press. |
| SUDS | Wolpe, J. (1969). *The Practice of Behavior Therapy*. Pergamon Press. |
| Cognitive Model | Salkovskis, P.M. (1985). *Obsessional-compulsive problems: A cognitive-behavioural analysis*. Behaviour Research and Therapy, 23(5), 571–583. |
| CBT | Beck, A.T. (1979). *Cognitive Therapy of Depression*. Guilford Press. |

---

*Documentation generated: March 2026*
*App Version: 1.0.0*
*Developer: Healthcare IT Project*
