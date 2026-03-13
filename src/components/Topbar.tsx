type ActiveTab = 'samples' | 'scales' | 'synths'

interface TopbarProps {
  activeTab: ActiveTab
  onTabChange: (tab: ActiveTab) => void
  search: string
  onSearchChange: (value: string) => void
}

export function Topbar({ activeTab, onTabChange, search, onSearchChange }: TopbarProps) {
  return (
    <div className="topbar">
      <span className="topbar-title">SONIC PI BROWSER</span>

      <div className="topbar-tabs">
        <button
          className={`tab${activeTab === 'samples' ? ' active' : ''}`}
          onClick={() => onTabChange('samples')}
        >
          Samples
        </button>
        <button
          className={`tab${activeTab === 'scales' ? ' active' : ''}`}
          onClick={() => onTabChange('scales')}
        >
          Scales
        </button>
        <button className="tab" disabled>
          Synths
        </button>
      </div>

      <div className="topbar-spacer" />

      <input
        className="search-input"
        type="text"
        placeholder="search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}
