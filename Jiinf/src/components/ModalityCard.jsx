import { useState } from 'react';

export function ModalityCard({ name, description, imgSrc }) {
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  imgSrc = 'https://th.bing.com/th/id/OIP.ELzBEevVy38sKTNCERiTZQHaFL?rs=1&pid=ImgDetMain';

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setMousePosition({ x: 0, y: 0 }); // Reseta a posição do card
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 40; // Ajusta a intensidade do efeito X
    const y = ((e.clientY - top) / height - 0.5) * 40; // Ajusta a intensidade do efeito Y
    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative aspect-[9/13] w-80 overflow-hidden bg-jiinf-lightskin border-jiinf-secondary border-2 rounded-lg"
      style={{
        //backgroundImage: `url(${imgSrc})`,
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
        <h3 className="text-2xl font-bold pb-4 mb-2">{name}</h3>
        <p className="text-lg pb-4 mb-4">
          {description}
        </p>
        <div className="flex items-center space-x-2">
          <img src={imgSrc} alt="Ícone do Esporte" className="w-12 h-12 rounded-full border-2 border-white" />
          <span className="pl-4 text-sm">{name}</span>
        </div>
      </div>
    </div>
  );
}
