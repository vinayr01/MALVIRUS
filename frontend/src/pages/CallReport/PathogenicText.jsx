function isPathogenic(impact) {
  if (impact == 'HIGH') {
    return 'Pathogenic';
  } else if (impact == 'MODERATE') {
    return 'Likely Pathogenic';
  }

  return 'Not Pathogenic';
}

function PathogenicText({ effects }) {
  if (!effects) return 'None';
  const pathogenicText = [
    ...new Set(
      effects
        .filter((effect) => effect['Annotation Impact'] !== 'MODIFIER')
        .map((effect) => effect['Annotation Impact'])
        .map((impact) => isPathogenic(impact))
    ),
  ].join(', ');
  return <p>{pathogenicText}</p>;
}

export default PathogenicText;
