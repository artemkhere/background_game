export default function determineAvailability(requirements, gameHistory) {
  if (Object.keys(requirements).length === 0) { return true; }

  const requirementsList = [];

  if (requirements.purchased) {
    requirements.purchased.forEach((requirement) => {
      requirementsList.push(!!gameHistory.harvest.purchased.find(({ name }) => {
        return name === requirement;
      }));
    });
  }

  return !requirementsList.includes(false);
}
