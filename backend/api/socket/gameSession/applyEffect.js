export default function applyEffect(currentValue, effect) {
  let newValue = currentValue;
  const { impact, amount } = effect;

  switch (impact) {
    case 'mul':
      newValue = newValue * amount;
      break;
    case 'plus':
      newValue = newValue + amount;
      break;
    default:
      break;
  }

  return newValue;
}
