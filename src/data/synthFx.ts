import type { FxParam } from './fx'

export type { FxParam }

export type SynthFxDefinition = {
  key: string           // Sonic Pi FX key e.g. "reverb"
  supersonicName: string // CDN synthdef name e.g. "sonic-pi-fx_reverb"
  label: string          // Display name e.g. "Reverb"
  params: FxParam[]      // Interactive params (excludes amp/pre_amp/mix — added by the engine)
}

// Curated list — all names confirmed against CDN index
// https://unpkg.com/supersonic-scsynth-synthdefs@latest/synthdefs/
export const SYNTH_FX_LIST: SynthFxDefinition[] = [
  {
    key: 'reverb',
    supersonicName: 'sonic-pi-fx_reverb',
    label: 'Reverb',
    params: [
      { key: 'room', label: 'Room', doc: 'Room size (0=small, 1=large)', default: 0.6, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'damp', label: 'Damp', doc: 'High-frequency dampening', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'gverb',
    supersonicName: 'sonic-pi-fx_gverb',
    label: 'GVerb',
    params: [
      { key: 'room', label: 'Room', doc: 'Room size in metres', default: 10.0, min: 1.0, max: 300.0, step: 1.0 },
      { key: 'spread', label: 'Spread', doc: 'Stereo spread', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'damp', label: 'Damp', doc: 'High-frequency dampening', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'echo',
    supersonicName: 'sonic-pi-fx_echo',
    label: 'Echo',
    params: [
      { key: 'phase', label: 'Phase', doc: 'Delay time in beats', default: 0.25, min: 0.01, max: 2.0, step: 0.01 },
      { key: 'decay', label: 'Decay', doc: 'Feedback decay (0=single, 1=infinite)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'distortion',
    supersonicName: 'sonic-pi-fx_distortion',
    label: 'Distortion',
    params: [
      { key: 'distort', label: 'Distort', doc: 'Distortion amount (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'bitcrusher',
    supersonicName: 'sonic-pi-fx_bitcrusher',
    label: 'Bitcrusher',
    params: [
      { key: 'bits', label: 'Bits', doc: 'Bit depth (1–24)', default: 8, min: 1, max: 24, step: 1 },
      { key: 'sample_rate', label: 'Sample Rate', doc: 'Downsampled rate in Hz', default: 10000, min: 100, max: 48000, step: 100 },
    ],
  },
  {
    key: 'krush',
    supersonicName: 'sonic-pi-fx_krush',
    label: 'Krush',
    params: [
      { key: 'gain', label: 'Gain', doc: 'Drive/gain amount', default: 5.0, min: 1.0, max: 1000.0, step: 1.0 },
      { key: 'cutoff', label: 'Cutoff', doc: 'Post-distortion filter cutoff (MIDI note)', default: 100, min: 0, max: 130, step: 1 },
    ],
  },
  {
    key: 'lpf',
    supersonicName: 'sonic-pi-fx_lpf',
    label: 'Low Pass Filter',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
    ],
  },
  {
    key: 'hpf',
    supersonicName: 'sonic-pi-fx_hpf',
    label: 'High Pass Filter',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
    ],
  },
  {
    key: 'rlpf',
    supersonicName: 'sonic-pi-fx_rlpf',
    label: 'Resonant LPF',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Resonance amount (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'wobble',
    supersonicName: 'sonic-pi-fx_wobble',
    label: 'Wobble',
    params: [
      { key: 'phase', label: 'Phase', doc: 'LFO period in beats', default: 0.5, min: 0.01, max: 4.0, step: 0.01 },
      { key: 'cutoff_min', label: 'Cutoff Min', doc: 'Minimum filter cutoff (MIDI note)', default: 60, min: 0, max: 130, step: 1 },
      { key: 'cutoff_max', label: 'Cutoff Max', doc: 'Maximum filter cutoff (MIDI note)', default: 120, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Filter resonance', default: 0.8, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'flanger',
    supersonicName: 'sonic-pi-fx_flanger',
    label: 'Flanger',
    params: [
      { key: 'phase', label: 'Phase', doc: 'LFO period in beats', default: 4.0, min: 0.01, max: 4.0, step: 0.01 },
      { key: 'depth', label: 'Depth', doc: 'Sweep depth', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'feedback', label: 'Feedback', doc: 'Feedback amount (0–1)', default: 0.0, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'pitch_shift',
    supersonicName: 'sonic-pi-fx_pitch_shift',
    label: 'Pitch Shift',
    params: [
      { key: 'pitch', label: 'Pitch', doc: 'Semitones to shift (−72–72)', default: 0, min: -72, max: 72, step: 1 },
    ],
  },
  {
    key: 'tremolo',
    supersonicName: 'sonic-pi-fx_tremolo',
    label: 'Tremolo',
    params: [
      { key: 'phase', label: 'Phase', doc: 'LFO period in beats', default: 4.0, min: 0.01, max: 32.0, step: 0.01 },
      { key: 'depth', label: 'Depth', doc: 'Tremolo depth (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'wave', label: 'Wave', doc: 'LFO shape: 0=saw, 1=pulse, 2=tri, 3=sine', default: 3, min: 0, max: 3, step: 1 },
    ],
  },
  {
    key: 'pan',
    supersonicName: 'sonic-pi-fx_pan',
    label: 'Pan',
    params: [
      { key: 'pan', label: 'Pan', doc: 'Stereo position (−1=left, 0=centre, 1=right)', default: 0.0, min: -1.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'ring_mod',
    supersonicName: 'sonic-pi-fx_ring_mod',
    label: 'Ring Modulator',
    params: [
      { key: 'freq', label: 'Freq', doc: 'Carrier frequency in Hz', default: 30.0, min: 0.0, max: 500.0, step: 1.0 },
    ],
  },
]
