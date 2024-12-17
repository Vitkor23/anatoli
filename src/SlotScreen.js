import './SlotScreen.css';
import Reel from './Reel'; // Импортируем Reel
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Используем Link для перехода

// Импорт изображений
import img1 from '../src/images/img/imag1.jpg';
import img2 from '../src/images/img/img2.jpg';
import img3 from '../src/images/img/img3.jpg';
import img4 from '../src/images/img/img4.jpg';
import img5 from '../src/images/img/img5.jpg';
import imgwild from '../src/images/img/imgwild.jpg';

// Массив с изображениями
const images = [img1, img2, img3, img4, img5, imgwild];

const SlotScreen = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState([[], [], []]);
  const [balance, setBalance] = useState(500); // Начальный баланс
  const [bet, setBet] = useState(1); // Начальная ставка
  const [message, setMessage] = useState(''); // Сообщение для отображения
  const [highlightedLines, setHighlightedLines] = useState([]); // Линии, которые выиграли
  const [spinCount, setSpinCount] = useState(0); // Счётчик прокрутов
  const [probHit, setProbHit] = useState(0); // Счётчик прокрутов для Пробить Анатолия

  const location = useLocation(); // Хук для получения текущего пути

  // Функция для вращения слота
  const handleSpin = () => {
    if (balance < bet) {
      alert('Недостаточно монет!');
      return;
    }

    setIsSpinning(true);
    setResults([[], [], []]); // Очищаем старые результаты
    setBalance((prev) => prev - bet); // Вычитаем ставку
    setMessage(''); // Скрываем сообщение перед вращением
    setHighlightedLines([]); // Очищаем подсветку линий

    // Задержка для имитации вращения
    setTimeout(() => {
      setIsSpinning(false);
      generateResults();
    }, 3000); // Вращение длится 3 секунды

    // Увеличиваем счётчик прокрутов
    setSpinCount((prev) => prev + 1);

    // Каждые 10 прокрутов увеличиваем счётчик Пробить Анатолия
    if ((spinCount + 2) % 10 === 0) {
      setProbHit((prev) => prev + 1);
    }
  };

  // Генерация случайных результатов для барабанов
  const generateResults = () => {
    const newResults = [
      [getRandomImage(), getRandomImage(), getRandomImage()],
      [getRandomImage(), getRandomImage(), getRandomImage()],
      [getRandomImage(), getRandomImage(), getRandomImage()],
    ];
    setResults(newResults);
    checkWin(newResults); // Проверка на выигрыш
  };

  // Получение случайного изображения для барабана
  const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

  // Проверка на выигрыш
  const checkWin = (newResults) => {
    let totalWinnings = 0;
    const newHighlightedLines = [];

    // Проверка для горизонтальных линий
    for (let i = 0; i < 3; i++) {
      // Собираем картинки из каждой линии
      const line = [newResults[0][i], newResults[1][i], newResults[2][i]]; 

      // Проверяем на совпадение
      const wildCount = line.filter((symbol) => symbol === imgwild).length;
      const nonWildSymbols = line.filter((symbol) => symbol !== imgwild);

      // Если все 3 картинки одинаковые или два одинаковых и один Wild
      if (
        (line[0] === line[1] && line[0] === line[2]) || 
        (wildCount === 1 && nonWildSymbols.length === 1 && nonWildSymbols[0] === line[0]) ||
        (wildCount === 2 && nonWildSymbols.length === 1)
      ) {
        const winnings = bet * 10; // Умножаем ставку на 10, если выиграли
        totalWinnings += winnings;
        newHighlightedLines.push(i); // Добавляем выигравшую линию
      }
    }

    // Если был выигрыш, обновляем баланс и показываем сообщение
    if (totalWinnings > 0) {
      setBalance((prev) => prev + totalWinnings);
      setMessage(`Поздравляем! Вы выиграли ${totalWinnings} монет.`);
    } else {
      setMessage('Попробуйте ещё раз!');
    }

    // Обновляем линии, которые выиграли
    setHighlightedLines(newHighlightedLines);
  };

  // Увеличение ставки
  const increaseBet = () => {
    if (bet < balance) {
      setBet((prevBet) => prevBet + 1);
    }
  };

  // Уменьшение ставки
  const decreaseBet = () => {
    if (bet > 1) {
      setBet((prevBet) => prevBet - 1);
    }
  };

  // Функция для перехода на страницу с "гавкой"
  const handleBarkRedirect = () => {
    if (probHit > 0) {
      window.location.href = '/bark'; // Переход на страницу с гавкой
    }
  };

  return (
    <div className="slot-screen">
      <h1>Слот-машина 🎰</h1>

      <div className="balance-container">
        <div className="balance">Баланс: {balance} монет</div>
        <div className="bet-container">
          <button onClick={decreaseBet} disabled={isSpinning}>
            &#8592;
          </button>
          <div className="bet">Ставка: {bet}</div>
          <button onClick={increaseBet} disabled={isSpinning}>
            &#8594;
          </button>
        </div>
      </div>

      <div className="reels-container">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <Reel
              key={index}
              isSpinning={isSpinning}
              images={images}
              highlighted={highlightedLines.includes(index)}
              onStop={(finalImages) => {
                const newResults = [...results];
                newResults[index] = finalImages;
                setResults(newResults);
              }}
            />
          ))}
      </div>

      <button onClick={handleSpin} disabled={isSpinning} className="spin-button">
        {isSpinning ? 'Вращение...' : 'Прокрутить'}
      </button>

      <div className="message">{message}</div>

      <div className="probhit-container">
        <button
          className="probhit-button"
          disabled={isSpinning}
          onClick={handleBarkRedirect}
        >
          Пробить Анатолия ({probHit})
        </button>
      </div>

      {/* Если probHit > 0, перенаправляем на новую страницу с помощью Link */}
      {probHit > 0 && <Link to="/bark" />}
    </div>
  );
};

export default SlotScreen;
