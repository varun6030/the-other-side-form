# THE OTHER SIDE — Pre-Show Form

> Sabka ek Other Side hota hai. This form isn't information. It's evidence.

The official pre-show interrogation form for **The Other Side Show**. Guests fill it before recording; the host pulls their answers live from The Box.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- TailwindCSS (custom show tokens) · Framer Motion
- shadcn-style component conventions (cva/clsx/tailwind-merge)
- canvas-confetti (report page, one burst, sparing)

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

```
src/
├── app/
│   ├── page.tsx            # Landing — spotlight, particles, BEGIN
│   ├── form/page.tsx       # Flow: section doors → questions → fake scans
│   ├── report/page.tsx     # THE OTHER SIDE REPORT (classified)
│   ├── layout.tsx          # Fonts (Anton / Space Grotesk / IBM Plex Mono)
│   └── globals.css         # Grain, scanline, glitch, stamp, sliders
├── components/
│   ├── Header.tsx          # Logo, Q counter, %, SAVED AUTOMATICALLY
│   ├── Reactions.tsx       # Random funny toasts + red LOGGED stamp
│   ├── FakeLoading.tsx     # "Analyzing Delusion Level…" interstitials
│   ├── Spotlight / Particles / RedLines / GlitchText / NoiseCard
│   └── questions/          # One reusable component per question type
│       ├── QuestionRenderer.tsx
│       ├── TextQ · TextareaQ · FillQ · ChoiceQ · ThisOrThatQ
│       ├── YesNoQ · SliderQ · EmojiQ · StarsQ · RankQ
│       └── shared.tsx      # PromptBlock (EXHIBIT ###) + CommitButton
└── lib/
    ├── questions.ts        # SECTIONS + QUESTIONS — edit content here
    ├── store.tsx           # Answers + debounced localStorage autosave
    ├── toasts.ts           # Reaction lines + fake loading screens
    ├── report.ts           # Playful scoring → THE OTHER SIDE REPORT
    └── utils.ts            # cn(), pick()
```

## Editing content

Everything editorial lives in `src/lib`:

- **Add/rewrite questions** → `questions.ts` (10 question types supported). Mark `dangerous: true` and the report will consider it for MOST DANGEROUS ANSWER.
- **Add toast lines / fake scans** → `toasts.ts`
- **Tune the comedy scoring** → `report.ts`

## Design tokens

| Token | Value | Role |
|---|---|---|
| `ink` | #0A0A0A | stage black |
| `bone` | #F2EEE6 | logo's distressed white |
| `blood` | #E53935 | the accent |
| `panel` / `line` | #121212 / #232323 | surfaces / hairlines |

Type: **Anton** (display, all-caps, logo energy) · **Space Grotesk** (body) · **IBM Plex Mono** (evidence labels).

Signature: the **evidence-dossier framing** — EXHIBIT numbers, corner-ticked file cards, the LOGGED stamp, section "rooms," and a CLASSIFIED report.

## Notes

- Autosave: debounced to localStorage (`the-other-side-form-v1`). "SAVED AUTOMATICALLY" flashes in the header.
- Voice recording & GIF selection were intentionally left as future question types — add a new `QuestionType` and a component, then register it in `QuestionRenderer.tsx`.
- Reduced motion and keyboard focus are respected.
