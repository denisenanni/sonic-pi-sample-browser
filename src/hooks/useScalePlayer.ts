import { useEffect, useRef, useState } from 'react'
import { Synth, start as toneStart } from 'tone'

export interface ScalePlayerControls {
  play: () => Promise<void>
  stop: () => void
  isPlaying: boolean
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

const ROOT_MIDI: Record<string, number> = {
  C: 60, 'C#': 61, D: 62, 'D#': 63, E: 64, F: 65,
  'F#': 66, G: 67, 'G#': 68, A: 69, 'A#': 70, B: 71,
}

function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1
  const name = NOTE_NAMES[midi % 12]
  return `${name}${octave}`
}

function buildNotes(steps: number[], rootNote: string, octave: number): string[] {
  const baseMidi = ROOT_MIDI[rootNote] + (octave - 4) * 12
  const notes: string[] = [midiToNoteName(baseMidi)]
  let current = baseMidi
  for (const step of steps) {
    current += step
    notes.push(midiToNoteName(current))
  }
  return notes
}

export function useScalePlayer(
  steps: number[],
  rootNote: string,
  octave: number,
  amp: number,
): ScalePlayerControls {
  const synthRef = useRef<Synth | null>(null)
  const timeoutsRef = useRef<number[]>([])
  const ampRef = useRef(amp)
  ampRef.current = amp

  const [isPlaying, setIsPlaying] = useState(false)

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

  const play = async (): Promise<void> => {
    const synth = synthRef.current
    if (!synth) return

    // Cancel any in-progress playback.
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    synth.triggerRelease()

    await toneStart()

    const notes = buildNotes(steps, rootNote, octave)
    synth.volume.value = ampRef.current === 0 ? -Infinity : 20 * Math.log10(ampRef.current)

    setIsPlaying(true)

    notes.forEach((note, i) => {
      const id = window.setTimeout(() => {
        synth.triggerAttackRelease(note, 0.15)
        if (i === notes.length - 1) {
          // Give the last note time to release before clearing the flag.
          const doneId = window.setTimeout(() => setIsPlaying(false), 700)
          timeoutsRef.current.push(doneId)
        }
      }, i * 200)
      timeoutsRef.current.push(id)
    })
  }

  const stop = (): void => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    synthRef.current?.triggerRelease()
    setIsPlaying(false)
  }

  return { play, stop, isPlaying }
}
