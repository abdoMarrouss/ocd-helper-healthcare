# OCD Helper | مساعد الوسواس

A science-based OCD self-help mobile app published on Google Play, built with Ionic + Angular and a NestJS backend.

[![Google Play](https://img.shields.io/badge/Google_Play-Published-green?logo=google-play)](https://play.google.com/store/apps/details?id=com.walliupp.healthcare.ocdhelper)

---

## Overview

OCD Helper supports people living with Obsessive-Compulsive Disorder using clinically proven techniques:

- **Y-BOCS Assessment** — Yale-Brown Obsessive Compulsive Scale (Goodman et al. 1989)
- **ERP Therapy Sessions** — Exposure and Response Prevention (Foa, Yadin & Lichner 2012)
- **Fear Hierarchy** — SUDS-based ladder (Wolpe 1969)
- **Thought Journal** — Based on Salkovskis cognitive model (1985)
- **Grounding & Relaxation** — 4-7-8 breathing, 5-4-3-2-1 grounding, urge surfing
- **Progress Dashboard** — Y-BOCS score chart over time

Multilingual: Arabic 🇸🇦 · English 🇬🇧 · French 🇫🇷 · Spanish 🇪🇸

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | Ionic 7 + Angular 17 + Capacitor |
| Styling | Tailwind CSS 3 |
| Charts | ng-apexcharts |
| Backend API | NestJS + TypeORM |
| Database | MySQL |
| Auth | JWT (access token stored with Capacitor Preferences) |
| Deployment | Google Play (Android) |

---

## Project Structure

```
healthcare-IT/
├── ocd-app/        # Ionic + Angular mobile app
│   ├── src/
│   │   ├── app/pages/       # Home, Assess, ERP, Journal, Learn, Grounding
│   │   ├── app/services/    # API, Auth, Y-BOCS, ERP, Language
│   │   └── app/guards/      # Auth guard, Auto-login guard
│   └── android/             # Android native project (Capacitor)
│
└── ocd-api/        # NestJS REST API
    └── src/
        ├── auth/            # JWT auth (login, register)
        ├── ybocs/           # Y-BOCS assessments
        ├── erp-sessions/    # ERP session tracking
        ├── fear-hierarchy/  # Fear ladder items
        ├── thought-records/ # Thought journal
        └── users/           # User management
```

---

## Getting Started

### API Setup

```bash
cd ocd-api
npm install
cp .env.example .env   # fill in your DB credentials
npm run start:dev
```

### App Setup

```bash
cd ocd-app
npm install
ionic serve             # browser dev
ionic build && npx cap sync android   # Android build
```

### Environment Variables (API)

See `ocd-api/.env.example` for required variables:
- `DB_*` — MySQL connection
- `JWT_SECRET` — change this in production
- `PORT` — default 3001

---

## Clinical References

- Y-BOCS: Goodman et al. (1989)
- ERP Protocol: Foa, Yadin & Lichner (2012)
- SUDS Scale: Wolpe (1969)
- Cognitive Model: Salkovskis (1985)

---

## Disclaimer

This app is a self-help support tool only. It does not replace professional medical diagnosis or treatment.
