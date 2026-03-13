import type { Scale } from '../data/scales'

const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const
const OCTAVES = [3, 4, 5] as const

interface ScalesTabProps {
  scales: Scale[]
  selectedScale: string | null
  isPlaying: boolean
  rootNote: string
  octave: number
  onScaleClick: (name: string) => void
  onRootNoteChange: (note: string) => void
  onOctaveChange: (octave: number) => void
}

export function ScalesTab({
  scales,
  selectedScale,
  isPlaying,
  rootNote,
  octave,
  onScaleClick,
  onRootNoteChange,
  onOctaveChange,
}: ScalesTabProps) {
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
      </div>

      <div className="sample-grid">
        {scales.map((scale) => {
          const isSelected = scale.name === selectedScale
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
              key={scale.name}
              className={cellClass}
              onClick={() => onScaleClick(scale.name)}
              aria-label={`Play ${scale.name}${isThisPlaying ? ', currently playing' : ''}`}
              aria-pressed={isSelected}
            >
              <div className="sample-name-col">
                <span className="sample-name">:{scale.name}</span>
                <span className="scale-note-count">{scale.steps.length + 1} notes</span>
              </div>
              <span className="play-icon">{isThisPlaying ? '■' : '▶'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
