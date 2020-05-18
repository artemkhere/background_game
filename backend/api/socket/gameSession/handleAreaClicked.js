export default function handleAreaClicked(
  gameSessionState,
  handleUpdateGameSession,
  socket
) {
  const {
    getResources,
    setResources,
    gameHistory,
    setGameHistory
  } = gameSessionState;

  const updatedResources = getResources() + 1;
  setResources(updatedResources);

  const newHistory = {...gameHistory};
  newHistory.resources = gameHistory.resources + 1;
  newHistory.clicks = gameHistory.clicks + 1;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
