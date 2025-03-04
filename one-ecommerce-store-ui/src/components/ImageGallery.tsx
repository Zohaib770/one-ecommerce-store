import React, { useState } from "react";

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => { // Corrected type here
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const thumbnailsPerPage = 3;

  const handlePrevThumbnails = () => {
    setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - thumbnailsPerPage));
  };

  const handleNextThumbnails = () => {
    setThumbnailStartIndex(Math.min(
      images.length - thumbnailsPerPage,
      thumbnailStartIndex + thumbnailsPerPage
    ));
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={images[currentImageIndex]}
        alt="Thumbnailpicture"
        className="w-[500px] h-[600px] object-contain mt-6"
      />

      <div className="flex items-center mt-4">
        {thumbnailStartIndex > 0 && (
          <button
            onClick={handlePrevThumbnails}
            className="text-gray-600 px-2 py-1 rounded-l hover:bg-gray-200"
          >
            &lt;
          </button>
        )}

        <div className="flex space-x-2 overflow-x-hidden">
          {images
            .slice(thumbnailStartIndex, thumbnailStartIndex + thumbnailsPerPage)
            .map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Vorschaubild ${index + thumbnailStartIndex + 1}`}
                className={`w-[120px] h-[120px] object-contain m-6 border border-gray-300 rounded-md cursor-pointer ${
                  currentImageIndex === thumbnailStartIndex + index
                    ? "opacity-60"
                    : "opacity-100"
                }`}
                onMouseEnter={() =>
                  setCurrentImageIndex(thumbnailStartIndex + index)
                }
              />
            ))}
        </div>

        {thumbnailStartIndex + thumbnailsPerPage < images.length && (
          <button
            onClick={handleNextThumbnails}
            className="text-gray-600 px-2 py-1 rounded-r hover:bg-gray-200"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;