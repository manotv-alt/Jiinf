import { useState, useEffect } from 'react';

const ModalityCard = ({ name, description, imgSrc }) => {

  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  console.log(imgSrc);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 40;
    const y = ((e.clientY - top) / height - 0.5) * 40;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative aspect-[9/13] w-80 overflow-hidden bg-jiinf-lightskin border-jiinf-primary border-4 rounded-lg"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
        transition: 'transform 0.05s ease-in-out',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute flex flex-col justify-start p-4 text-jiinf-labels bg-opacity-50 rounded-lg"
        style={{
          transform: hovered ? `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)` : 'none',
          transition: 'transform 0.05s ease-in-out',
        }}
      >
        <div className='flex flex-col h-full justify-center gap-4 items-center'>
          <div className="flex justify-center">
            <img src={imgSrc} alt="Ícone do Esporte" className="w-36 h-36 rounded-full border-2 border-black" />
          </div>
          <h3 className="text-5xl font-SuperDario text-center">{name.toUpperCase()}</h3>          
        </div>

        <p className="text-lg mt-8 font-semibold text-center">
          {description}
        </p>
      </div>
    </div>
  );
}

const TeamCard = ({ title, description, imageSrc }) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const startRandomAnimation = () => {
    const randomX = Math.random() * 360 - 180; // Rotação aleatória em X
    const randomY = Math.random() * 360 - 180; // Rotação aleatória em Y
    setVelocity({ x: randomX, y: randomY });
    setIsAnimating(true);
  };

  useEffect(() => {
    let interval;

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

        // Para quando a velocidade for muito baixa
        if (Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
          clearInterval(interval);
          setIsAnimating(false);
          resetRotation();
        }
      }, 16); // Aproximadamente 60fps
    }

    return () => clearInterval(interval);
  }, [isAnimating, velocity]);

  const resetRotation = () => {
    const interval = setInterval(() => {
      setRotation((prev) => {
        const newX = prev.x * 0.9; // Diminui a rotação
        const newY = prev.y * 0.9;

        // Para quando a rotação estiver próxima de zero
        if (Math.abs(newX) < 0.1 && Math.abs(newY) < 0.1) {
          clearInterval(interval);
          return { x: 0, y: 0 }; // Define a rotação para zero
        }

        return { x: newX, y: newY };
      });
    }, 16); // Aproximadamente 60fps
  };

  return (
    <div
      className={`justify-center ring-2 ring-white items-center w-60 bg-jiinf-primary rounded-xl shadow-md overflow-hidden m-4 text-white
      cursor-pointer transition-transform duration-200 select-none`}
      onClick={startRandomAnimation}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isAnimating ? 'none' : 'transform 1.5s ease-in-out',
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
        <p className="mt-4 font-semibold text-sm text-center">{description}</p>
      </div>
    </div>
  );
};

export { ModalityCard, TeamCard };
