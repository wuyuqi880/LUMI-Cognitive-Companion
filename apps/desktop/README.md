# LUMI Desktop Prototype

Windows desktop application for the LUMI Cognitive Companion project.

## Current implementation

- Electron + React + TypeScript, built using electron-vite.
- Companion Panel with Chat, Tasks, Reasoning, and Style sections.
- Interactive 2D rabbit-eared robot character with six expression states.
- Five theme colours (Sage, Lavender, Sky Blue, Blush Pink, Soft Peach), saved locally.
- Desktop Pet UI and Electron window-mode switching. Native frameless/floating behaviour is under testing.
- Prototype chat responses and an in-memory task list.

> Development status (24 November 2026): The task list is currently in memory. SQLite persistence, NLP, cognitive reasoning, scheduled reminders, and ESP32 integration are **not yet connected**.

## Run locally

Requires Node.js and npm.

```powershell
cd apps/desktop
npm ci
npm run dev
```

## Check the project

```powershell
npm run typecheck
npm run lint
npm run build
```

The project is being developed as part of SCSE3103 Cognitive Computing at Universiti Teknologi Malaysia.
