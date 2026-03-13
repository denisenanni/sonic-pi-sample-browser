import { useCallback, useEffect, useRef, useState } from 'react'
import { PolySynth, Synth, start as toneStart } from 'tone'
import { CHORDS } from '../data/chords'

export type ChordMode = 'block' | 'arpeggio'

export interface ChordPlayerControls {
  play: () => Promise<void>
  playOnLoad: () => void
  stop: () => void
  isPlaying: boolean
}

const ARPEGGIO_INTERVAL_MS = 120
const BLOCK_RELEASE_MS = 1500

/** MIDI note numbers for each pitch class at octave 4 (C4 = 60). */
const ROOT_MIDI_OCT4: Record<string, number> = {
  C: 60, 'C#': 61, D: 62, 'D#': 63, E: 64, F: 65,
  'F#': 66, G: 67, 'G#': 68, A: 69, 'A#': 70, B: 71,
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1
  const name = NOTE_NAMES[midi % 12]
  return `${name}${octave}`
}

function buildChordNotes(
  chordName: string,
  rootNote: string,
  octave: number,
  numOctaves: number,
): string[] {
  const chord = CHORDS.find((c) => c.name === chordName)
  if (!chord) return []

  const baseMidi = ROOT_MIDI_OCT4[rootNote] + (octave - 4) * 12
  const notes: string[] = []

  for (let o = 0; o < numOctaves; o++) {
    for (const interval of chord.intervals) {
      notes.push(midiToNoteName(baseMidi + interval + o * 12))
    }
  }

  return notes
}

function useLatestRef<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}

const SYNTH_OPTIONS = {
  oscillator: { type: 'triangle' as const },
  envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.8 },
}

export function useChordPlayer(
  chordName: string,
  rootNote: string,
  octave: number,
  numOctaves: number,
  mode: ChordMode,
  amp: number,
): ChordPlayerControls {
  const polySynthRef = useRef<PolySynth | null>(null)
  const arpeggioSynthRef = useRef<Synth | null>(null)
  const timeoutsRef = useRef<number[]>([])
  const pendingPlayRef = useRef(false)

  const chordNameRef = useLatestRef(chordName)
  const rootNoteRef = useLatestRef(rootNote)
  const octaveRef = useLatestRef(octave)
  const numOctavesRef = useLatestRef(numOctaves)
  const modeRef = useLatestRef(mode)
  const ampRef = useLatestRef(amp)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const poly = new PolySynth(Synth, SYNTH_OPTIONS).toDestination()
    const arp = new Synth(SYNTH_OPTIONS).toDestination()
    polySynthRef.current = poly
    arpeggioSynthRef.current = arp

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      poly.dispose()
      arp.dispose()
      polySynthRef.current = null
      arpeggioSynthRef.current = null
    }
  }, [])

  const stopInternal = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    polySynthRef.current?.releaseAll()
    arpeggioSynthRef.current?.triggerRelease()
    setIsPlaying(false)
  }, [])

  const playNotes = useCallback(async (notes: string[]): Promise<void> => {
    if (notes.length === 0) return

    stopInternal()
    await toneStart()

    const volumeDb = ampRef.current === 0 ? -Infinity : 20 * Math.log10(ampRef.current)

    if (modeRef.current === 'block') {
      const poly = polySynthRef.current
      if (!poly) return
      poly.volume.value = volumeDb
      poly.triggerAttack(notes)
      setIsPlaying(true)
      const id = window.setTimeout(() => {
        poly.releaseAll()
        setIsPlaying(false)
      }, BLOCK_RELEASE_MS)
      timeoutsRef.current.push(id)
    } else {
      const arp = arpeggioSynthRef.current
      if (!arp) return
      arp.volume.value = volumeDb
      setIsPlaying(true)
      notes.forEach((note, i) => {
        const id = window.setTimeout(() => {
          arp.triggerAttackRelease(note, 0.15)
          if (i === notes.length - 1) {
            const doneId = window.setTimeout(() => setIsPlaying(false), 700)
            timeoutsRef.current.push(doneId)
          }
        }, i * ARPEGGIO_INTERVAL_MS)
        timeoutsRef.current.push(id)
      })
    }
  }, [stopInternal, ampRef, modeRef])

  // Fires when chordName changes and a pending play was queued.
  useEffect(() => {
    if (!pendingPlayRef.current || !chordName) return
    pendingPlayRef.current = false
    const notes = buildChordNotes(
      chordNameRef.current,
      rootNoteRef.current,
      octaveRef.current,
      numOctavesRef.current,
    )
    void playNotes(notes)
  }, [chordName, playNotes, chordNameRef, rootNoteRef, octaveRef, numOctavesRef])

  const play = useCallback(async (): Promise<void> => {
    const notes = buildChordNotes(
      chordNameRef.current,
      rootNoteRef.current,
      octaveRef.current,
      numOctavesRef.current,
    )
    await playNotes(notes)
  }, [playNotes, chordNameRef, rootNoteRef, octaveRef, numOctavesRef])

  const playOnLoad = useCallback((): void => {
    pendingPlayRef.current = true
  }, [])

  const stop = useCallback((): void => {
    pendingPlayRef.current = false
    stopInternal()
  }, [stopInternal])

  return { play, playOnLoad, stop, isPlaying }
}
