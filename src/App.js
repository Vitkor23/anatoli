import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './MainScreen';
import SlotScreen from './SlotScreen';
import BarkScreen from './BarkScreen'; // Новый компонент

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={gameStarted ? <SlotScreen /> : <MainScreen onStartGame={startGame} />} />
          <Route path="/bark" element={<BarkScreen />} /> {/* Новый маршрут */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
