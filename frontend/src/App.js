import React, { Component } from 'react';

import LandingPage from './components/LandingPage';
import GameSession from './components/GameSession';

class App extends Component {
  render() {
    return (
      <div>
        <LandingPage />
        <GameSession />
      </div>
    );
  }
}

export default App;

// <TopMenu />
// <Footer />
