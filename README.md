# Sonic Pi Sample Browser

An interactive browser for [Sonic Pi](https://sonic-pi.net/) built with React, TypeScript, and Tone.js. It lets you audition samples, chords, scales, and FX in the browser and generates ready-to-paste Sonic Pi code snippets.

---

## Tabs

### Samples
Browse all built-in Sonic Pi samples organised by category (bd, sn, ambi, loop, etc.). Click a cell to play the sample. Adjust **Rate** and **Amp** with sliders. The live code snippet at the bottom reflects your settings.

### Chords
Explore every Sonic Pi chord. Pick a root note, octave, and number of octaves. Play chords as a **block** (all notes at once) or **arpeggio** (one note at a time). The snippet shows the `chord` call.

### Scales
Browse all ~130 Sonic Pi scales. Pick a root note and octave and hear the scale played ascending. The snippet shows the `scale` call.

### FX
Pick a sample from the dropdown, select an FX from the grid, and hear the sample played looped through that effect. Adjust **Mix**, **Amp**, and any per-FX parameters (room size, cutoff, bits, pitch, etc.) in real time without restarting playback. Switching FX hot-swaps the effect node. The live snippet generates the corresponding `with_fx` block including only non-default parameter values.

---

## Architecture

```
src/
├── data/
│   ├── samples.ts      — all 196 sample names grouped by category
│   ├── chords.ts       — 69 chord definitions (names + intervals)
│   ├── scales.ts       — ~130 scale definitions (names + semitone steps)
│   └── fx.ts           — 34 FX definitions (params, min/max/step/default) + preview sample list
├── hooks/
│   ├── useAudioPlayer.ts   — Tone.Player playback for samples (rate, amp, loop)
│   ├── useChordPlayer.ts   — PolySynth (block) + Synth (arpeggio) chord playback
│   ├── useScalePlayer.ts   — Synth-based scale sequencing via setTimeout
│   └── useFxPlayer.ts      — Looped Tone.Player through a Tone.js FX chain; hot-swaps effect on FX change
├── components/
│   ├── Topbar.tsx       — tab bar + search input
│   ├── Sidebar.tsx      — sample category list (Samples tab only)
│   ├── SampleGrid.tsx   — grid of sample cells
│   ├── ChordsTab.tsx    — root/octave/mode controls + chord grid
│   ├── ScalesTab.tsx    — root/octave controls + scale grid
│   ├── FxTab.tsx        — sample dropdown, FX grid, per-FX sliders, snippet
│   └── BottomPanel.tsx  — rate/amp sliders, keyboard hints, snippet + copy (Samples/Chords/Scales tabs)
├── types.ts             — ActiveTab union type
└── App.tsx              — global state, all players, keyboard shortcuts, composition
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / stop |
| `← → ↑ ↓` | Navigate between items in the grid |
| `C` | Copy current snippet to clipboard |

Shortcuts work on all four tabs.

---

## Audio

- Uses **Tone.js** (v15) for all audio — no native Web Audio API calls directly.
- Samples are loaded from `public/samples/` as `.flac` files (copied from your local Sonic Pi install).
- FX are approximated using Tone.js equivalents (e.g. `Tone.Freeverb` for `:reverb`, `Tone.FeedbackDelay` for `:echo`, `Tone.Filter` for all filter types). The sonic character is close but not identical to Sonic Pi's SuperCollider backend.

---

## Adding Samples

Copy the FLAC files from your Sonic Pi installation into `public/samples/`:

**macOS:**
```
/Applications/Sonic Pi.app/Contents/Resources/samples/
```

**Linux:**
```
/usr/lib/sonic-pi/samples/
```

---

## Attributions & Licensing

### This project

The source code of this browser is MIT licensed.

### Sonic Pi

The chord names, scale names, scale intervals, FX parameter definitions, and all Sonic Pi syntax used for code snippet generation are derived from the [Sonic Pi](https://sonic-pi.net/) documentation and source code, © Sam Aaron, released under the [MIT License](https://github.com/sonic-pi-net/sonic-pi/blob/dev/LICENSE.md).

### Sample audio files

The sample files are **not included** in this repository. They must be copied from a local Sonic Pi installation (see *Adding Samples* above).

All built-in Sonic Pi samples are released under the **Creative Commons 0 (CC0) "No Rights Reserved" license** — they are effectively public domain. Full attribution for each sample (original freesound.org links, artist credits) is documented in [`public/samples/README.md`](public/samples/README.md), which is itself copied from the Sonic Pi project.

Notable credits:
- `arovane_beat_*` — donated by Uwe Zahn (Arovane) under CC0
- `tbd_*` — donated by The Black Dog under CC0
- All other samples — sourced from [freesound.org](https://freesound.org) under CC0

---

## Development Setup

### Prerequisites
- Node.js 18+
- Yarn

### Install & run

```bash
yarn install
yarn dev
```

### Build

```bash
yarn build
```

### Deploy

The app deploys automatically to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`. Set the base path in `vite.config.ts` if your Pages URL differs.
