import { useCallback, useEffect, useRef, useState } from 'react'
import { Synth, start as toneStart } from 'tone'

export interface ScalePlayerControls {
  play: () => Promise<void>
  playOnLoad: () => void
  stop: () => void
  isPlaying: boolean
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

const NOTE_INTERVAL_MS = 200
const DONE_DELAY_MS = 700

/** MIDI note numbers for each pitch class at octave 4 (C4 = 60). */
const ROOT_MIDI_OCT4: Record<string, number> = {
  C: 60, 'C#': 61, D: 62, 'D#': 63, E: 64, F: 65,
  'F#': 66, G: 67, 'G#': 68, A: 69, 'A#': 70, B: 71,
}

function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1
  const name = NOTE_NAMES[midi % 12]
  return `${name}${octave}`
}

function buildNotes(steps: number[], rootNote: string, octave: number): string[] {
  const baseMidi = ROOT_MIDI_OCT4[rootNote] + (octave - 4) * 12
  const notes: string[] = [midiToNoteName(baseMidi)]
  let current = baseMidi
  for (const step of steps) {
    current += step
    notes.push(midiToNoteName(current))
  }
  return notes
}

// Always-current refs so play logic sees the latest props even in callbacks.
function useLatestRef<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}

export function useScalePlayer(
  steps: number[],
  rootNote: string,
  octave: number,
  amp: number,
): ScalePlayerControls {
  const synthRef = useRef<Synth | null>(null)
  const timeoutsRef = useRef<number[]>([])
  const pendingPlayRef = useRef(false)

  const stepsRef = useLatestRef(steps)
  const rootNoteRef = useLatestRef(rootNote)
  const octaveRef = useLatestRef(octave)
  const ampRef = useLatestRef(amp)

  const [isPlaying, setIsPlaying] = useState(false)

  // Create synth once on mount.
  useEffect(() => {
    const synth = new Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.5 },
    }).toDestination()
    synthRef.current = synth

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      synth.dispose()
      synthRef.current = null
    }
  }, [])

  const playNotes = useCallback(async (notes: string[]): Promise<void> => {
    const synth = synthRef.current
    if (!synth) return

    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    synth.triggerRelease()

    await toneStart()
    synth.volume.value = ampRef.current === 0 ? -Infinity : 20 * Math.log10(ampRef.current)
    setIsPlaying(true)

    notes.forEach((note, i) => {
      const id = window.setTimeout(() => {
        synth.triggerAttackRelease(note, 0.15)
        if (i === notes.length - 1) {
          const doneId = window.setTimeout(() => setIsPlaying(false), DONE_DELAY_MS)
          timeoutsRef.current.push(doneId)
        }
      }, i * NOTE_INTERVAL_MS)
      timeoutsRef.current.push(id)
    })
  }, [])

  // Fires whenever `steps` changes (i.e. a new scale is selected).
  // If playOnLoad() was called first, auto-play immediately.
  useEffect(() => {
    if (!pendingPlayRef.current || steps.length === 0) return
    pendingPlayRef.current = false
    void playNotes(buildNotes(steps, rootNoteRef.current, octaveRef.current))
  }, [steps, playNotes])

  const play = useCallback(async (): Promise<void> => {
    await playNotes(buildNotes(stepsRef.current, rootNoteRef.current, octaveRef.current))
  }, [playNotes])

  // Queue autoplay for when the next steps update arrives (new scale selected).
  const playOnLoad = useCallback((): void => {
    pendingPlayRef.current = true
  }, [])

  const stop = useCallback((): void => {
    pendingPlayRef.current = false
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    synthRef.current?.triggerRelease()
    setIsPlaying(false)
  }, [])

  return { play, playOnLoad, stop, isPlaying }
}
