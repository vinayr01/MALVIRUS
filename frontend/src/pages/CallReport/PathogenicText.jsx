import { PATHOGENIC, LIKELY_PATHOGENIC, NON_PATHOGENIC } from './utils';

function isPathogenic(effect) {
  // Format string to same format in pathogenic bins
  effect = effect.toLowerCase();
  if (effect.indexOf(' ') >= 0) {
    effect = effect.replace(/ /g, '_');
  }

  // Check in which pathogenic bin the effect belongs to
  if (PATHOGENIC.includes(effect)) {
    return 'Pathogenic';
  } else if (LIKELY_PATHOGENIC.includes(effect)) {
    return 'Likely Pathogenic';
  } else if (NON_PATHOGENIC.includes(effect)) {
    return 'Not Pathogenic';
  }

  // Should not reach this
  return 'N/A';
}

function PathogenicText({ effects }) {
  if (!effects) return 'None';
  const pathogenicText = [
    ...new Set(
      effects
        .filter((effect) => effect['Annotation Impact'] !== 'MODIFIER')
        .map((effect) => effect['Feature Type'])
        .map((effect) => isPathogenic(effect))
    ),
  ].join(', ');
  return <p>{pathogenicText}</p>;
}

export default PathogenicText;
