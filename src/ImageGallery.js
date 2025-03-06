"use client"

import { useState, useCallback, useMemo } from "react";
import Resize from "./Resize";
import "./ObjectBlock.css";

const ImageGallery = ({ images }) => {
  const isPortrait = Resize();
  const [visibleRows, setVisibleRows] = useState(2);
  const [selectedImage, setSelectedImage] = useState(null);
  const imagesPerRow = 4;

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const showMoreImages = useCallback(() => {
    setVisibleRows((prev) => prev + 2);
  }, []);

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const visibleImages = useMemo(() => {
    return images.slice(0, visibleRows * imagesPerRow);
  }, [images, visibleRows, imagesPerRow]);

  const renderModal = useMemo(() => {
    if (!selectedImage) return null;
    
    return (
      <div className="modal-window-image" onClick={closeModal}>
        <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
          <h3 className="modal-image-title">{selectedImage.title}</h3>
          <div className="modal-image-container">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="modal-image"
            />
          </div>
          <p className="modal-image-description">{selectedImage.description}</p>
        </div>
        <button onClick={closeModal} className="modal-image-close-button"></button>
      </div>
    );
  }, [selectedImage, closeModal]);

  const renderedImages = useMemo(() => {
    return visibleImages.map((image, index) => (
      <img
        key={index}
        src={image.src}
        alt={image.title}
        className="gallery-image"
        onClick={() => handleImageClick(image)}
        loading="lazy" 
      />
    ));
  }, [visibleImages, handleImageClick]);

  const showMoreButton = useMemo(() => {
    if (visibleRows * imagesPerRow >= images.length) return null;
    
    return (
      <button className="show-more-button" onClick={showMoreImages}>
        Больше работ<p className="more-icon"></p>
      </button>
    );
  }, [visibleRows, imagesPerRow, showMoreImages, images.length]);

  return (
    <div>
      {isPortrait ? (
        <div className="image-gallery" style={{ padding: "0 0 30px 0" }}>
          <div className="image-grid">{renderedImages}</div>
          {showMoreButton}
          {renderModal}
        </div>
      ) : (
        <div>
          <div className="filter-scrollbar" style={{ padding: "7vw", margin: "0", gap: "2vw" }}>
            {renderedImages}
          </div>
          {renderModal}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;