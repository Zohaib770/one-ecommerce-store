import React, { useState } from "react";

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="flex flex-col items-center">
      {/* Main Image */}
      <img
        src={images[currentImageIndex]}
        alt="Thumbnailpicture"
        className="w-[500px] h-[600px] object-contain mt-6 "
      />

      {/* Thumbnails */}
      <div className="flex mt-4 space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Vorschaubild ${index + 1}`}
            className={`w-[120px] h-[120px] object-contain m-6 
              border border-gray-300 rounded-md cursor-pointer ${currentImageIndex === index ? "opacity-60" : "opacity-100"}`}
            onMouseEnter={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
