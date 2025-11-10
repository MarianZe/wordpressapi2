# Article to Design Automatisierung

Transformiere Artikel automatisch in WordPress-kompatiblen HTML-Code mit Gutenkit-Formatierung.

## Projekt-Status

**Phase 1: Vollständig abgeschlossen ✓**
Die visuelle Benutzeroberfläche mit Mock-Daten ist fertiggestellt.

**Phase 2: Vollständig abgeschlossen ✓**
Document Processing und regel-basierte Mustererkennung sind implementiert.

## Features

### UI & Design (Phase 1)
- ✅ Responsive Dashboard mit Artikel-Übersicht
- ✅ Upload-Interface für .doc, .docx und .txt Dateien
- ✅ Artikel-Detailansicht mit Original- und HTML-Code-Anzeige
- ✅ Training-Daten-Verwaltung für Referenz-Artikel
- ✅ Dark/Light Mode Toggle
- ✅ Minimalist & Modern SaaS Design System

### Processing Engine (Phase 2)
- ✅ Dokument-Parsing (.docx, .txt)
- ✅ Markdown-to-HTML Konvertierung
- ✅ **Regel-basierte Mustererkennung** mit Trigger-Wörtern
- ✅ **Gutenkit-Block-Generator** mit allen Templates:
  - Praxistipp-Box (grün)
  - Wusstest-Du-schon-Box (blau)
  - Fun-Fact-Box (orange)
  - Prompt-Box (neue HTML-Version)
  - FAQ-Komponente
  - Autorenbox
- ✅ Vollständige Processing-Pipeline

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Animation:** framer-motion
- **State Management:** Zustand
- **Document Processing:** mammoth (DOCX), marked (Markdown)

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

# Test der Processing-Pipeline
npx tsx src/lib/test-processor.ts
```

Die Anwendung läuft standardmäßig auf [http://localhost:3000](http://localhost:3000).

**Hinweis:** Es werden keine API-Keys oder Umgebungsvariablen benötigt. Die Anwendung nutzt regel-basierte Mustererkennung.

## Projektstruktur

```
src/
├── app/                        # Next.js App Router Pages
│   ├── page.tsx               # Dashboard
│   ├── upload/                # Upload-Seite
│   ├── article/[id]/          # Artikel-Detailansicht
│   └── training/              # Trainings-Daten-Verwaltung
├── components/                # React Komponenten
│   ├── Layout.tsx             # Hauptlayout mit Sidebar
│   ├── Button.tsx             # Button-Komponente
│   ├── Card.tsx               # Card-Komponente
│   ├── UploadZone.tsx         # Drag & Drop Upload
│   ├── ArticlePreview.tsx     # Original-Artikel-Anzeige
│   ├── HtmlOutput.tsx         # HTML-Code-Anzeige
│   └── ...
└── lib/
    ├── article-processor.ts   # Haupt-Processing-Pipeline
    ├── document-parser.ts     # DOCX/TXT Parsing
    ├── markdown-converter.ts  # Markdown-to-HTML
    ├── ai-pattern-recognition.ts  # Regel-basierte Mustererkennung
    ├── gutenkit-generator.ts  # Gutenkit-Block-Generator
    ├── mock-data.ts           # Mock-Daten
    ├── store.ts               # Zustand State Management
    ├── test-processor.ts      # Test-Script
    └── utils.ts               # Utility-Funktionen
```

## Design System

Das Projekt verwendet ein "Minimalist & Modern SaaS" Design mit:

- **Neutrals:** Graustufige Hintergründe und Texte
- **Accent:** Lila für primäre Aktionen
- **Semantic Colors:** Grün (Erfolg), Gelb (Warnung), Rot (Fehler)
- **Typography:** Inter Font mit fluidem Type Scale
- **Accessibility:** WCAG AA konform, vollständige Keyboard-Navigation

## Processing Pipeline

Die Article-to-Design-Automatisierung verwendet eine mehrstufige Pipeline:

1. **Dokument-Parsing**: Extrahiert Text aus .docx/.txt Dateien
2. **Text-Normalisierung**: Bereinigt und standardisiert den Text
3. **Pattern Recognition**: Erkennt semantische Muster (Praxistipp, Fun-Fact, etc.)
   - Regel-basierte Erkennung mit Trigger-Wörtern
   - Kein API-Key erforderlich
4. **HTML-Generierung**: Konvertiert Text in WordPress Gutenberg Blöcke
5. **Gutenkit-Block-Injection**: Fügt Design-Boxen an erkannten Positionen ein
6. **Autorenbox**: Wird automatisch am Ende hinzugefügt (WordPress Block-Referenz)

### Unterstützte Muster

| Muster | Trigger-Wörter | Farbe |
|--------|---------------|-------|
| Praxistipp | `Praxistipp`, `Macher-Tipp`, `Tipp:` | Grün (#e4f2e1) |
| Wusstest Du schon? | `Wusstest du schon?`, `Infobox` | Blau (#dfe7f2) |
| Fun-Fact | `Fun-Fact`, `Fun Fact` | Orange (#ffd191) |
| Prompt | `Prompt:`, `ChatGPT-Prompt` | Dunkelgrau (#333333) |
| FAQ | `FAQ`, `Häufig gestellte Fragen` | Standard |

## Nächste Schritte

**Phase 3:** Authentifizierung & Backend
- PostgreSQL Datenbankschema
- API Endpoints für CRUD-Operationen
- User Sign Up/Login
- Route Protection
- User-spezifische Daten

**Phase 4:** Export & API Finalisierung
- DOCX/TXT Export-Funktionalität
- API-Dokumentation
- Rate Limiting & API-Keys
