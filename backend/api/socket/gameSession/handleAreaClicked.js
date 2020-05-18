import handleUpdateGameSession from '../handleUpdateGameSession.js';

export default function handleAreaClicked(
  gameSessionState,
  handleUpdateGameSession,
  socket
) {
  const {
    resources,
    setResources,
    gameHistory,
    setGameHistory
  } = gameSessionState;

  const updatedResources = resources + 1;
  setResources(updatedResources);

  const newHistory = {...gameHistory};
  newHistory.resources = gameHistory.resources + 1;
  newHistory.clicks = gameHistory.clicks + 1;
  setGameHistory(newHistory);

  handleUpdateGameSession();
}
