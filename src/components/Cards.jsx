import { useState, useEffect } from 'react';

const ModalityCard = ({ name, description, imgSrc }) => {
  const [clicked, setClicked] = useState(false);
  const [colorInterval, setColorInterval] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.3)');

  const colorsChange = [
    'rgba(0, 153, 0, 1)', // Green
    'rgba(0, 68, 250, 1)', // Blue
    'rgba(255, 255, 0, 1)', // Yellow
    'rgba(255, 128, 0, 1)', // Orange
    'rgba(127, 0, 255, 1)', // Purple
  ];

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  //Function to change color effect
  const colorChange = () => {
    if (clicked) {
      const randomColor = colorsChange[Math.floor(Math.random() * colorsChange.length)];
      setShadowColor(randomColor);

      const interval = setInterval(() => {
        const randomColor = colorsChange[Math.floor(Math.random() * colorsChange.length)];
        setShadowColor(randomColor);
      }, 500); // Color change interval
      setColorInterval(interval);
    } else {
      setShadowColor('rgba(0, 0, 0, 0.3)'); // Set standard shadow
      setIsHovered(false);
      clearInterval(colorInterval); // Clean interval when clicked again
    }
  };

  useEffect(() => {
    colorChange();
    return () => clearInterval(colorInterval); // Clean interval when disassemble
  }, [clicked]);

  return (
    <div
      className={`relative aspect-[6/9] w-72 bg-jiinf-lightskin border-jiinf-primary border-4 rounded-xl cursor-pointer transition-transform duration-200 select-none flex flex-col items-center justify-start
        ${isHovered || clicked ? 'transform scale-105' : ''}
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: `0 0px 8px ${shadowColor}`,
        transition: 'transform 0.5s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="flex flex-col p-4 text-jiinf-labels">
        <div className='flex flex-col items-center gap-4'>
          <img src={imgSrc} alt="Ícone do Esporte" className="w-32 h-32 rounded-full border-2 border-black" />
          <h3 className="text-4xl font-SuperDario text-center">{name.toUpperCase()}</h3>
        </div>
        <p className="text-lg mt-8 font-semibold text-center">{description}</p>
      </div>
    </div>
  );  
};

const TeamCard = ({ title, description, imageSrc }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0)');

  //Called function when card is clicked, to start a random 3d animation
  const startRandomAnimation = () => {
    const randomX = Math.random() * 360 - 180;
    const randomY = Math.random() * 360 - 180;
    setVelocity({ x: randomX, y: randomY });
    setIsAnimating(true);
  };

  useEffect(() => {
    let interval;

    //Function to desacelere the card
    if (isAnimating) {
      interval = setInterval(() => {
        setRotation((prev) => ({
          x: prev.x + velocity.y * 0.1,
          y: prev.y + velocity.x * 0.1,
        }));

        setVelocity((prev) => ({
          x: prev.x * 0.95,
          y: prev.y * 0.95,
        }));

        if (Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
          clearInterval(interval);
          setIsAnimating(false);
          resetRotation();
        }
      }, 16);
    }

    return () => clearInterval(interval);
  }, [isAnimating, velocity]);

  //Normalize position card function
  const resetRotation = () => {
    const interval = setInterval(() => {
      setRotation((prev) => {
        const newX = prev.x * 0.9;
        const newY = prev.y * 0.9;

        if (Math.abs(newX) < 0.1 && Math.abs(newY) < 0.1) {
          clearInterval(interval);
          return { x: 0, y: 0 };
        }

        return { x: newX, y: newY };
      });
    }, 16);
  };

  return (
    <div
      className={`relative w-60 bg-jiinf-primary rounded-xl shadow-md overflow-hidden m-4 text-white
        cursor-pointer transition-transform duration-200 select-none`}
      onMouseEnter={() => {
        setShadowColor('rgba(0, 68, 250, 1)');
      }}
      onMouseLeave={() => {
        setShadowColor('rgba(0, 0, 0, 0)');
      }}
      onClick={startRandomAnimation}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        boxShadow: `5px 5px ${shadowColor}`,
        transition: isAnimating ? 'none' : 'transform 0.3s ease, box-shadow 0.3s ease',
        perspective: '1000px',
      }}
    >
      <div className="p-4">
        <h2 className="text-4xl font-SuperDario mb-2 text-center pb-4">{title.toUpperCase()}</h2>
        <div className="flex justify-center pb-4">
          <img
            className="rounded-full ring-2 ring-white h-36 w-36"
            src={imageSrc}
            alt={title}
          />
        </div>
        <p className="mt-4 font-semibold text-sm text-center mb-2">{description}</p>
      </div>
    </div>
  );
};

export { ModalityCard, TeamCard };
