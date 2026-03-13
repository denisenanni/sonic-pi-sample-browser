interface BottomPanelProps {
  showRate: boolean
  rate: number
  onRateChange: (value: number) => void
  amp: number
  onAmpChange: (value: number) => void
  snippet: string
  hasSelection: boolean
  onCopy: () => void
}

export function BottomPanel({
  showRate,
  rate,
  onRateChange,
  amp,
  onAmpChange,
  snippet,
  hasSelection,
  onCopy,
}: BottomPanelProps) {
  return (
    <div className="bottom-panel">
      <div className="controls">
        {showRate && (
          <div className="control-group">
            <span>Rate</span>
            <input
              type="range"
              min={0.1}
              max={2.0}
              step={0.01}
              value={rate}
              onChange={(e) => onRateChange(parseFloat(e.target.value))}
            />
            <span className="control-value">{rate.toFixed(2)}</span>
          </div>
        )}

        <div className="control-group">
          <span>Amp</span>
          <input
            type="range"
            min={0.0}
            max={2.0}
            step={0.01}
            value={amp}
            onChange={(e) => onAmpChange(parseFloat(e.target.value))}
          />
          <span className="control-value">{amp.toFixed(2)}</span>
        </div>
      </div>

      <div className="shortcuts">
        <span className="shortcut"><kbd>Space</kbd> play/stop</span>
        <span className="shortcut"><kbd>↑↓←→</kbd> navigate</span>
        <span className="shortcut"><kbd>C</kbd> copy</span>
      </div>

      <div className="snippet-area">
        <code className={`snippet-code${hasSelection ? ' has-sample' : ''}`}>
          {snippet}
        </code>
        <button className="copy-btn" onClick={onCopy} disabled={!hasSelection}>
          copy
        </button>
      </div>
    </div>
  )
}
