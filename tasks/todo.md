# Sonic Pi Sample Browser — Task Registry

---

## Task 01 — Project Setup & Sample Data

### Plan

- [x] 1. Scaffold Vite + React + TypeScript project with yarn inside `/sonic-browser`
- [x] 2. Set `base: '/sonic-pi-sample-browser/'` in `vite.config.ts` for GitHub Pages
- [x] 3. Install Tone.js (check for any equivalent audio library first — none found)
- [x] 4. Create `src/data/samples.ts` with all sample categories and names typed correctly (no `any`)
- [x] 5. Create `public/samples/README.txt` explaining where to place WAV files
- [x] 6. Create `.github/workflows/deploy.yml` for GitHub Pages deployment on push to `main`
- [x] 7. Clean up Vite boilerplate (remove default CSS, assets, placeholder content); leave `App.tsx` rendering `<h1>Sonic Pi Sample Browser</h1>`

---

## Review — Task 01

**Files created/modified:**

- `vite.config.ts` — added `base: '/sonic-pi-sample-browser/'` so asset paths resolve correctly under the GitHub Pages subdirectory.
- `package.json` — renamed package to `sonic-pi-sample-browser`, Tone.js added as a dependency.
- `src/data/samples.ts` — defines `SampleCategory` (union type), `Sample` (name + category), `SampleGroup` (category + samples array), plus `SAMPLE_GROUPS` (165 samples across 14 categories) and a flat `ALL_SAMPLES` export. No `any`.
- `public/samples/README.txt` — instructions for copying WAV files from the local Sonic Pi install.
- `.github/workflows/deploy.yml` — builds with `yarn` and publishes `./dist` to GitHub Pages via `peaceiris/actions-gh-pages@v4`.
- `src/App.tsx` — stripped to a single `<h1>` placeholder.
- `src/index.css` — replaced boilerplate with a minimal box-sizing reset.
- `src/App.css`, `src/assets/` — deleted (boilerplate).

**Build:** `yarn build` passes with no TypeScript errors.

---

## Task 02 — Core Playback & SampleCard Component

### Plan

- [x] 1. Create `src/hooks/useAudioPlayer.ts` — Tone.js playback hook (play, stop, isPlaying, error, cleanup)
- [x] 2. Create `src/components/SampleCard.tsx` — card with rate/amp sliders, play/stop toggle, code snippet + copy button, error display
- [x] 3. Update `App.tsx` — render 5 hardcoded `SampleCard` instances for end-to-end testing

---

## Review — Task 02

**Files created/modified:**

- `src/hooks/useAudioPlayer.ts` — `useEffect` creates a `Tone.Player` on every `sampleName` change and disposes it on cleanup. `onerror` catches missing WAV files and sets a string error. `play()` calls `toneStart()` to resume AudioContext (required after a user gesture), applies `playbackRate` and `volume` (converted from linear amp via `gainToDb`), then starts playback. `onstop` callback syncs `isPlaying` back to false when the buffer ends naturally. No `any`.
- `src/components/SampleCard.tsx` — owns `rate`/`amp` state, delegates all audio logic to `useAudioPlayer`. Renders name, play/stop button, two range sliders with live value display, Sonic Pi code snippet, copy button, and conditional error message.
- `src/App.tsx` — renders 5 test `SampleCard`s (`bd_haus`, `ambi_choir`, `loop_amen`, `elec_ping`, `perc_bell`).

**Build:** `yarn build` passes with no TypeScript errors.

---

## Task 03 — Fix Audio Playback & Reconcile Sample Data

### Plan

- [x] 1. Fix `.wav` → `.flac` in `useAudioPlayer.ts`
- [x] 2. Update `SampleCategory` union — add `arovane`, `hat`, `ride`, `tbd`
- [x] 3. Fix all renamed entries (glitch, loop, mehackit, perc — drop underscores before numbers)
- [x] 4. Add missing `bd_chip`, `bd_jazz` to the `bd` group
- [x] 5. Add new groups: `arovane` (5), `hat` (21), `ride` (2), `tbd` (11)
- [x] 6. Verify build passes

---

## Review — Task 03

**Files modified:**

- `src/hooks/useAudioPlayer.ts` — changed `.wav` to `.flac` in the URL construction.
- `src/data/samples.ts` — corrected 18 renamed entries (underscore-before-number removed in glitch/loop/mehackit/perc); added `bd_chip` and `bd_jazz`; added 4 new categories (`arovane`, `hat`, `ride`, `tbd`) totalling 39 new samples. Total is now 196 samples across 18 categories. Every name matches an actual file in `public/samples/`.

**Build:** `yarn build` passes with no TypeScript errors.
