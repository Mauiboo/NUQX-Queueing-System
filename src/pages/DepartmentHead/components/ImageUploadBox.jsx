import React, { useRef, useState, useEffect } from "react";

const ImageUploadBox = ({ onImageSelect, defaultImage }) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (defaultImage && !previewImage) {
      setPreviewImage(defaultImage);
    }
  }, [defaultImage]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      onImageSelect(file); // Send actual File object to parent
    } else {
      alert("Please upload a valid image.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={handleImageClick}
        className="h-[80px] sm:h-[120px] w-[80px] sm:w-[120px] my-4 border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden rounded-lg"
      >
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <p
        className="text-sm text-[#35408E] font-medium cursor-pointer"
        onClick={handleImageClick}
      >
        Choose Image
      </p>
    </div>
  );
};

export default ImageUploadBox;
