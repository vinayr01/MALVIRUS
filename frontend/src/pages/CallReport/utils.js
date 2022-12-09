export const ANN_FIELDS = [
  'Allele',
  'Annotation',
  'Annotation Impact',
  'Gene Name',
  'Gene ID',
  'Feature Type',
  'Feature ID',
  'Transcript BioType',
  'Rank',
  'HGVS.c',
  'HGVS.p',
  'cDNA.pos',
  'CDS.pos',
  'AA.pos',
  'Distance',
  'ERRORS',
];

export const PATHOGENIC = [
  'upstream',
  'utr_5_prime',
  'utr_5_deleted',
  'start_gained',
  'cds',
  'gene',
  'transcript',
  'exon',
];

export const LIKELY_PATHOGENIC = [
  'exon_deleted',
  'non_synonymous_coding',
  'frame_shift',
  'codon_change',
  'codon_insertion',
  'codon_change_plus_codon_insertion',
  'codon_deletion',
  'codon_change_plus_codon_deletion',
  'stop_lost',
];

export const NON_PATHOGENIC = [
  'intergenic',
  'splice_site_acceptor',
  'splice_site_donor',
  'start_lost',
  'synonymous_start',
  'synonymous_coding',
  'stop_gained',
  'synonymous_stop',
  'intron',
  'utr_3_prime',
  'utr_3_deleted',
  'downstream',
  'intron_conserved',
  'intergenic_conserved',
];
