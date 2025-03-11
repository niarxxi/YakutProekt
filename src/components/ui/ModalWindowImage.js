"use client"

import React from "react"

const ModalWindowImage = ({ show, onClose, imageData }) => {
  if (!show) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window-image" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          <img src={imageData.src} alt={imageData.title || "Изображение проекта"} />
          {imageData.title && <h2>{imageData.title}</h2>}
          {imageData.description && <p>{imageData.description}</p>}
        </div>
      </div>
    </div>
  )
}

export default React.memo(ModalWindowImage)

