export type FxParam = {
  key: string
  label: string
  doc: string
  default: number
  min: number
  max: number
  step: number
}

export type FxDefinition = {
  key: string
  name: string
  doc: string
  params: FxParam[]
}

export const FX_LIST: FxDefinition[] = [
  {
    key: 'reverb',
    name: 'Reverb',
    doc: 'Standard reverb effect with controllable room size and dampening.',
    params: [
      { key: 'room', label: 'Room', doc: 'Room size (0=small, 1=large)', default: 0.6, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'damp', label: 'Damp', doc: 'High-frequency dampening amount', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'gverb',
    name: 'GVerb',
    doc: 'Lush, algorithmic reverb with more control over tail and early reflections.',
    params: [
      { key: 'spread', label: 'Spread', doc: 'Stereo spread amount', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'damp', label: 'Damp', doc: 'High-frequency dampening', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'room', label: 'Room', doc: 'Room size in metres', default: 10.0, min: 1.0, max: 300.0, step: 1.0 },
      { key: 'release', label: 'Release', doc: 'Reverb tail decay time (seconds)', default: 3.0, min: 0.1, max: 300.0, step: 0.1 },
      { key: 'ref_level', label: 'Ref Level', doc: 'Early reflection level', default: 0.7, min: 0.0, max: 0.99, step: 0.01 },
      { key: 'tail_level', label: 'Tail Level', doc: 'Late reverb tail level', default: 0.5, min: 0.0, max: 0.99, step: 0.01 },
    ],
  },
  {
    key: 'echo',
    name: 'Echo',
    doc: 'Simple echo / delay effect with feedback control.',
    params: [
      { key: 'phase', label: 'Phase', doc: 'Delay time in beats', default: 0.25, min: 0.01, max: 2.0, step: 0.01 },
      { key: 'decay', label: 'Decay', doc: 'Feedback amount (0=single echo, 1=infinite)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'slicer',
    name: 'Slicer',
    doc: 'Amplitude modulator that rhythmically chops the signal.',
    params: [
      { key: 'phase', label: 'Phase', doc: 'Modulation cycle length in beats', default: 0.25, min: 0.01, max: 4.0, step: 0.01 },
      { key: 'pulse_width', label: 'Pulse Width', doc: 'Width of the on-cycle (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'smooth', label: 'Smooth', doc: 'Smoothing at edges', default: 0.0, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'wave', label: 'Wave', doc: 'LFO shape: 0=saw, 1=pulse, 2=tri, 3=sine', default: 1, min: 0, max: 3, step: 1 },
    ],
  },
  {
    key: 'wobble',
    name: 'Wobble',
    doc: 'Low-pass filter swept by an LFO for a classic wobble bass effect.',
    params: [
      { key: 'phase', label: 'Phase', doc: 'LFO period in beats', default: 0.5, min: 0.01, max: 4.0, step: 0.01 },
      { key: 'cutoff_min', label: 'Cutoff Min', doc: 'Minimum filter cutoff (MIDI note)', default: 60, min: 0, max: 130, step: 1 },
      { key: 'cutoff_max', label: 'Cutoff Max', doc: 'Maximum filter cutoff (MIDI note)', default: 120, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Filter resonance', default: 0.8, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'wave', label: 'Wave', doc: 'LFO shape: 0=saw, 1=pulse, 2=tri, 3=sine', default: 0, min: 0, max: 3, step: 1 },
    ],
  },
  {
    key: 'ixi_techno',
    name: 'Ixi Techno',
    doc: 'Pulsing band-pass filter inspired by ixi software — good for techno textures.',
    params: [
      { key: 'phase', label: 'Phase', doc: 'LFO period in beats', default: 4.0, min: 0.01, max: 4.0, step: 0.01 },
      { key: 'phase_offset', label: 'Phase Offset', doc: 'LFO phase offset (0–1)', default: 0.0, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'cutoff_min', label: 'Cutoff Min', doc: 'Minimum filter cutoff (MIDI note)', default: 60, min: 0, max: 130, step: 1 },
      { key: 'cutoff_max', label: 'Cutoff Max', doc: 'Maximum filter cutoff (MIDI note)', default: 120, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Filter resonance', default: 0.8, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'lpf',
    name: 'Low Pass Filter',
    doc: 'Removes frequencies above the cutoff — darkens the sound.',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
    ],
  },
  {
    key: 'hpf',
    name: 'High Pass Filter',
    doc: 'Removes frequencies below the cutoff — thins out the sound.',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
    ],
  },
  {
    key: 'rlpf',
    name: 'Resonant Low Pass Filter',
    doc: 'Low pass filter with resonance peak at the cutoff frequency.',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Resonance amount (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'rhpf',
    name: 'Resonant High Pass Filter',
    doc: 'High pass filter with resonance peak at the cutoff frequency.',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Resonance amount (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'nlpf',
    name: 'Normalised Low Pass Filter',
    doc: 'Low pass filter with normalised output to prevent clipping.',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
    ],
  },
  {
    key: 'nhpf',
    name: 'Normalised High Pass Filter',
    doc: 'High pass filter with normalised output to prevent clipping.',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
    ],
  },
  {
    key: 'nrlpf',
    name: 'Normalised Resonant Low Pass Filter',
    doc: 'Resonant low pass filter with normalised output.',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Resonance amount (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'nrhpf',
    name: 'Normalised Resonant High Pass Filter',
    doc: 'Resonant high pass filter with normalised output.',
    params: [
      { key: 'cutoff', label: 'Cutoff', doc: 'Filter cutoff (MIDI note, 0–130)', default: 110, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Resonance amount (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'bpf',
    name: 'Band Pass Filter',
    doc: 'Passes a band of frequencies around the centre frequency.',
    params: [
      { key: 'centre', label: 'Centre', doc: 'Centre frequency (MIDI note, 0–130)', default: 80, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Bandwidth / resonance (0–1)', default: 0.6, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'nbpf',
    name: 'Normalised Band Pass Filter',
    doc: 'Band pass filter with normalised output level.',
    params: [
      { key: 'centre', label: 'Centre', doc: 'Centre frequency (MIDI note, 0–130)', default: 80, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Bandwidth / resonance (0–1)', default: 0.6, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'rbpf',
    name: 'Resonant Band Pass Filter',
    doc: 'Band pass filter with a pronounced resonance peak.',
    params: [
      { key: 'centre', label: 'Centre', doc: 'Centre frequency (MIDI note, 0–130)', default: 80, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Resonance amount (0–1)', default: 0.6, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'nrbpf',
    name: 'Normalised Resonant Band Pass Filter',
    doc: 'Resonant band pass filter with normalised output.',
    params: [
      { key: 'centre', label: 'Centre', doc: 'Centre frequency (MIDI note, 0–130)', default: 80, min: 0, max: 130, step: 1 },
      { key: 'res', label: 'Resonance', doc: 'Resonance amount (0–1)', default: 0.6, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'band_eq',
    name: 'Band EQ',
    doc: 'Peaking EQ band — boost or cut a range of frequencies.',
    params: [
      { key: 'freq', label: 'Freq', doc: 'Centre frequency in Hz', default: 100.0, min: 1.0, max: 20000.0, step: 1.0 },
      { key: 'res', label: 'Bandwidth', doc: 'Q / bandwidth of the band', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'db', label: 'dB', doc: 'Boost (positive) or cut (negative) in dB', default: 0.6, min: -20.0, max: 20.0, step: 0.1 },
    ],
  },
  {
    key: 'distortion',
    name: 'Distortion',
    doc: 'Classic wave-shaping distortion.',
    params: [
      { key: 'distort', label: 'Distort', doc: 'Distortion amount (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'bitcrusher',
    name: 'Bitcrusher',
    doc: 'Reduces bit depth and sample rate for lo-fi, gritty textures.',
    params: [
      { key: 'bits', label: 'Bits', doc: 'Bit depth (1–24)', default: 8, min: 1, max: 24, step: 1 },
      { key: 'sample_rate', label: 'Sample Rate', doc: 'Downsampled rate in Hz', default: 10000, min: 100, max: 192000, step: 100 },
    ],
  },
  {
    key: 'krush',
    name: 'Krush',
    doc: 'Bitcrunching distortion with a low-pass filter.',
    params: [
      { key: 'gain', label: 'Gain', doc: 'Drive/gain amount', default: 5.0, min: 1.0, max: 1000.0, step: 1.0 },
      { key: 'cutoff', label: 'Cutoff', doc: 'Post-distortion filter cutoff (MIDI note)', default: 100, min: 0, max: 130, step: 1 },
    ],
  },
  {
    key: 'compressor',
    name: 'Compressor',
    doc: 'Dynamic range compressor — tames peaks and glues sounds together.',
    params: [
      { key: 'threshold', label: 'Threshold', doc: 'Level above which compression begins (0–1)', default: 0.2, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'clamp_time', label: 'Attack', doc: 'Attack time in seconds', default: 0.01, min: 0.0, max: 1.0, step: 0.001 },
      { key: 'relax_time', label: 'Release', doc: 'Release time in seconds', default: 0.01, min: 0.0, max: 1.0, step: 0.001 },
      { key: 'slope_above', label: 'Slope Above', doc: 'Compression ratio above threshold', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'vowel',
    name: 'Vowel',
    doc: 'Formant filter that shapes the signal into vowel sounds.',
    params: [
      { key: 'vowel_sound', label: 'Vowel', doc: '0=a, 1=e, 2=i, 3=o, 4=u', default: 0, min: 0, max: 4, step: 1 },
      { key: 'voice', label: 'Voice', doc: '0=soprano, 1=mezzo, 2=counter, 3=tenor, 4=bass', default: 0, min: 0, max: 4, step: 1 },
    ],
  },
  {
    key: 'pitch_shift',
    name: 'Pitch Shift',
    doc: 'Shifts the pitch of the signal by a number of semitones.',
    params: [
      { key: 'pitch', label: 'Pitch', doc: 'Pitch shift in semitones (−72–72)', default: 0, min: -72, max: 72, step: 1 },
      { key: 'pitch_dis', label: 'Pitch Dispersion', doc: 'Random pitch dispersion amount', default: 0.0, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'time_dis', label: 'Time Dispersion', doc: 'Random time dispersion amount', default: 0.0, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'whammy',
    name: 'Whammy',
    doc: 'Pitch shifter modelled after a whammy pedal.',
    params: [
      { key: 'transpose', label: 'Transpose', doc: 'Pitch shift in semitones (−12–12)', default: 0, min: -12, max: 12, step: 1 },
    ],
  },
  {
    key: 'ring_mod',
    name: 'Ring Modulator',
    doc: 'Multiplies the signal with a sine wave to create metallic, bell-like textures.',
    params: [
      { key: 'freq', label: 'Freq', doc: 'Carrier frequency in Hz', default: 30.0, min: 0.0, max: 20000.0, step: 1.0 },
    ],
  },
  {
    key: 'normaliser',
    name: 'Normaliser',
    doc: 'Hard limiter that normalises audio to a target level.',
    params: [
      { key: 'level', label: 'Level', doc: 'Target normalisation level (0–1)', default: 1.0, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'panslicer',
    name: 'Pan Slicer',
    doc: 'Like Slicer but alternates the signal between left and right channels.',
    params: [
      { key: 'phase', label: 'Phase', doc: 'Modulation cycle length in beats', default: 0.25, min: 0.01, max: 4.0, step: 0.01 },
      { key: 'pulse_width', label: 'Pulse Width', doc: 'Width of each panned cycle (0–1)', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'smooth', label: 'Smooth', doc: 'Smoothing at panning edges', default: 0.0, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'wave', label: 'Wave', doc: 'LFO shape: 0=saw, 1=pulse, 2=tri, 3=sine', default: 1, min: 0, max: 3, step: 1 },
    ],
  },
  {
    key: 'level',
    name: 'Level',
    doc: 'Simple volume control — no extra params beyond amp/mix.',
    params: [],
  },
  {
    key: 'pan',
    name: 'Pan',
    doc: 'Positions the signal in the stereo field.',
    params: [
      { key: 'pan', label: 'Pan', doc: 'Stereo position (−1=left, 0=centre, 1=right)', default: 0.0, min: -1.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'tanh',
    name: 'Tanh',
    doc: 'Hyperbolic tangent soft-clipper — adds warmth and saturation.',
    params: [
      { key: 'krunch', label: 'Krunch', doc: 'Saturation drive amount', default: 5.0, min: 0.0, max: 1000.0, step: 1.0 },
    ],
  },
  {
    key: 'octaver',
    name: 'Octaver',
    doc: 'Blends the dry signal with octave-up and octave-down copies.',
    params: [
      { key: 'super_amp', label: 'Super (Oct Up)', doc: 'Level of octave-up signal', default: 1.0, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'sub_amp', label: 'Sub (Oct Down)', doc: 'Level of octave-down signal', default: 1.0, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'subsub_amp', label: 'Sub-sub (2 Oct Down)', doc: 'Level of two-octaves-down signal', default: 1.0, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
  {
    key: 'flanger',
    name: 'Flanger',
    doc: 'Comb-filtering effect using a short, swept delay — classic jet-plane sound.',
    params: [
      { key: 'phase', label: 'Phase', doc: 'LFO period in beats', default: 4.0, min: 0.01, max: 4.0, step: 0.01 },
      { key: 'phase_offset', label: 'Phase Offset', doc: 'LFO phase start offset (0–1)', default: 0.0, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'depth', label: 'Depth', doc: 'Depth of the sweep', default: 0.5, min: 0.0, max: 1.0, step: 0.01 },
      { key: 'decay', label: 'Decay', doc: 'Feedback decay time', default: 2.0, min: 0.0, max: 100.0, step: 0.1 },
      { key: 'feedback', label: 'Feedback', doc: 'Feedback amount (0–1)', default: 0.0, min: 0.0, max: 1.0, step: 0.01 },
    ],
  },
]

export type FxPreviewSample = {
  label: string
  value: string
}

// Curated samples that showcase FX well across different sonic textures.
// All files must exist in public/samples/ as .flac
export const FX_PREVIEW_SAMPLES: FxPreviewSample[] = [
  { label: 'Amen Break', value: 'loop_amen' },
  { label: 'Breakbeat', value: 'loop_breakbeat' },
  { label: 'Industrial Loop', value: 'loop_industrial' },
  { label: 'Tabla Loop', value: 'loop_tabla' },
  { label: 'Bass Hit C', value: 'bass_hit_c' },
  { label: 'Bass Thick C', value: 'bass_thick_c' },
  { label: 'Glitch Bass G', value: 'glitch_bass_g' },
  { label: 'BD Haus', value: 'bd_haus' },
  { label: 'Snare Dub', value: 'sn_dub' },
  { label: 'Cymbal Open', value: 'drum_cymbal_open' },
  { label: 'Ambi Piano', value: 'ambi_piano' },
  { label: 'Ambi Choir', value: 'ambi_choir' },
  { label: 'Ambi Dark Woosh', value: 'ambi_dark_woosh' },
  { label: 'Misc Cineboom', value: 'misc_cineboom' },
]
