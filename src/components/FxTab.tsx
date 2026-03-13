import { useMemo } from 'react'
import { FX_LIST, FX_PREVIEW_SAMPLES } from '../data/fx'
import type { FxDefinition } from '../data/fx'
import type { FxPlayerControls } from '../hooks/useFxPlayer'

interface FxTabProps {
  filteredFx: FxDefinition[]
  selectedFx: string | null
  selectedSample: string
  params: Record<string, number>
  mix: number
  amp: number
  isPlaying: boolean
  player: FxPlayerControls
  snippet: string
  onFxClick: (key: string) => void
  onSampleChange: (value: string) => void
  onParamChange: (key: string, value: number) => void
  onMixChange: (value: number) => void
  onAmpChange: (value: number) => void
  onCopy: () => void
}

export function FxTab({
  filteredFx,
  selectedFx,
  selectedSample,
  params,
  mix,
  amp,
  isPlaying,
  player,
  snippet,
  onFxClick,
  onSampleChange,
  onParamChange,
  onMixChange,
  onAmpChange,
  onCopy,
}: FxTabProps) {
  const activeFxDef = useMemo(
    () => FX_LIST.find((f) => f.key === selectedFx) ?? null,
    [selectedFx],
  )

  const handlePlayStop = () => {
    if (isPlaying) {
      player.stop()
    } else {
      void player.play()
    }
  }

  return (
    <div className="fx-tab">
      {/* ── Top controls ───────────────────────────────────────── */}
      <div className="fx-top-controls">
        <div className="fx-sample-row">
          <span className="scales-control-label">Sample</span>
          <select
            className="fx-sample-select"
            value={selectedSample}
            onChange={(e) => onSampleChange(e.target.value)}
          >
            {FX_PREVIEW_SAMPLES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            className={`fx-play-btn${isPlaying ? ' active' : ''}`}
            onClick={handlePlayStop}
            disabled={!selectedFx}
          >
            {isPlaying ? '■ stop' : '▶ play'}
          </button>
        </div>
      </div>

      {/* ── FX grid ────────────────────────────────────────────── */}
      <div className="grid-container fx-grid-container">
        <div className="sample-grid">
          {filteredFx.map((fx) => {
            const isSelected = fx.key === selectedFx
            return (
              <div
                key={fx.key}
                className={`sample-cell fx-cell${isSelected ? ' selected' : ''}${isSelected && isPlaying ? ' playing' : ''}`}
                onClick={() => onFxClick(fx.key)}
                title={fx.doc}
              >
                <div className="sample-name-col">
                  <span className="sample-name">{fx.name}</span>
                  <span className="scale-note-count">:{fx.key}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Bottom panel ───────────────────────────────────────── */}
      <div className="bottom-panel fx-bottom-panel">
        <div className="controls fx-controls">
          {/* Mix */}
          <div className="control-group">
            <span>Mix</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={mix}
              onChange={(e) => onMixChange(parseFloat(e.target.value))}
            />
            <span className="control-value">{mix.toFixed(2)}</span>
          </div>

          {/* Amp */}
          <div className="control-group">
            <span>Amp</span>
            <input
              type="range"
              min={0}
              max={2}
              step={0.01}
              value={amp}
              onChange={(e) => onAmpChange(parseFloat(e.target.value))}
            />
            <span className="control-value">{amp.toFixed(2)}</span>
          </div>

          {/* Per-FX params */}
          {activeFxDef?.params.map((p) => (
            <div key={p.key} className="control-group" title={p.doc}>
              <span>{p.label}</span>
              <input
                type="range"
                min={p.min}
                max={p.max}
                step={p.step}
                value={params[p.key] ?? p.default}
                onChange={(e) => onParamChange(p.key, parseFloat(e.target.value))}
              />
              <span className="control-value">
                {(params[p.key] ?? p.default).toFixed(p.step < 1 ? 2 : 0)}
              </span>
            </div>
          ))}
        </div>

        <div className="shortcuts">
          <span className="shortcut"><kbd>Space</kbd> play/stop</span>
          <span className="shortcut"><kbd>↑↓←→</kbd> navigate</span>
          <span className="shortcut"><kbd>C</kbd> copy</span>
        </div>

        <div className="snippet-area">
          <code className={`snippet-code${selectedFx ? ' has-sample' : ''}`}>
            {snippet}
          </code>
          <button className="copy-btn" onClick={onCopy} disabled={!selectedFx}>
            copy
          </button>
        </div>
      </div>
    </div>
  )
}
