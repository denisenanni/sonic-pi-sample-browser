import { useEffect, useRef, useState } from 'react'
import { Player, gainToDb, start as toneStart } from 'tone'

export interface AudioPlayerControls {
  play: () => Promise<void>
  stop: () => void
  isPlaying: boolean
  error: string | null
}

export function useAudioPlayer(
  sampleName: string,
  rate: number,
  amp: number,
): AudioPlayerControls {
  const playerRef = useRef<Player | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Dispose the current player and create a fresh one whenever sampleName changes.
  useEffect(() => {
    playerRef.current?.dispose()
    playerRef.current = null
    setIsPlaying(false)
    setError(null)

    const url = `${import.meta.env.BASE_URL}samples/${sampleName}.wav`

    const player = new Player({
      url,
      onload: () => {
        setError(null)
      },
      onerror: () => {
        setError('File not found — add WAV to public/samples/')
        setIsPlaying(false)
      },
    }).toDestination()

    player.onstop = () => setIsPlaying(false)

    playerRef.current = player

    return () => {
      player.dispose()
      playerRef.current = null
    }
  }, [sampleName])

  const play = async (): Promise<void> => {
    const player = playerRef.current
    if (!player || !player.loaded) return

    // Tone.js requires AudioContext to be resumed after a user gesture.
    await toneStart()

    if (player.state === 'started') {
      player.stop()
    }

    player.playbackRate = rate
    player.volume.value = amp === 0 ? -Infinity : gainToDb(amp)

    player.start()
    setIsPlaying(true)
  }

  const stop = (): void => {
    playerRef.current?.stop()
    setIsPlaying(false)
  }

  return { play, stop, isPlaying, error }
}
