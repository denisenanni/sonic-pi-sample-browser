import type { Chord } from '../data/chords'
import type { ChordMode } from '../hooks/useChordPlayer'

const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
const OCTAVES = [3, 4, 5] as const
const NUM_OCTAVES = [1, 2, 3] as const

interface ChordsTabProps {
  chords: Chord[]
  selectedChord: string | null
  isPlaying: boolean
  rootNote: string
  octave: number
  numOctaves: number
  mode: ChordMode
  onChordClick: (name: string) => void
  onRootNoteChange: (note: string) => void
  onOctaveChange: (octave: number) => void
  onNumOctavesChange: (n: number) => void
  onModeChange: (mode: ChordMode) => void
}

export function ChordsTab({
  chords,
  selectedChord,
  isPlaying,
  rootNote,
  octave,
  numOctaves,
  mode,
  onChordClick,
  onRootNoteChange,
  onOctaveChange,
  onNumOctavesChange,
  onModeChange,
}: ChordsTabProps) {
  return (
    <div className="grid-container">
      <div className="scales-controls">
        <div className="scales-control-group">
          <span className="scales-control-label">Root</span>
          {ROOT_NOTES.map((note) => (
            <button
              key={note}
              className={`pill${rootNote === note ? ' active' : ''}`}
              onClick={() => onRootNoteChange(note)}
            >
              {note}
            </button>
          ))}
        </div>

        <div className="scales-control-group">
          <span className="scales-control-label">Oct</span>
          {OCTAVES.map((oct) => (
            <button
              key={oct}
              className={`pill${octave === oct ? ' active' : ''}`}
              onClick={() => onOctaveChange(oct)}
            >
              {oct}
            </button>
          ))}
        </div>

        <div className="scales-control-group">
          <span className="scales-control-label">Octaves</span>
          {NUM_OCTAVES.map((n) => (
            <button
              key={n}
              className={`pill${numOctaves === n ? ' active' : ''}`}
              onClick={() => onNumOctavesChange(n)}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="scales-control-group">
          <span className="scales-control-label">Mode</span>
          <button
            className={`pill${mode === 'block' ? ' active' : ''}`}
            onClick={() => onModeChange('block')}
          >
            Block
          </button>
          <button
            className={`pill${mode === 'arpeggio' ? ' active' : ''}`}
            onClick={() => onModeChange('arpeggio')}
          >
            Arpeggio
          </button>
        </div>
      </div>

      <div className="sample-grid">
        {chords.map((chord) => {
          const isSelected = chord.name === selectedChord
          const isThisPlaying = isSelected && isPlaying
          const cellClass = [
            'sample-cell',
            isSelected ? 'selected' : '',
            isThisPlaying ? 'playing' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={chord.name}
              className={cellClass}
              onClick={() => onChordClick(chord.name)}
              aria-label={`Play ${chord.name}${isThisPlaying ? ', currently playing' : ''}`}
              aria-pressed={isSelected}
            >
              <div className="sample-name-col">
                <span className="sample-name">:{chord.name}</span>
                <span className="scale-note-count">{chord.intervals.length} notes</span>
              </div>
              <span className="play-icon">{isThisPlaying ? '■' : '▶'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
