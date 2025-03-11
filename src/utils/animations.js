"use client"

import { useCallback } from "react"
import gsap from "gsap"

// Утилиты для анимаций
export const useGSAPAnimations = () => {
  // Общая функция для анимации появления элементов
  const animateFromBottom = useCallback((elements, options = {}) => {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: options.y || 30,
        scale: options.scale || 1,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options.duration || 0.7,
        stagger: options.stagger || 0.15,
        ease: options.ease || "power2.out",
        scrollTrigger: options.scrollTrigger,
      },
    )
  }, [])

  // Анимация для тегов
  const animateTags = useCallback((elements, scrollTrigger) => {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power1.out",
        scrollTrigger,
      },
    )
  }, [])

  // Добавление эффекта при наведении только для перемещения, без изменения стилей
  const addHoverEffect = useCallback((elements, options = {}, preserveStyles = false) => {
    const cleanupFunctions = []

    elements.forEach((element) => {
      const enterHandler = () => {
        // Если нужно сохранить стили CSS, то меняем только положение
        if (preserveStyles) {
          gsap.to(element, {
            y: options.y || -5,
            duration: options.duration || 0.3,
            ease: options.ease || "power2.out",
          })
        } else {
          // Не меняем цвет, если элемент уже выбран (имеет класс selected)
          if (element.classList.contains("selected")) return

          gsap.to(element, {
            y: options.y || -5,
            scale: options.scale || 1.03,
            backgroundColor: options.bgColor,
            boxShadow: options.shadow || "0 10px 20px rgba(0,0,0,0.1)",
            duration: options.duration || 0.3,
            ease: options.ease || "power2.out",
          })
        }
      }

      const leaveHandler = () => {
        // Если нужно сохранить стили CSS, то меняем только положение
        if (preserveStyles) {
          gsap.to(element, {
            y: 0,
            duration: options.duration || 0.3,
            ease: options.ease || "power2.out",
          })
        } else {
          // Не меняем цвет, если элемент уже выбран (имеет класс selected)
          if (element.classList.contains("selected")) return

          gsap.to(element, {
            y: 0,
            scale: 1,
            backgroundColor: options.resetBgColor || null,
            boxShadow: "none",
            duration: options.duration || 0.3,
            ease: options.ease || "power2.out",
          })
        }
      }

      element.addEventListener("mouseenter", enterHandler)
      element.addEventListener("mouseleave", leaveHandler)

      cleanupFunctions.push(() => {
        element.removeEventListener("mouseenter", enterHandler)
        element.removeEventListener("mouseleave", leaveHandler)
      })
    })

    // Возвращаем функцию для очистки всех обработчиков
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup())
    }
  }, [])

  return {
    animateFromBottom,
    animateTags,
    addHoverEffect,
  }
}

