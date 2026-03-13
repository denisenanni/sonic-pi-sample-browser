import { SampleCard } from './components/SampleCard'

const TEST_SAMPLES = ['bd_haus', 'ambi_choir', 'loop_amen', 'elec_ping', 'perc_bell'] as const

function App() {
  return (
    <div>
      <h1>Sonic Pi Sample Browser</h1>
      {TEST_SAMPLES.map((name) => (
        <SampleCard key={name} sampleName={name} />
      ))}
    </div>
  )
}

export default App
