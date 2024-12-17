import React, { useState } from 'react';
import './images/MainScreen.css'; // Для стилизации

const MainScreen = ({ onStartGame }) => {
  const [names, setNames] = useState([]);
  const allNames = ['@ai_Devian', '@ipubber', '@phoenix99999999']; // Заданные имена

  // Функция для генерирования случайных имен
  const generateRandomNames = () => {
    const additionalNames = [
     
      
    ];

    // Получаем случайные 5 имен (включая заданные)
    const randomNames = [
      ...allNames,
      ...additionalNames.sort(() => Math.random() - 0.5).slice(0, 2),
    ];

    setNames(randomNames); // Обновляем список имен
  };

  // Открытие алерта и генерация имен
  const handleRoll = () => {
    const shouldRoll = window.confirm(
      'Хотите подкрутить Девиану или @ipubber?'
    );
    if (shouldRoll) {
      generateRandomNames();
    }
  };

  return (
    <div className="main-screen">
      <div className="overlay">
        <h1>Пробей Анатолия от Pragmatic Play</h1>
        <button className="start-button" onClick={onStartGame}>
          Начать игру
        </button>

        <div className="roll-container">
          <button className="roll-button" onClick={handleRoll}>
            Рольнуть Розыгрыш
          </button>
        </div>

        {names.length > 0 && (
          <div className="names-list">
            <h2>Список имен:</h2>
            <ul>
              {names.map((name, index) => (
                <li style={{ color: 'GOLD' }} key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainScreen;
