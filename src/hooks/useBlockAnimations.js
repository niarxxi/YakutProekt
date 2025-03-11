"use client"

import { useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAPAnimations } from "../utils/animations"

// Хук для анимаций блоков
export const useBlockAnimations = (refs, isPortrait) => {
  const { animateFromBottom, animateTags, addHoverEffect } = useGSAPAnimations()

  // Анимация для Welcome Block
  const setupWelcomeAnimations = useCallback(() => {
    if (!refs.welcomeBlock.current) return

    // Анимация для первого слоя логотипа
    const firstLogoLayer = refs.welcomeBlock.current.querySelector(".first-image-layer")
    gsap.fromTo(
      firstLogoLayer,
      {
        opacity: 0,
        scale: 0.8,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: refs.welcomeBlock.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
        },
      },
    )

    // Анимация для текста
    const welcomeTexts = refs.welcomeBlock.current.querySelectorAll("h1, h2, h3")
    animateFromBottom(welcomeTexts, {
      x: -50,
      y: 0,
      scrollTrigger: {
        trigger: refs.welcomeBlock.current,
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
    })

    // Анимация для кнопки (только в мобильной версии)
    if (!isPortrait) {
      const welcomeButton = refs.welcomeBlock.current.querySelector(".btn.mobile")
      if (welcomeButton) {
        gsap.fromTo(
          welcomeButton,
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: refs.welcomeBlock.current,
              start: "top 70%",
              end: "top 20%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    }
  }, [refs.welcomeBlock, isPortrait, animateFromBottom])

  // Анимация для Service Block
  const setupServiceAnimations = useCallback(() => {
    if (!refs.serviceBlock.current) return

    // Анимация для заголовков
    const serviceHeadings = refs.serviceBlock.current.querySelectorAll("h1, p:not(.tag)")
    animateFromBottom(serviceHeadings, {
      scrollTrigger: {
        trigger: refs.serviceBlock.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Анимация для тегов с эффектом каскада
    const serviceTags = refs.serviceBlock.current.querySelectorAll(".tag")
    animateTags(serviceTags, {
      trigger: refs.serviceBlock.current,
      start: "top 70%",
      end: "top 20%",
      toggleActions: "play none none reverse",
    })

    // Добавим анимацию при наведении на теги с сохранением исходного цвета
    addHoverEffect(
      serviceTags,
      {
        y: -5,
      },
      true,
    ) // Сохраняем стили CSS
  }, [refs.serviceBlock, animateFromBottom, animateTags, addHoverEffect])

  // Анимация для Object Block
  const setupObjectAnimations = useCallback(() => {
    if (!refs.objectBlock.current) return

    // Анимация для заголовка с градиентом
    const objectTitle = refs.objectBlock.current.querySelector(".main-title")
    const objectTitleBorders = refs.objectBlock.current.querySelectorAll(".title-border")
    const objectGradients = refs.objectBlock.current.querySelectorAll(".gradient-part-one, .gradient-part-two")

    if (objectTitle) {
      animateFromBottom(objectTitle, {
        y: -30,
        scrollTrigger: {
          trigger: refs.objectBlock.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      })
    }

    if (objectTitleBorders.length) {
      gsap.fromTo(
        objectTitleBorders,
        {
          opacity: 0,
          scale: 1.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: refs.objectBlock.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    if (objectGradients.length) {
      gsap.fromTo(
        objectGradients,
        {
          width: "0%",
        },
        {
          width: "100%",
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: refs.objectBlock.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    // Анимация для фильтров объектов
    const objectFilters = refs.objectBlock.current.querySelectorAll(".tag")
    animateTags(objectFilters, {
      trigger: refs.objectBlock.current,
      start: "top 70%",
      end: "top 20%",
      toggleActions: "play none none reverse",
    })

    // Добавим анимацию при наведении на фильтры с сохранением исходного цвета
    addHoverEffect(
      objectFilters,
      {
        y: -3,
      },
      true,
    ) // Сохраняем стили CSS
  }, [refs.objectBlock, animateFromBottom, animateTags, addHoverEffect])

  // Анимация для Department Block
  const setupDepartmentAnimations = useCallback(() => {
    if (!refs.departmentBlock.current) return

    // Анимация для заголовка и описания
    const departmentHeadings = refs.departmentBlock.current.querySelectorAll("h1, .description")
    animateFromBottom(departmentHeadings, {
      scrollTrigger: {
        trigger: refs.departmentBlock.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Анимация для выделенного текста
    const highlightedText = refs.departmentBlock.current.querySelectorAll(".selecting")
    gsap.fromTo(
      highlightedText,
      {
        color: "inherit",
        fontWeight: "normal",
      },
      {
        color: "#4824ff",
        fontWeight: "bold",
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: refs.departmentBlock.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Анимация для карточек отделов с 3D эффектом
    const departmentCards = refs.departmentBlock.current.querySelectorAll(".department-card")
    gsap.fromTo(
      departmentCards,
      {
        opacity: 0,
        scale: 0.8,
        rotationY: -15,
        z: -100,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 1.7,
        stagger: 0.05,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: refs.departmentBlock.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Анимация для кнопок навигации карусели
    const carouselButtons = refs.departmentBlock.current.querySelectorAll(".next-button")
    gsap.fromTo(
      carouselButtons,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: refs.departmentBlock.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [refs.departmentBlock, animateFromBottom])

  // Анимация для Contacts Block
  const setupContactsAnimations = useCallback(() => {
    if (!refs.contactsBlock.current) return

    // Анимация для заголовка
    const contactsTitle = refs.contactsBlock.current.querySelector("h1")
    if (contactsTitle) {
      animateFromBottom(contactsTitle, {
        y: -20,
        scale: 0.9,
        scrollTrigger: {
          trigger: refs.contactsBlock.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      })
    }

    // Анимация для контактной информации
    const contactItems = refs.contactsBlock.current.querySelectorAll(".contacts-points .point")
    gsap.fromTo(
      contactItems,
      {
        opacity: 0,
        x: -30,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power1.out",
        scrollTrigger: {
          trigger: refs.contactsBlock.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Анимация для заголовка реквизитов
    const requisitesTitle = refs.contactsBlock.current.querySelector("h2")
    if (requisitesTitle) {
      animateFromBottom(requisitesTitle, {
        delay: 0.5,
        scrollTrigger: {
          trigger: requisitesTitle,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      })
    }

    // Анимация для реквизитов
    const requisiteItems = refs.contactsBlock.current.querySelectorAll(".requisite-points .point")
    gsap.fromTo(
      requisiteItems,
      {
        opacity: 0,
        y: 20,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.6,
        ease: "power1.out",
        scrollTrigger: {
          trigger: refs.contactsBlock.current,
          start: "top 60%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Добавим анимацию при наведении на контактные данные
    const allContactItems = [...contactItems, ...requisiteItems]
    addHoverEffect(allContactItems, {
      x: 5,
      bgColor: "rgba(72, 36, 255, 0.05)",
    })
  }, [refs.contactsBlock, animateFromBottom, addHoverEffect])

  // Анимация для общих элементов (шапка, кнопка наверх)
  const setupCommonAnimations = useCallback(() => {
    // Анимация для кнопки "наверх"
    const btnUp = document.querySelector(".btn-up")
    if (btnUp) {
      gsap.fromTo(
        btnUp,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: document.body,
            start: "top -100%",
            end: "top -110%",
            toggleActions: "play none none none",
            scrub: 0.5,
          },
        },
      )
    }

    // Анимация для шапки сайта (без ScrollTrigger, запускается сразу)
    const header = document.querySelector("header")
    if (header) {
      gsap.fromTo(
        header,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.5,
        },
      )

      // Добавим эффект тени при скролле
      ScrollTrigger.create({
        trigger: document.body,
        start: "top -100px",
        onEnter: () => {
          gsap.to(header, {
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            duration: 0.3,
          })
        },
        onLeaveBack: () => {
          gsap.to(header, {
            boxShadow: "none",
            duration: 0.3,
          })
        },
      })
    }
  }, [])

  return {
    setupWelcomeAnimations,
    setupServiceAnimations,
    setupObjectAnimations,
    setupDepartmentAnimations,
    setupContactsAnimations,
    setupCommonAnimations,
  }
}

export default useBlockAnimations

