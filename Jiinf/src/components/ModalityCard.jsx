import { useState } from 'react';

export function ModalityCard({ name, description, imgSrc }) {

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
        className="absolute inset-0 flex flex-col justify-end p-4 text-jiinf-labels bg-opacity-50 rounded-lg"
        style={{
          transform: hovered ? `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)` : 'none',
          transition: 'transform 0.05s ease-in-out',
        }}
      >
        <div className="flex h-full justify-center mt-4 mb-4">
          <img src={imgSrc} alt="Ícone do Esporte" className="w-36 h-36 rounded-full border-2 border-black" />
        </div>
        <h3 className="text-5xl font-SuperDario pb-4 mb-2 text-center">{name.toUpperCase()}</h3>
        <p className="text-lg pb-4 mb-4 font-semibold text-center">
          {description}
        </p>
      </div>
    </div>
  );
  
}
