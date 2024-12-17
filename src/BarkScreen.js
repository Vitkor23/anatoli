import React from 'react';
import { useNavigate } from 'react-router-dom'; // Для навигации назад
import barkSound from '../src/images/img/sound.mp3';

const BarkScreen = () => {
  const navigate = useNavigate();

  const playBarkSound = () => {
    const barkAudio = new Audio(barkSound); // Используем импортированный путь
    barkAudio.play(); // Проигрываем звук
  };

  return (
    <div className="bark-screen">
      {/* Размещение GIF на весь экран */}
      <img 
        src="https://2-weld-tau.vercel.app/animation.gif" 
        alt="Dog Bark" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }} 
      />
      
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <button onClick={playBarkSound} className="bark-button">
          Пробить
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => navigate('/')} className="back-button">
          Вернуться назад
        </button>
      </div>
    </div>
  );
};

export default BarkScreen;
