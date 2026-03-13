const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

/** MIDI note numbers for each pitch class at octave 4 (C4 = 60). */
export const ROOT_MIDI_OCT4: Record<string, number> = {
  C: 60, 'C#': 61, D: 62, 'D#': 63, E: 64, F: 65,
  'F#': 66, G: 67, 'G#': 68, A: 69, 'A#': 70, B: 71,
}

export function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1
  const name = NOTE_NAMES[midi % 12]
  return `${name}${octave}`
}
