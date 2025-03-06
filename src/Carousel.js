"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import "./Carousel.css"
import imageMetadata from "./imageMetadata"

const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), { threshold: 0.1 })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.disconnect()
      }
    }
  }, [ref])

  return isIntersecting
}

const useOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(true)

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth > window.innerHeight)
    }

    checkOrientation()

    const resizeObserver = new ResizeObserver(checkOrientation)
    resizeObserver.observe(document.documentElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return isPortrait
}

const Carousel = ({ direction }) => {
  const carouselRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [touchStartX, setTouchStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [loadedImages, setLoadedImages] = useState([])
  const isInViewport = useIsInViewport(carouselRef)
  const animationRef = useRef(null)
  const startPositionRef = useRef(0)

  useEffect(() => {
    const loadImages = async () => {
      try {
        const contexts = {
          LivingBuilding: require.context("/public/images/LivingBuilding", false, /\.(png|jpe?g|svg)$/),
          AgriculturalFacilities: require.context("/public/images/AgriculturalFacilities", false, /\.(png|jpe?g|svg)$/),
          GeneralPlans: require.context("/public/images/GeneralPlans", false, /\.(png|jpe?g|svg)$/),
          HealthFacilities: require.context("/public/images/HealthFacilities", false, /\.(png|jpe?g|svg)$/),
          PublicBuildings: require.context("/public/images/PublicBuildings", false, /\.(png|jpe?g|svg)$/),
          SchoolInstitutions: require.context("/public/images/SchoolInstitutions", false, /\.(png|jpe?g|svg)$/),
          SportBuildings: require.context("/public/images/SportBuildings", false, /\.(png|jpe?g|svg)$/),
        }

        const processContext = (context) => {
          return context
            .keys()
            .slice(0, 10)
            .map((key) => {
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

        const allImages = [
          ...processContext(contexts.LivingBuilding),
          ...processContext(contexts.AgriculturalFacilities),
          ...processContext(contexts.GeneralPlans),
          ...processContext(contexts.HealthFacilities),
          ...processContext(contexts.PublicBuildings),
          ...processContext(contexts.SchoolInstitutions),
          ...processContext(contexts.SportBuildings),
        ]

        const shuffledImages = allImages.sort(() => Math.random() - 0.5)

        setLoadedImages(shuffledImages)
      } catch (error) {
        console.error("Ошибка загрузки изображений:", error)
      }
    }

    loadImages()
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || !isInViewport) return

    const animate = () => {
      if (!isHovered && !isTouched && carousel) {
        startPositionRef.current += direction === "left" ? -0.3 : 0.3
        if (startPositionRef.current >= carousel.scrollWidth / 2) {
          startPositionRef.current = 0
        } else if (startPositionRef.current <= 0) {
          startPositionRef.current = carousel.scrollWidth / 2
        }
        carousel.scrollLeft = startPositionRef.current
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [direction, isHovered, isTouched, isInViewport])

  const closeModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const handleTouchStart = useCallback((e) => {
    setIsTouched(true)
    setTouchStartX(e.touches[0].clientX)
    setScrollLeft(carouselRef.current.scrollLeft)
  }, [])

  const handleTouchMove = useCallback(
    (e) => {
      if (!isTouched) return
      const x = e.touches[0].clientX
      const walk = (x - touchStartX) * 2
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = scrollLeft - walk
      }
    },
    [isTouched, touchStartX, scrollLeft],
  )

  const handleTouchEnd = useCallback(() => {
    setIsTouched(false)
    setTimeout(() => {
      setIsTouched(false)
    }, 1000)
  }, [])

  const duplicatedImages = useMemo(() => {
    return [...loadedImages, ...loadedImages]
  }, [loadedImages])

  return (
    <div
      className="carousel-container"
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-content">
        {duplicatedImages.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.title}
            className="carousel-image"
            onClick={() => setSelectedImage(image)}
            loading="lazy"
          />
        ))}
      </div>
      {selectedImage && (
        <div className="modal-window-image" onClick={closeModal}>
          <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-image-title">{selectedImage.title}</h3>
            <div className="modal-image-container">
              <img src={selectedImage.src} alt={selectedImage.title} className="modal-image" />
            </div>
            <p className="modal-image-description">{selectedImage.description}</p>
          </div>
          <button onClick={closeModal} className="modal-image-close-button" aria-label="Закрыть"></button>
        </div>
      )}
    </div>
  )
}

export default Carousel


