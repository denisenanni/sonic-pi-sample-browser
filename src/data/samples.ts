export type SampleCategory =
  | 'ambi'
  | 'arovane'
  | 'bass'
  | 'bd'
  | 'drum'
  | 'elec'
  | 'glitch'
  | 'guit'
  | 'hat'
  | 'loop'
  | 'mehackit'
  | 'misc'
  | 'perc'
  | 'ride'
  | 'sn'
  | 'tabla'
  | 'tbd'
  | 'vinyl';

export interface Sample {
  name: string;
  category: SampleCategory;
}

export interface SampleGroup {
  category: SampleCategory;
  samples: Sample[];
}

const makeSamples = (category: SampleCategory, names: string[]): Sample[] =>
  names.map((name) => ({ name, category }));

export const SAMPLE_GROUPS: SampleGroup[] = [
  {
    category: 'ambi',
    samples: makeSamples('ambi', [
      'ambi_soft_buzz',
      'ambi_swoosh',
      'ambi_drone',
      'ambi_glass_hum',
      'ambi_glass_rub',
      'ambi_haunted_hum',
      'ambi_piano',
      'ambi_lunar_land',
      'ambi_dark_woosh',
      'ambi_choir',
      'ambi_sauna',
    ]),
  },
  {
    category: 'arovane',
    samples: makeSamples('arovane', [
      'arovane_beat_a',
      'arovane_beat_b',
      'arovane_beat_c',
      'arovane_beat_d',
      'arovane_beat_e',
    ]),
  },
  {
    category: 'bass',
    samples: makeSamples('bass', [
      'bass_hit_c',
      'bass_hard_c',
      'bass_thick_c',
      'bass_trance_c',
      'bass_drop_c',
      'bass_woodsy_c',
      'bass_voxy_c',
      'bass_voxy_hit_c',
      'bass_dnb_f',
    ]),
  },
  {
    category: 'bd',
    samples: makeSamples('bd', [
      'bd_pure',
      'bd_808',
      'bd_zum',
      'bd_gas',
      'bd_sone',
      'bd_haus',
      'bd_zome',
      'bd_boom',
      'bd_klub',
      'bd_fat',
      'bd_tek',
      'bd_ada',
      'bd_mehackit',
      'bd_chip',
      'bd_jazz',
    ]),
  },
  {
    category: 'drum',
    samples: makeSamples('drum', [
      'drum_heavy_kick',
      'drum_tom_mid_soft',
      'drum_tom_mid_hard',
      'drum_tom_lo_soft',
      'drum_tom_lo_hard',
      'drum_tom_hi_soft',
      'drum_tom_hi_hard',
      'drum_splash_soft',
      'drum_splash_hard',
      'drum_snare_soft',
      'drum_snare_hard',
      'drum_cymbal_soft',
      'drum_cymbal_hard',
      'drum_cymbal_open',
      'drum_cymbal_closed',
      'drum_cymbal_pedal',
      'drum_bass_soft',
      'drum_bass_hard',
      'drum_cowbell',
      'drum_roll',
    ]),
  },
  {
    category: 'elec',
    samples: makeSamples('elec', [
      'elec_triangle',
      'elec_snare',
      'elec_lo_snare',
      'elec_hi_snare',
      'elec_mid_snare',
      'elec_cymbal',
      'elec_soft_kick',
      'elec_filt_snare',
      'elec_fuzz_tom',
      'elec_chime',
      'elec_bong',
      'elec_twang',
      'elec_wood',
      'elec_pop',
      'elec_beep',
      'elec_blip',
      'elec_blip2',
      'elec_ping',
      'elec_bell',
      'elec_flip',
      'elec_tick',
      'elec_hollow_kick',
      'elec_twip',
      'elec_plip',
      'elec_blup',
    ]),
  },
  {
    category: 'glitch',
    samples: makeSamples('glitch', [
      'glitch_bass_g',
      'glitch_perc1',
      'glitch_perc2',
      'glitch_perc3',
      'glitch_perc4',
      'glitch_perc5',
      'glitch_robot1',
      'glitch_robot2',
    ]),
  },
  {
    category: 'guit',
    samples: makeSamples('guit', [
      'guit_harmonics',
      'guit_e_fifths',
      'guit_e_slide',
      'guit_em9',
    ]),
  },
  {
    category: 'hat',
    samples: makeSamples('hat', [
      'hat_bdu',
      'hat_cab',
      'hat_cats',
      'hat_gem',
      'hat_gnu',
      'hat_gump',
      'hat_hier',
      'hat_len',
      'hat_mess',
      'hat_metal',
      'hat_noiz',
      'hat_psych',
      'hat_raw',
      'hat_sci',
      'hat_snap',
      'hat_star',
      'hat_tap',
      'hat_yosh',
      'hat_zan',
      'hat_zap',
      'hat_zild',
    ]),
  },
  {
    category: 'loop',
    samples: makeSamples('loop', [
      'loop_industrial',
      'loop_compus',
      'loop_amen',
      'loop_amen_full',
      'loop_garzul',
      'loop_mika',
      'loop_breakbeat',
      'loop_safari',
      'loop_tabla',
      'loop_3d_printer',
      'loop_drone_g_97',
      'loop_electric',
      'loop_mehackit1',
      'loop_mehackit2',
      'loop_perc1',
      'loop_perc2',
      'loop_weirdo',
    ]),
  },
  {
    category: 'mehackit',
    samples: makeSamples('mehackit', [
      'mehackit_phone1',
      'mehackit_phone2',
      'mehackit_phone3',
      'mehackit_phone4',
      'mehackit_robot1',
      'mehackit_robot2',
      'mehackit_robot3',
      'mehackit_robot4',
      'mehackit_robot5',
      'mehackit_robot6',
      'mehackit_robot7',
    ]),
  },
  {
    category: 'misc',
    samples: makeSamples('misc', [
      'misc_burp',
      'misc_crow',
      'misc_cineboom',
    ]),
  },
  {
    category: 'perc',
    samples: makeSamples('perc', [
      'perc_bell',
      'perc_bell2',
      'perc_snap',
      'perc_snap2',
      'perc_swash',
      'perc_till',
      'perc_door',
      'perc_impact1',
      'perc_impact2',
      'perc_swoosh',
    ]),
  },
  {
    category: 'ride',
    samples: makeSamples('ride', [
      'ride_tri',
      'ride_via',
    ]),
  },
  {
    category: 'sn',
    samples: makeSamples('sn', [
      'sn_dub',
      'sn_dolf',
      'sn_zome',
      'sn_generic',
    ]),
  },
  {
    category: 'tabla',
    samples: makeSamples('tabla', [
      'tabla_tas1',
      'tabla_tas2',
      'tabla_tas3',
      'tabla_ke1',
      'tabla_ke2',
      'tabla_ke3',
      'tabla_na',
      'tabla_na_o',
      'tabla_tun1',
      'tabla_tun2',
      'tabla_tun3',
      'tabla_te1',
      'tabla_te2',
      'tabla_te_ne',
      'tabla_te_m',
      'tabla_ghe1',
      'tabla_ghe2',
      'tabla_ghe3',
      'tabla_ghe4',
      'tabla_ghe5',
      'tabla_ghe6',
      'tabla_ghe7',
      'tabla_ghe8',
      'tabla_dhec',
      'tabla_na_s',
      'tabla_re',
    ]),
  },
  {
    category: 'tbd',
    samples: makeSamples('tbd', [
      'tbd_fxbed_loop',
      'tbd_highkey_c4',
      'tbd_pad_1',
      'tbd_pad_2',
      'tbd_pad_3',
      'tbd_pad_4',
      'tbd_perc_blip',
      'tbd_perc_hat',
      'tbd_perc_tap_1',
      'tbd_perc_tap_2',
      'tbd_voctone',
    ]),
  },
  {
    category: 'vinyl',
    samples: makeSamples('vinyl', [
      'vinyl_backspin',
      'vinyl_rewind',
      'vinyl_scratch',
      'vinyl_hiss',
    ]),
  },
];

export const ALL_SAMPLES: Sample[] = SAMPLE_GROUPS.flatMap((g) => g.samples);
