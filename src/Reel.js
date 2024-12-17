import React, { useState, useEffect, useRef } from 'react';

const Reel = ({ isSpinning, images, highlighted, onStop }) => {
  const [currentImages, setCurrentImages] = useState([images[0], images[1], images[2]]);
  const isSpinningRef = useRef(isSpinning);

  useEffect(() => {
    isSpinningRef.current = isSpinning;
  }, [isSpinning]);

  useEffect(() => {
    let interval;

    if (isSpinning) {
      interval = setInterval(() => {
        setCurrentImages([
          images[Math.floor(Math.random() * images.length)],
          images[Math.floor(Math.random() * images.length)],
          images[Math.floor(Math.random() * images.length)],
        ]);
      }, 100);
    } else {
      clearInterval(interval);
      const finalImages = [
        images[Math.floor(Math.random() * images.length)],
        images[Math.floor(Math.random() * images.length)],
        images[Math.floor(Math.random() * images.length)],
      ];
      setCurrentImages(finalImages);
      if (onStop && isSpinningRef.current !== isSpinning) {
        onStop(finalImages);
      }
    }

    return () => clearInterval(interval);
  }, [isSpinning, images, onStop]);

  return (
    <div className={`reel ${highlighted ? 'highlight-line' : ''} ${isSpinning ? 'spin-active' : ''}`}>
      {currentImages.map((img, index) => (
        <img key={index} src={img} alt={`Slot symbol ${index}`} />
      ))}
    </div>
  );
};

export default Reel;
