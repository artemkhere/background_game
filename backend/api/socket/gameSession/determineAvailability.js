export default function determineAvailability(requirements, gameHistory) {
  if (Object.keys(requirements).length === 0) { return true; }

  let available = false;

  if (requirements.purchased) {
    requirements.purchased.forEach((requirement) => {
      available = !!gameHistory.purchased.find(({ name }) => {
        return name === requirement;
      });
    });
  }

  return available;
}
