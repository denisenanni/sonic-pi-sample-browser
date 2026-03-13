import { useState } from 'react'
import { useAudioPlayer } from '../hooks/useAudioPlayer'

interface SampleCardProps {
  sampleName: string
}

export function SampleCard({ sampleName }: SampleCardProps) {
  const [rate, setRate] = useState(1.0)
  const [amp, setAmp] = useState(1.0)
  const { play, stop, isPlaying, error } = useAudioPlayer(sampleName, rate, amp)

  const snippet = `sample :${sampleName}, rate: ${rate.toFixed(2)}, amp: ${amp.toFixed(2)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet)
  }

  const handlePlayStop = () => {
    if (isPlaying) {
      stop()
    } else {
      play()
    }
  }

  return (
    <div>
      <p><strong>:{sampleName}</strong></p>

      {error && <p>{error}</p>}

      <button onClick={handlePlayStop}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>

      <div>
        <label>
          Rate: {rate.toFixed(2)}
          <input
            type="range"
            min={0.1}
            max={2.0}
            step={0.01}
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          Amp: {amp.toFixed(2)}
          <input
            type="range"
            min={0.0}
            max={2.0}
            step={0.01}
            value={amp}
            onChange={(e) => setAmp(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div>
        <code>{snippet}</code>
        <button onClick={handleCopy}>Copy</button>
      </div>
    </div>
  )
}
