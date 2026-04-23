# PantiChat 0.3

PantiChat ist eine minimalistische, mystische und elegante Chat‑App, inspiriert von Discord und optimiert für Firestore.  
Version 0.3 enthält:

- Username‑Overlay (lokal gespeichert)
- Firestore‑Realtime‑Chat
- Channel‑Wechsel (general / dev)
- Mystisches Dark‑UI im PantiCloud‑Stil
- Saubere, modulare Code‑Struktur

---

## 🚀 Features

### 🔮 Username‑Overlay
Beim ersten Start wird der Benutzer nach seinem Namen gefragt.  
Dieser wird in `localStorage` gespeichert und automatisch für alle Nachrichten verwendet.

### 💬 Realtime‑Chat
Nachrichten werden in Firestore gespeichert und in Echtzeit angezeigt.

### 📁 Channels
Zwei Räume sind integriert:

- `# Allgemein`
- `# Entwicklung`

Weitere Räume können leicht ergänzt werden.

### 🎨 UI / UX
- Weiche Schatten
- Mystische Farben
- Blur‑Overlay
- Feminine, elegante Dark‑Fantasy‑Ästhetik

---

## 📦 Projektstruktur

PANTICHAT/
│
├── index.html
├── style.css
├── firebase.js
├── app.js
└── assets/ (optional)


---

## 🔧 Installation

1. Projektordner öffnen
2. `index.html` im Browser starten  
   (empfohlen: VS Code → „Open with Live Server“)

---

## 🔥 Firestore‑Struktur

Wird automatisch erzeugt:

rooms
└── general
└── messages
└── dev
└── messages


Jede Nachricht enthält:

```json
{
  "user": "Name",
  "text": "Nachricht",
  "time": 1710000000000
}

🛠️ Technologien
HTML / CSS / JavaScript

Firebase Firestore

ES Modules

📜 Lizenz
Dieses Projekt ist Teil des PantiCloud‑Ökosystems.
Alle Rechte vorbehalten.


---

Wenn du bereit bist für **Datei 6/6**, sag einfach:

**Weiter**

<h1>PantiChat</h1>