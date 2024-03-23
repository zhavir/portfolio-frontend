import React from 'react';
import Image from 'next/image';

const Bouble = ({ image, index, x, y, scale, isReady }) => {
  return (
    <div
      className="flex items-center justify-center bubble bg-white rounded-full shadow-xl mr-20 absolute h-40 w-40 ease-in-out duration-150 transition-opacity"
      id={`bubble-${index}`}
      style={{
        opacity: isReady ? 1 : 0,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      }}
    >
      <Image
        src={image}
        alt="logo image"
        width={100}
        height={100}
        className="p-1"
      />
    </div>
  );
};

export default Bouble;
