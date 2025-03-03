"use client"

import { useState, useRef, useEffect } from "react"
import "./Carousel.css"
import Resize from "./Resize"
import imageMetadata from "./imageMetadata"

const importAllFromFolders = () => {
  const agriculturalContext = require.context("/public/images/AgriculturalFacilities", false, /\.(png|jpe?g|svg)$/)
  const generalPlansContext = require.context("/public/images/GeneralPlans", false, /\.(png|jpe?g|svg)$/)
  const healthFacilitiesContext = require.context("/public/images/HealthFacilities", false, /\.(png|jpe?g|svg)$/)
  const livingBuildingContext = require.context("/public/images/LivingBuilding", false, /\.(png|jpe?g|svg)$/)
  const sportBuildingContext = require.context("/public/images/SportBuildings", false, /\.(png|jpe?g|svg)$/)
  const publicBuildingContext = require.context("/public/images/PublicBuildings", false, /\.(png|jpe?g|svg)$/)
  const schoolInstitutionsContext = require.context("/public/images/SchoolInstitutions", false, /\.(png|jpe?g|svg)$/)

  const processContext = (context) => {
    return context.keys().map((key) => {
      const filePath = context(key)
      const fileName = key.replace("./", "").replace(/\.(png|jpe?g|svg)$/, "")
      const metadata = imageMetadata[fileName] || {
        title: `Изображение ${fileName}`,
        description: `Описание для изображения ${fileName}`,
      }
      return {
        src: filePath,
        title: metadata.title,
        description: metadata.description,
      }
    })
  }

  const agriculturalImages = processContext(agriculturalContext)
  const generalPlansImages = processContext(generalPlansContext)
  const healthFacilitiesImages = processContext(healthFacilitiesContext)
  const livingBuildingImages = processContext(livingBuildingContext)
  const sportBuildingImages = processContext(sportBuildingContext)
  const publicBuildingImages = processContext(publicBuildingContext)
  const schoolInstitutionsImages = processContext(schoolInstitutionsContext)

  return [
    ...agriculturalImages,
    ...generalPlansImages,
    ...healthFacilitiesImages,
    ...livingBuildingImages,
    ...sportBuildingImages,
    ...publicBuildingImages,
    ...schoolInstitutionsImages,
  ]
}

const images = importAllFromFolders()

const Carousel = ({ direction }) => {
  const isPortrait = Resize()
  const carouselRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const requestIdRef = useRef(null)
  const startPositionRef = useRef(0)
  const [selectedImage, setSelectedImage] = useState(null)

  const closeModal = () => {
    setSelectedImage(null)
  }

  useEffect(() => {
    const carousel = carouselRef.current

    const animate = () => {
      if (!isHovered) {
        startPositionRef.current += direction === "left" ? -0.3 : 0.3
        if (startPositionRef.current >= carousel.scrollWidth / 2) {
          startPositionRef.current = 0
        } else if (startPositionRef.current <= 0) {
          startPositionRef.current = carousel.scrollWidth / 2
        }
        carousel.scrollLeft = startPositionRef.current
      }
      requestIdRef.current = requestAnimationFrame(animate)
    }

    requestIdRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(requestIdRef.current)
  }, [direction, isHovered])

  return (
    <div
      className="carousel-container"
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-content">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src || "/placeholder.svg"}
            alt={image.title}
            className={isPortrait ? "carousel-image" : "carousel-image mobile"}
            onClick={() => setSelectedImage(image)}
          />
        ))}
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src || "/placeholder.svg"}
            alt={image.title}
            className={isPortrait ? "carousel-image" : "carousel-image mobile"}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className="modal-window-image" onClick={closeModal}>
          <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-image-title">{selectedImage.title}</h3>
            <div className="modal-image-container">
              <img src={selectedImage.src || "/placeholder.svg"} alt={selectedImage.title} className="modal-image" />
            </div>
            <p className="modal-image-description">{selectedImage.description}</p>
          </div>
          <button onClick={closeModal} className="modal-image-close-button"></button>
        </div>
      )}
    </div>
  )
}

export default Carousel


