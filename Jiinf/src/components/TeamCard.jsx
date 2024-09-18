import React from 'react';

const TeamCard = ({ title, description, imageSrc }) => {
  return (
    <div className="justify-center ring-2 ring-white items-center w-60 bg-jiinf-primary rounded-xl shadow-md overflow-hidden m-4 text-white">
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-2 text-center pb-4">{title}</h2>
        <div className="flex justify-center pb-4">
          <img className="rounded-full ring-2 ring-white h-36 w-36" src={imageSrc} alt={title} />
        </div>
        <p className="mt-4 font-semibold text-sm text-center">{description}</p>
      </div>
    </div>
  );
};

export default TeamCard;
