"use client"

import { useState } from "react"
import Resize from "./Resize"
import imageMetadata from "./imageMetadata"

const importAll = (r) => r.keys().map(r)
const imageFiles = importAll(require.context("/public/images/SchoolInstitutions", false, /\.(png|jpe?g|svg)$/))

const getMetadataByFilePath = (filePath) => {
  const fileName = filePath
    .split("/")
    .pop()
    .replace(/\.(png|jpe?g|svg)$/, "")

  const key = fileName.split(".")[0]

  return (
    imageMetadata[key] || {
      title: `Изображение ${key}`,
      description: `Описание для изображения ${key} отсутствует`,
    }
  )
}

const images = imageFiles.map((filePath) => {
  const metadata = getMetadataByFilePath(filePath)
  return {
    src: filePath,
    title: metadata.title,
    description: metadata.description,
  }
})

const SchoolInstitutions = () => {
  const isPortrait = Resize()
  const [visibleRows, setVisibleRows] = useState(2)
  const [selectedImage, setSelectedImage] = useState(null)
  const imagesPerRow = 4

  const closeModal = () => {
    setSelectedImage(null)
  }

  const showMoreImages = () => {
    setVisibleRows(visibleRows + 2)
  }

  const renderImages = () => {
    const visibleImages = images.slice(0, visibleRows * imagesPerRow)
    return visibleImages.map((image, index) => (
      <img
        key={index}
        src={image.src || "/placeholder.svg"}
        alt={image.title}
        className="gallery-image"
        onClick={() => setSelectedImage(image)}
      />
    ))
  }

  return (
    <div>
      {isPortrait ? (
        <div className="image-gallery" style={{ padding: "0 0 30px 0" }}>
          <div className="image-grid">{renderImages()}</div>
          {visibleRows * imagesPerRow < images.length && (
            <button className="show-more-button" onClick={showMoreImages}>
              Больше работ<p className="more-icon"></p>
            </button>
          )}
          {selectedImage && (
            <div className="modal-window-image" onClick={closeModal}>
              <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-image-title">{selectedImage.title}</h3>
                <div className="modal-image-container">
                  <img
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.title}
                    className="modal-image"
                  />
                </div>
                <p className="modal-image-description">{selectedImage.description}</p>
              </div>
              <button onClick={closeModal} className="modal-image-close-button"></button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="filter-scrollbar" style={{ padding: "2vw", margin: "0" }}>
            {renderImages()}
          </div>
          {selectedImage && (
            <div className="modal-window-image" onClick={closeModal}>
              <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-image-title">{selectedImage.title}</h3>
                <div className="modal-image-container">
                  <img
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.title}
                    className="modal-image"
                  />
                </div>
                <p className="modal-image-description">{selectedImage.description}</p>
              </div>
              <button onClick={closeModal} className="modal-image-close-button"></button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SchoolInstitutions;