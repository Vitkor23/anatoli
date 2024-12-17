import React from 'react';
import ReactDOM from 'react-dom/client';  // Импортируй правильный модуль для React 18
import './index.css';  // Для глобальных стилей
import App from './App';  // Импорт главного компонента

// Используем createRoot для React 18:
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
