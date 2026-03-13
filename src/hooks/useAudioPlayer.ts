import { useCallback, useEffect, useRef, useState } from 'react'
import { Player, gainToDb, start as toneStart } from 'tone'

export interface AudioPlayerControls {
  play: () => Promise<void>
  playOnLoad: () => void
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
  const pendingPlayRef = useRef(false)

  // Always-current refs so the onload callback captures the latest values.
  const rateRef = useRef(rate)
  const ampRef = useRef(amp)
  rateRef.current = rate
  ampRef.current = amp

  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sampleName) return

    const url = `${import.meta.env.BASE_URL}samples/${sampleName}.flac`

    const player = new Player({
      url,
      onload: async () => {
        setError(null)
        if (pendingPlayRef.current) {
          pendingPlayRef.current = false
          await toneStart()
          player.playbackRate = rateRef.current
          player.volume.value =
            ampRef.current === 0 ? -Infinity : gainToDb(ampRef.current)
          player.start()
          setIsPlaying(true)
        }
      },
      onerror: () => {
        pendingPlayRef.current = false
        setError('File not found — add FLAC to public/samples/')
        setIsPlaying(false)
      },
    }).toDestination()

    player.onstop = () => setIsPlaying(false)
    playerRef.current = player

    return () => {
      player.dispose()
      playerRef.current = null
      setIsPlaying(false)
      setError(null)
    }
  }, [sampleName])

  const play = useCallback(async (): Promise<void> => {
    const player = playerRef.current
    if (!player) return

    if (!player.loaded) {
      pendingPlayRef.current = true
      return
    }

    await toneStart()
    if (player.state === 'started') player.stop()
    player.playbackRate = rateRef.current
    player.volume.value =
      ampRef.current === 0 ? -Infinity : gainToDb(ampRef.current)
    player.start()
    setIsPlaying(true)
  }, [])

  // Queue autoplay for when the next buffer finishes loading.
  // Call this before updating selectedSample so the new player picks it up.
  const playOnLoad = useCallback((): void => {
    pendingPlayRef.current = true
  }, [])

  const stop = useCallback((): void => {
    pendingPlayRef.current = false
    playerRef.current?.stop()
    setIsPlaying(false)
  }, [])

  return { play, playOnLoad, stop, isPlaying, error }
}
