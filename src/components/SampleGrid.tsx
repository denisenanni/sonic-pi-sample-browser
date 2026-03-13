import type { Sample } from '../data/samples'

interface SampleGridProps {
  samples: Sample[]
  selectedSample: string | null
  isPlaying: boolean
  onSampleClick: (name: string) => void
}

export function SampleGrid({ samples, selectedSample, isPlaying, onSampleClick }: SampleGridProps) {
  return (
    <div className="grid-container">
      <div className="sample-grid">
        {samples.map((sample) => {
          const isSelected = sample.name === selectedSample
          const isThisPlaying = isSelected && isPlaying
          const cellClass = [
            'sample-cell',
            isSelected ? 'selected' : '',
            isThisPlaying ? 'playing' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <div
              key={sample.name}
              className={cellClass}
              onClick={() => onSampleClick(sample.name)}
            >
              <span className="sample-name">:{sample.name}</span>
              <span className="play-icon">{isThisPlaying ? '■' : '▶'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
