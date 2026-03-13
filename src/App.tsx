import { useState, useMemo, useEffect, useCallback } from 'react'
import { SAMPLE_GROUPS, ALL_SAMPLES } from './data/samples'
import type { SampleCategory, Sample } from './data/samples'
import { SCALES } from './data/scales'
import type { Scale } from './data/scales'
import type { ActiveTab } from './types'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { useScalePlayer } from './hooks/useScalePlayer'
import { useChordPlayer } from './hooks/useChordPlayer'
import type { ChordMode } from './hooks/useChordPlayer'
import { CHORDS } from './data/chords'
import type { Chord } from './data/chords'
import { Topbar } from './components/Topbar'
import { Sidebar } from './components/Sidebar'
import { SampleGrid } from './components/SampleGrid'
import { ScalesTab } from './components/ScalesTab'
import { ChordsTab } from './components/ChordsTab'
import { BottomPanel } from './components/BottomPanel'

interface AppState {
  activeTab: ActiveTab
  // Samples tab
  selectedCategory: SampleCategory
  selectedSample: string | null
  rate: number
  amp: number
  search: string
  // Chords tab
  selectedChord: string | null
  chordAmp: number
  chordRootNote: string
  chordOctave: number
  chordNumOctaves: number
  chordMode: ChordMode
  chordsSearch: string
  // Scales tab
  selectedScale: string | null
  scaleAmp: number
  scaleRootNote: string
  scaleOctave: number
  scalesSearch: string
}

const INITIAL_STATE: AppState = {
  activeTab: 'samples',
  selectedCategory: 'bd',
  selectedSample: null,
  rate: 1.0,
  amp: 1.0,
  search: '',
  selectedChord: null,
  chordAmp: 1.0,
  chordRootNote: 'C',
  chordOctave: 4,
  chordNumOctaves: 1,
  chordMode: 'block',
  chordsSearch: '',
  selectedScale: null,
  scaleAmp: 1.0,
  scaleRootNote: 'C',
  scaleOctave: 4,
  scalesSearch: '',
}

const GRID_COL_ESTIMATE = 6

function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE)

  // ── Samples player ──────────────────────────────────────
  const { play: samplePlay, playOnLoad, stop: sampleStop, isPlaying: samplePlaying } =
    useAudioPlayer(state.selectedSample ?? '', state.rate, state.amp)

  // ── Scales player ───────────────────────────────────────
  const selectedScaleSteps = useMemo<number[]>(() => {
    return SCALES.find((s) => s.name === state.selectedScale)?.steps ?? []
  }, [state.selectedScale])

  const { play: scalePlay, playOnLoad: scalePlayOnLoad, stop: scaleStop, isPlaying: scalePlaying } =
    useScalePlayer(selectedScaleSteps, state.scaleRootNote, state.scaleOctave, state.scaleAmp)

  // ── Chords player ────────────────────────────────────────
  const { play: chordPlay, playOnLoad: chordPlayOnLoad, stop: chordStop, isPlaying: chordPlaying } =
    useChordPlayer(
      state.selectedChord ?? '',
      state.chordRootNote,
      state.chordOctave,
      state.chordNumOctaves,
      state.chordMode,
      state.chordAmp,
    )

  // ── Derived data ────────────────────────────────────────
  const filteredSamples = useMemo<Sample[]>(() => {
    const q = state.search.trim().toLowerCase()
    if (q) return ALL_SAMPLES.filter((s) => s.name.includes(q))
    return SAMPLE_GROUPS.find((g) => g.category === state.selectedCategory)?.samples ?? []
  }, [state.search, state.selectedCategory])

  const filteredScales = useMemo<Scale[]>(() => {
    const q = state.scalesSearch.trim().toLowerCase()
    if (q) return SCALES.filter((s) => s.name.includes(q))
    return SCALES
  }, [state.scalesSearch])

  const filteredChords = useMemo<Chord[]>(() => {
    const q = state.chordsSearch.trim().toLowerCase()
    if (q) return CHORDS.filter((c) => c.name.includes(q))
    return CHORDS
  }, [state.chordsSearch])

  // ── Snippets ────────────────────────────────────────────
  const samplesSnippet = state.selectedSample
    ? `sample :${state.selectedSample}, rate: ${state.rate.toFixed(2)}, amp: ${state.amp.toFixed(2)}`
    : 'no sample selected'

  const scalesSnippet = state.selectedScale
    ? `scale :${state.scaleRootNote}, :${state.selectedScale}`
    : 'no scale selected'

  const chordsSnippet = state.selectedChord
    ? `chord :${state.chordRootNote}, :${state.selectedChord}`
    : 'no chord selected'

  // ── Handlers ────────────────────────────────────────────
  const handleSampleClick = useCallback(
    (name: string) => {
      if (name === state.selectedSample) {
        if (samplePlaying) sampleStop()
        else samplePlay()
      } else {
        playOnLoad()
        setState((s) => ({ ...s, selectedSample: name }))
      }
    },
    [state.selectedSample, samplePlaying, samplePlay, playOnLoad, sampleStop],
  )

  const handleScaleClick = useCallback(
    (name: string) => {
      if (name === state.selectedScale) {
        if (scalePlaying) scaleStop()
        else scalePlay()
      } else {
        scalePlayOnLoad()
        setState((s) => ({ ...s, selectedScale: name }))
      }
    },
    [state.selectedScale, scalePlaying, scalePlay, scalePlayOnLoad, scaleStop],
  )

  const handleCategoryChange = useCallback((category: SampleCategory) => {
    const first = SAMPLE_GROUPS.find((g) => g.category === category)?.samples[0]?.name ?? null
    setState((s) => ({ ...s, selectedCategory: category, selectedSample: first, search: '' }))
  }, [])

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setState((s) => ({ ...s, activeTab: tab }))
  }, [])

  const handleSearchChange = useCallback((v: string) => {
    setState((s) => {
      if (s.activeTab === 'samples') return { ...s, search: v }
      if (s.activeTab === 'chords') return { ...s, chordsSearch: v }
      return { ...s, scalesSearch: v }
    })
  }, [])

  const handleRootNoteChange = useCallback((note: string) => {
    setState((s) => ({ ...s, scaleRootNote: note }))
  }, [])

  const handleOctaveChange = useCallback((oct: number) => {
    setState((s) => ({ ...s, scaleOctave: oct }))
  }, [])

  const handleChordClick = useCallback(
    (name: string) => {
      if (name === state.selectedChord) {
        if (chordPlaying) chordStop()
        else void chordPlay()
      } else {
        chordPlayOnLoad()
        setState((s) => ({ ...s, selectedChord: name }))
      }
    },
    [state.selectedChord, chordPlaying, chordPlay, chordPlayOnLoad, chordStop],
  )

  const handleChordRootNoteChange = useCallback((note: string) => {
    setState((s) => ({ ...s, chordRootNote: note }))
  }, [])

  const handleChordOctaveChange = useCallback((oct: number) => {
    setState((s) => ({ ...s, chordOctave: oct }))
  }, [])

  const handleChordNumOctavesChange = useCallback((n: number) => {
    setState((s) => ({ ...s, chordNumOctaves: n }))
  }, [])

  const handleChordModeChange = useCallback((mode: ChordMode) => {
    setState((s) => ({ ...s, chordMode: mode }))
  }, [])

  const handleRateChange = useCallback((rate: number) => {
    setState((s) => ({ ...s, rate }))
  }, [])

  const handleAmpChange = useCallback((amp: number) => {
    setState((s) => {
      if (s.activeTab === 'samples') return { ...s, amp }
      if (s.activeTab === 'chords') return { ...s, chordAmp: amp }
      return { ...s, scaleAmp: amp }
    })
  }, [])

  const handleCopy = useCallback(() => {
    if (state.activeTab === 'samples' && state.selectedSample) {
      navigator.clipboard.writeText(samplesSnippet)
    } else if (state.activeTab === 'chords' && state.selectedChord) {
      navigator.clipboard.writeText(chordsSnippet)
    } else if (state.activeTab === 'scales' && state.selectedScale) {
      navigator.clipboard.writeText(scalesSnippet)
    }
  }, [state.activeTab, state.selectedSample, state.selectedChord, state.selectedScale, samplesSnippet, chordsSnippet, scalesSnippet])

  // ── Keyboard shortcuts ──────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return

      if (state.activeTab === 'samples') {
        const idx = state.selectedSample
          ? filteredSamples.findIndex((s) => s.name === state.selectedSample)
          : -1
        const navigate = (delta: number) => {
          const next = filteredSamples[idx + delta]
          if (next) setState((s) => ({ ...s, selectedSample: next.name }))
        }
        switch (e.key) {
          case ' ':
            e.preventDefault()
            if (state.selectedSample) {
              if (samplePlaying) sampleStop(); else samplePlay()
            }
            break
          case 'ArrowRight': e.preventDefault(); navigate(1); break
          case 'ArrowLeft':  e.preventDefault(); navigate(-1); break
          case 'ArrowDown':  e.preventDefault(); navigate(GRID_COL_ESTIMATE); break
          case 'ArrowUp':    e.preventDefault(); navigate(-GRID_COL_ESTIMATE); break
          case 'c': case 'C': handleCopy(); break
        }
      } else if (state.activeTab === 'chords') {
        const idx = state.selectedChord
          ? filteredChords.findIndex((c) => c.name === state.selectedChord)
          : -1
        const navigate = (delta: number) => {
          const next = filteredChords[idx + delta]
          if (next) setState((s) => ({ ...s, selectedChord: next.name }))
        }
        switch (e.key) {
          case ' ':
            e.preventDefault()
            if (state.selectedChord) {
              if (chordPlaying) chordStop(); else void chordPlay()
            }
            break
          case 'ArrowRight': e.preventDefault(); navigate(1); break
          case 'ArrowLeft':  e.preventDefault(); navigate(-1); break
          case 'ArrowDown':  e.preventDefault(); navigate(GRID_COL_ESTIMATE); break
          case 'ArrowUp':    e.preventDefault(); navigate(-GRID_COL_ESTIMATE); break
          case 'c': case 'C': handleCopy(); break
        }
      } else if (state.activeTab === 'scales') {
        const idx = state.selectedScale
          ? filteredScales.findIndex((s) => s.name === state.selectedScale)
          : -1
        const navigate = (delta: number) => {
          const next = filteredScales[idx + delta]
          if (next) setState((s) => ({ ...s, selectedScale: next.name }))
        }
        switch (e.key) {
          case ' ':
            e.preventDefault()
            if (state.selectedScale) {
              if (scalePlaying) scaleStop(); else scalePlay()
            }
            break
          case 'ArrowRight': e.preventDefault(); navigate(1); break
          case 'ArrowLeft':  e.preventDefault(); navigate(-1); break
          case 'ArrowDown':  e.preventDefault(); navigate(GRID_COL_ESTIMATE); break
          case 'ArrowUp':    e.preventDefault(); navigate(-GRID_COL_ESTIMATE); break
          case 'c': case 'C': handleCopy(); break
        }
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [
    state.activeTab,
    state.selectedSample, state.selectedChord, state.selectedScale,
    filteredSamples, filteredChords, filteredScales,
    samplePlaying, chordPlaying, scalePlaying,
    samplePlay, sampleStop, chordPlay, chordStop, scalePlay, scaleStop,
    handleCopy,
  ])

  const isSamplesTab = state.activeTab === 'samples'
  const isChordsTab = state.activeTab === 'chords'

  const activeSearch = isSamplesTab
    ? state.search
    : isChordsTab
      ? state.chordsSearch
      : state.scalesSearch

  const activeSnippet = isSamplesTab
    ? samplesSnippet
    : isChordsTab
      ? chordsSnippet
      : scalesSnippet

  const activeHasSelection = isSamplesTab
    ? !!state.selectedSample
    : isChordsTab
      ? !!state.selectedChord
      : !!state.selectedScale

  const activeAmp = isSamplesTab
    ? state.amp
    : isChordsTab
      ? state.chordAmp
      : state.scaleAmp

  return (
    <div className="app">
      <Topbar
        activeTab={state.activeTab}
        onTabChange={handleTabChange}
        search={activeSearch}
        onSearchChange={handleSearchChange}
      />

      <div className="main">
        {isSamplesTab && (
          <Sidebar
            selectedCategory={state.selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {isSamplesTab ? (
          <SampleGrid
            samples={filteredSamples}
            selectedSample={state.selectedSample}
            isPlaying={samplePlaying}
            onSampleClick={handleSampleClick}
          />
        ) : isChordsTab ? (
          <ChordsTab
            chords={filteredChords}
            selectedChord={state.selectedChord}
            isPlaying={chordPlaying}
            rootNote={state.chordRootNote}
            octave={state.chordOctave}
            numOctaves={state.chordNumOctaves}
            mode={state.chordMode}
            onChordClick={handleChordClick}
            onRootNoteChange={handleChordRootNoteChange}
            onOctaveChange={handleChordOctaveChange}
            onNumOctavesChange={handleChordNumOctavesChange}
            onModeChange={handleChordModeChange}
          />
        ) : (
          <ScalesTab
            scales={filteredScales}
            selectedScale={state.selectedScale}
            isPlaying={scalePlaying}
            rootNote={state.scaleRootNote}
            octave={state.scaleOctave}
            onScaleClick={handleScaleClick}
            onRootNoteChange={handleRootNoteChange}
            onOctaveChange={handleOctaveChange}
          />
        )}
      </div>

      <BottomPanel
        showRate={isSamplesTab}
        rate={state.rate}
        onRateChange={handleRateChange}
        amp={activeAmp}
        onAmpChange={handleAmpChange}
        snippet={activeSnippet}
        hasSelection={activeHasSelection}
        onCopy={handleCopy}
      />
    </div>
  )
}

export default App
