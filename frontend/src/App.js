import React, { useState } from 'react';

import TopMenu from './components/TopMenu';
import LandingPage from './components/LandingPage';
import GameSession from './components/GameSession';

function App(props) {
  const [currentScreen, setCurrentScreen] = useState('LandingPage');

  const renderMainSection = () => {
    let toRender;

    if (currentScreen === 'LandingPage') {
      toRender = <LandingPage setCurrentScreen={setCurrentScreen} />;
    } else if (currentScreen === 'GameSession') {
      toRender = <GameSession setCurrentScreen={setCurrentScreen} />;
    } else {
      toRender = <div>Error</div>;
    }

    return toRender;
  }

  return (
    <div>
      <TopMenu setCurrentScreen={setCurrentScreen} />
      {renderMainSection()}
    </div>
  );
}

export default App;
