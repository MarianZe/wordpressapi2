# Article to Design Automatisierung

Transformiere Artikel automatisch in WordPress-kompatiblen HTML-Code mit Gutenkit-Formatierung.

## Projekt-Status

**Phase 1: Vollständig abgeschlossen ✓**

Die visuelle Benutzeroberfläche mit Mock-Daten ist fertiggestellt. Die Anwendung läuft vollständig im Browser mit statischen Komponenten.

## Features (Phase 1)

- ✅ Responsive Dashboard mit Artikel-Übersicht
- ✅ Upload-Interface für .doc, .docx und .txt Dateien
- ✅ Artikel-Detailansicht mit Original- und HTML-Code-Anzeige
- ✅ Training-Daten-Verwaltung für Referenz-Artikel
- ✅ Dark/Light Mode Toggle
- ✅ Minimalist & Modern SaaS Design System

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Animation:** framer-motion
- **State Management:** Zustand

## Getting Started

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build
npm run build

# Production Server starten
npm start
```

Die Anwendung läuft standardmäßig auf [http://localhost:3000](http://localhost:3000).

## Projektstruktur

```
src/
├── app/                    # Next.js App Router Pages
│   ├── page.tsx           # Dashboard
│   ├── upload/            # Upload-Seite
│   ├── article/[id]/      # Artikel-Detailansicht
│   └── training/          # Trainings-Daten-Verwaltung
├── components/            # React Komponenten
│   ├── Layout.tsx         # Hauptlayout mit Sidebar
│   ├── Button.tsx         # Button-Komponente
│   ├── Card.tsx           # Card-Komponente
│   ├── UploadZone.tsx     # Drag & Drop Upload
│   ├── ArticlePreview.tsx # Original-Artikel-Anzeige
│   ├── HtmlOutput.tsx     # HTML-Code-Anzeige
│   └── ...
└── lib/
    ├── mock-data.ts       # Mock-Daten für Phase 1
    ├── store.ts           # Zustand State Management
    └── utils.ts           # Utility-Funktionen
```

## Design System

Das Projekt verwendet ein "Minimalist & Modern SaaS" Design mit:

- **Neutrals:** Graustufige Hintergründe und Texte
- **Accent:** Lila für primäre Aktionen
- **Semantic Colors:** Grün (Erfolg), Gelb (Warnung), Rot (Fehler)
- **Typography:** Inter Font mit fluidem Type Scale
- **Accessibility:** WCAG AA konform, vollständige Keyboard-Navigation

## Nächste Schritte

**Phase 2:** Backend-Integration
- PostgreSQL Datenbankschema
- API Endpoints für CRUD-Operationen
- Dokument-Parsing (.docx, .txt)
- Markdown-to-HTML Konvertierung
- AI-basierte Mustererkennung (OpenAI/Claude)
- Gutenkit-Block-Generator

**Phase 3:** Authentifizierung
- User Sign Up/Login
- Route Protection
- User-spezifische Daten

**Phase 4:** Export & API
- DOCX/TXT Export-Funktionalität
- API-Dokumentation
- Rate Limiting
