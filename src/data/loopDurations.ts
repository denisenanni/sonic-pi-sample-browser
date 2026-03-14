// Durations measured from the actual FLAC files in public/samples/ using afinfo.
// `beats` is the canonical beat count — best estimate based on known BPM or
// round-number duration (e.g. loop_drone_g_97 at 4.948s × 8 beats = exactly 97 BPM).
// `originalBpm` is always derived live as (beats × 60) / duration — it is not stored
// here so the UI can recompute it dynamically when the user changes the beats override.

export type LoopInfo = {
  name: string      // Sonic Pi sample name e.g. "loop_amen"
  duration: number  // Original duration in seconds (measured)
  beats: number     // Canonical beat count (best estimate)
}

export const LOOP_DURATIONS: Record<string, LoopInfo> = {
  loop_amen:          { name: 'loop_amen',          duration: 1.753, beats: 4 },  // ~137 BPM (classic Amen break)
  loop_amen_full:     { name: 'loop_amen_full',     duration: 6.857, beats: 16 }, // ~140 BPM (extended Amen)
  loop_breakbeat:     { name: 'loop_breakbeat',     duration: 1.905, beats: 4 },  // ~126 BPM
  loop_compus:        { name: 'loop_compus',        duration: 6.486, beats: 8 },  // ~74 BPM
  loop_drone_g_97:    { name: 'loop_drone_g_97',    duration: 4.948, beats: 8 },  // exactly 97 BPM (name confirms)
  loop_electric:      { name: 'loop_electric',      duration: 2.474, beats: 4 },  // ~97 BPM
  loop_garzul:        { name: 'loop_garzul',        duration: 8.000, beats: 8 },  // 60 BPM
  loop_industrial:    { name: 'loop_industrial',    duration: 0.884, beats: 2 },  // ~136 BPM
  loop_mehackit1:     { name: 'loop_mehackit1',     duration: 2.474, beats: 4 },  // ~97 BPM
  loop_mehackit2:     { name: 'loop_mehackit2',     duration: 2.474, beats: 4 },  // ~97 BPM
  loop_mika:          { name: 'loop_mika',          duration: 8.000, beats: 8 },  // 60 BPM
  loop_perc1:         { name: 'loop_perc1',         duration: 2.474, beats: 4 },  // ~97 BPM
  loop_perc2:         { name: 'loop_perc2',         duration: 2.474, beats: 4 },  // ~97 BPM
  loop_safari:        { name: 'loop_safari',        duration: 8.005, beats: 8 },  // ~60 BPM
  loop_tabla:         { name: 'loop_tabla',         duration: 10.674, beats: 8 }, // ~45 BPM
  loop_weirdo:        { name: 'loop_weirdo',        duration: 4.948, beats: 8 },  // ~97 BPM
  loop_3d_printer:    { name: 'loop_3d_printer',    duration: 7.959, beats: 8 },  // ~60 BPM
}

export const ALL_LOOPS: LoopInfo[] = Object.values(LOOP_DURATIONS)
