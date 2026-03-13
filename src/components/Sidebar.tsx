import { SAMPLE_GROUPS } from '../data/samples'
import type { SampleCategory } from '../data/samples'

interface SidebarProps {
  selectedCategory: SampleCategory
  onCategoryChange: (category: SampleCategory) => void
}

export function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-label">Category</div>
      {SAMPLE_GROUPS.map(({ category }) => (
        <button
          key={category}
          className={`sidebar-item${selectedCategory === category ? ' active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
