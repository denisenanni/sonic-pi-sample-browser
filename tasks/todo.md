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

---

## Task 04 — Console UI

### Plan

- [x] 1. Update `useAudioPlayer.ts` — add `playOnLoad()` for click-to-new-sample autoplay, rate/amp refs for onload closure
- [x] 2. Replace `src/index.css` with dark console theme (color vars, layout, topbar, sidebar, grid, bottom panel)
- [x] 3. Create `src/components/Topbar.tsx`
- [x] 4. Create `src/components/Sidebar.tsx`
- [x] 5. Create `src/components/SampleGrid.tsx` (replaces SampleCard)
- [x] 6. Create `src/components/BottomPanel.tsx`
- [x] 7. Rewrite `App.tsx` — AppState, single useAudioPlayer, keyboard shortcuts, composition
- [x] 8. Delete `src/components/SampleCard.tsx`
- [x] 9. Verify build + smoke test

---

## Review — Task 04

**Files modified/created:**

- `src/hooks/useAudioPlayer.ts` — added `playOnLoad()` which sets `pendingPlayRef`; `onload` callback checks the flag and auto-plays with current rate/amp (read from always-current refs). This solves the async gap between selecting a new sample and its buffer loading.
- `src/index.css` — full dark console theme: CSS custom properties for all colors, layout for app shell, topbar, sidebar, grid, cells, and bottom panel.
- `src/components/Topbar.tsx` — title, Samples/Synths tabs (Synths disabled), search input.
- `src/components/Sidebar.tsx` — category list driven by `SAMPLE_GROUPS`, active highlight.
- `src/components/SampleGrid.tsx` — auto-fill CSS grid of sample cells; selected/playing states via class names.
- `src/components/BottomPanel.tsx` — rate/amp sliders, keyboard shortcut hints, live code snippet, copy button.
- `src/App.tsx` — `AppState` (tab, category, sample, rate, amp, search), single `useAudioPlayer` at app level, `filteredSamples` memo, `document`-level keyboard handler (Space/arrows/C), all composed together.
- `src/components/SampleCard.tsx` — deleted.

**Build:** `yarn build` passes with no TypeScript errors.

---

## Task 05 — Scales Tab

### Plan

- [x] 1. Create `src/data/scales.ts` — Scale type + all ~130 scales with rounded semitone steps
- [x] 2. Create `src/hooks/useScalePlayer.ts` — Synth-based scale playback (setTimeout sequencing, stop/cleanup)
- [x] 3. Update `src/components/Topbar.tsx` — add Scales tab (3 tabs: Samples, Scales, Synths)
- [x] 4. Create `src/components/ScalesTab.tsx` — root note/octave pills + scales grid
- [x] 5. Update `src/components/BottomPanel.tsx` — accept `snippet`/`hasSelection` props; hide Rate on Scales tab
- [x] 6. Update `src/App.tsx` — expand AppState, wire useScalePlayer, keyboard handler, conditional rendering

---

## Review — Task 05

**Files created/modified:**

- `src/data/scales.ts` — `Scale` interface + 130 entries. Western scales use exact integer steps from the source; Turkish makam scales have koma-based intervals rounded to nearest semitone (tanini→2, bakiyye→1, kucuk_mucenneb→1, buyuk_mucenneb→2, artik_ikili→3).
- `src/hooks/useScalePlayer.ts` — creates one `Tone.Synth` on mount (triangle wave, piano-like envelope), kept for the session. `play()` cancels pending timeouts, builds the note array from steps+root+octave, then fires one `setTimeout` per note at 200ms intervals. `stop()` clears all timeouts and calls `triggerRelease()`.
- `src/components/Topbar.tsx` — expanded to `'samples' | 'scales' | 'synths'` ActiveTab type; Scales tab is now enabled.
- `src/components/ScalesTab.tsx` — root note pills (12 notes), octave pills (3,4,5), same CSS grid as samples, each cell shows `:scale_name` + note count.
- `src/components/BottomPanel.tsx` — refactored to accept `snippet`/`hasSelection`/`showRate` props; Rate slider hidden on Scales tab.
- `src/App.tsx` — `AppState` expanded with scales fields; `useScalePlayer` called at app level; keyboard handler branches on `activeTab`; Sidebar hidden on Scales tab; `filteredScales` memo for search.
- `src/index.css` — added `.scales-controls`, `.pill`, `.sample-name-col`, `.scale-note-count` styles.

**Build:** `yarn build` passes with no TypeScript errors.

---

## Task 06 — Chords Tab

### Plan

- [x] 1. Create `src/data/chords.ts` — `Chord` type + all chords parsed from Sonic Pi source (including aliases)
- [x] 2. Create `src/hooks/useChordPlayer.ts` — PolySynth (block) + Synth (arpeggio), play/stop/isPlaying, cleanup
- [x] 3. Update `src/types.ts` — add `'chords'` to `ActiveTab`
- [x] 4. Update `src/components/Topbar.tsx` — add Chords tab between Samples and Scales
- [x] 5. Create `src/components/ChordsTab.tsx` — root/octave/numOctaves/mode controls + chord grid
- [x] 6. Update `src/App.tsx` — expand `AppState`, wire `useChordPlayer`, keyboard shortcuts, conditional rendering

### Review

**Files created/modified:**

- `src/data/chords.ts` — `Chord` type + 69 entries covering every chord name and alias from Sonic Pi's `chord.rb` (including string-keyed entries like `"7"`, `"+5"`, `"m7b5"` and symbol aliases like `maj`/`M`/`major`).
- `src/hooks/useChordPlayer.ts` — creates one `PolySynth` and one `Synth` on mount. Block mode calls `poly.triggerAttack(notes)` on all notes simultaneously, then `releaseAll()` after 1500ms. Arpeggio mode fires one `setTimeout` per note at 120ms intervals. `stop()` clears all timeouts and releases both synths. `playOnLoad()` queues play until `chordName` changes. `useLatestRef` used for all mutable values. No `any`.
- `src/types.ts` — `ActiveTab` now includes `'chords'`.
- `src/components/Topbar.tsx` — Chords tab button added between Samples and Scales.
- `src/components/ChordsTab.tsx` — root note pills, octave pills (3/4/5), num octaves pills (1/2/3), Block/Arpeggio mode pills, chord grid. Reuses all existing CSS classes (`.scales-controls`, `.pill`, `.sample-cell`, etc.). No new styles needed.
- `src/App.tsx` — `AppState` expanded with 6 chord fields; `useChordPlayer` wired; `filteredChords` memo; `handleChordClick` and 4 chord control handlers added; keyboard handler extended for chords tab; `handleSearchChange`, `handleAmpChange`, `handleCopy` updated for 3-tab branching; JSX updated with ternary for three content areas.

**Build:** `yarn build` passes with no TypeScript errors.
