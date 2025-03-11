"use client"

import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ModalWindow from "../common/ModalWindow"
import ModalMenu from "../common/ModalMenu"
import Resize from "../../utils/Resize"
import Theme from "../../utils/Theme"
import { useDepartments } from "../../utils/departmentsData"
import useBlockAnimations from "../../hooks/useBlockAnimations"
import TagItem from "../ui/TagItem"
import TagWithIcon from "../ui/TagWithIcon"
import HeaderButtons from "../ui/HeaderButtons"
import MobileHeaderButtons from "../ui/MobileHeaderButtons"
import NavigationLinks from "../ui/NavigationLinks"
import ModalWindowImage from "../ui/ModalWindowImage"

const AllGallery = lazy(() => import("../pages/AllGallery"))
const LivingBuilding = lazy(() => import("../pages/LivingBuilding"))
const SchoolInstitutions = lazy(() => import("../pages/SchoolInstitutions"))
const HealthFacilities = lazy(() => import("../pages/HealthFacilities"))
const PublicBuildings = lazy(() => import("../pages/PublicBuildings"))
const SportBuildings = lazy(() => import("../pages/SportBuildings"))
const AgriculturalFacilities = lazy(() => import("../pages/AgriculturalFacilities"))
const GeneralPlans = lazy(() => import("../pages/GeneralPlans"))

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Main = () => {
  const isPortrait = Resize()
  const { theme, setTheme } = Theme()

  const [ui, setUi] = useState({
    showModal: false,
    showModalMenu: false,
    selectedCategory: "All",
    isDarkTheme: false,
    scroll: 0,
    modalImage: null,
  })

  useEffect(() => {
    setUi((prev) => ({
      ...prev,
      isDarkTheme: localStorage.getItem("theme") === "dark",
    }))
  }, [])

  const refs = {
    welcomeBlock: useRef(null),
    serviceBlock: useRef(null),
    objectBlock: useRef(null),
    departmentBlock: useRef(null),
    contactsBlock: useRef(null),
    container: useRef(null),
    departmentWidth: useRef(0),
  }

  const toggleTheme = useCallback(() => {
    const newIsDarkTheme = !ui.isDarkTheme
    setUi((prev) => ({ ...prev, isDarkTheme: newIsDarkTheme }))

    // Анимация переключения темы
    const elements = document.querySelectorAll("body, .tag, .point, h1, h2, h3, p")
    gsap.to(elements, {
      opacity: 0.5,
      duration: 0.2,
      onComplete: () => {
        setTheme(newIsDarkTheme ? "dark" : "light")
        gsap.to(elements, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
        })
      },
    })
  }, [ui.isDarkTheme, setTheme])

  const handleModal = useCallback((show) => {
    setUi((prev) => ({ ...prev, showModal: show }))
  }, [])

  const handleModalMenu = useCallback((show) => {
    setUi((prev) => ({ ...prev, showModalMenu: show }))
  }, [])

  const setSelectedCategory = useCallback((category) => {
    setUi((prev) => ({ ...prev, selectedCategory: category }))
  }, [])

  const scrollToRef = useCallback((ref) => {
    if (ref && ref.current) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0
      const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  const scrollUp = useCallback(() => {
    setUi((prev) => ({ ...prev, scroll: window.scrollY }))
  }, [])

  const visibleDepartments = 14

  const handleScroll = useCallback(() => {
    const box = refs.container.current
    if (!box) return

    const width = refs.departmentWidth.current * visibleDepartments

    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = "auto"
      box.scrollLeft = box.scrollWidth - 2 * width
      box.style.scrollBehavior = "smooth"
    }

    if (box.scrollLeft >= box.scrollWidth - width) {
      box.style.scrollBehavior = "auto"
      box.scrollLeft = width
      box.style.scrollBehavior = "smooth"
    }
  }, [refs.container, refs.departmentWidth, visibleDepartments])

  const btnPrevDepartment = useCallback(() => {
    const box = refs.container.current
    if (box) box.scrollLeft -= refs.departmentWidth.current
  }, [refs.container, refs.departmentWidth])

  const btnNextDepartment = useCallback(() => {
    const box = refs.container.current
    if (box) box.scrollLeft += refs.departmentWidth.current
  }, [refs.container, refs.departmentWidth])

  const handleImageModal = useCallback((imageData) => {
    setUi((prev) => ({ ...prev, modalImage: imageData }))
  }, [])

  const closeImageModal = useCallback(() => {
    setUi((prev) => ({ ...prev, modalImage: null }))
  }, [])

  const departments = useDepartments()

  const renderComponent = useMemo(() => {
    return (
      <Suspense fallback={<div className="loading">Загрузка...</div>}>
        {(() => {
          switch (ui.selectedCategory) {
            case "All":
              return <AllGallery onImageClick={handleImageModal} />
            case "LivingBuilding":
              return <LivingBuilding onImageClick={handleImageModal} />
            case "SchoolInstitutions":
              return <SchoolInstitutions onImageClick={handleImageModal} />
            case "HealthFacilities":
              return <HealthFacilities onImageClick={handleImageModal} />
            case "PublicBuildings":
              return <PublicBuildings onImageClick={handleImageModal} />
            case "SportBuildings":
              return <SportBuildings onImageClick={handleImageModal} />
            case "AgriculturalFacilities":
              return <AgriculturalFacilities onImageClick={handleImageModal} />
            case "GeneralPlans":
              return <GeneralPlans onImageClick={handleImageModal} />
            default:
              return <AllGallery onImageClick={handleImageModal} />
          }
        })()}
      </Suspense>
    )
  }, [ui.selectedCategory, handleImageModal])

  // Инициализация карусели отделов
  useEffect(() => {
    const box = refs.container.current
    if (!box) return

    const firstDepartment = box.querySelector(".department-card")
    refs.departmentWidth.current = firstDepartment ? firstDepartment.clientWidth : 0
    const width = refs.departmentWidth.current * visibleDepartments

    box.scrollLeft = (box.scrollWidth - width) / 2
    box.addEventListener("scroll", handleScroll)

    return () => {
      box.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll, refs.container, refs.departmentWidth, visibleDepartments])

  // Вызываем хук на верхнем уровне компонента
  const {
    setupWelcomeAnimations,
    setupServiceAnimations,
    setupObjectAnimations,
    setupDepartmentAnimations,
    setupContactsAnimations,
    setupCommonAnimations,
  } = useBlockAnimations(refs, isPortrait)

  // Затем используем результаты хука в useEffect
  useEffect(() => {
    window.addEventListener("scroll", scrollUp)

    // Настройка анимаций для каждого блока
    setupWelcomeAnimations()
    setupServiceAnimations()
    setupObjectAnimations()
    setupDepartmentAnimations()
    setupContactsAnimations()
    setupCommonAnimations()

    // Очистка ScrollTrigger при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", scrollUp)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [
    scrollUp,
    setupWelcomeAnimations,
    setupServiceAnimations,
    setupObjectAnimations,
    setupDepartmentAnimations,
    setupContactsAnimations,
    setupCommonAnimations,
  ])

  return (
    <div>
      <header style={{ zIndex: "2" }}>
        {isPortrait ? (
          <div className="navigation">
            <NavigationLinks refs={refs} scrollToRef={scrollToRef} />
            <HeaderButtons handleModal={handleModal} theme={theme} toggleTheme={toggleTheme} ui={ui} />
          </div>
        ) : (
          <div className="navigation">
            <div className="switch switch-mobile" onClick={toggleTheme}>
              <div
                className={theme === "light" ? "theme theme-mobile light" : "theme theme-mobile dark"}
                style={{
                  transform: ui.isDarkTheme ? "translateX(8.6vw)" : "translate(0)",
                }}
              ></div>
            </div>
            <MobileHeaderButtons handleModalMenu={handleModalMenu} theme={theme} />
          </div>
        )}
      </header>

      <ModalWindow show={ui.showModal} onClose={() => handleModal(false)}>
        <h2 style={{ color: "#4824ff", fontSize: "clamp(60px, 5vw, 60px)", marginTop: isPortrait ? "" : "0" }}>
          Контакты
        </h2>
        <p style={{ fontSize: isPortrait ? "22px" : "33px" }}>
          Вы можете связаться с нами в Телеграм <br /> или Ватсапп 👇
        </p>
      </ModalWindow>

      <ModalMenu show={ui.showModalMenu} onClose={() => handleModalMenu(false)}>
        <NavigationLinks onClickHandler={() => handleModalMenu(false)} mobile refs={refs} scrollToRef={scrollToRef} />
      </ModalMenu>

      {/* Модальное окно для изображений */}
      <ModalWindowImage show={ui.modalImage !== null} onClose={closeImageModal} imageData={ui.modalImage || {}} />

      {/* Welcome Block */}
      <div className={`welcome-block ${!isPortrait ? "mobile" : ""}`} ref={refs.welcomeBlock}>
        <div className={`main-image-box ${!isPortrait ? "mobile" : ""}`}>
          <img
            className={`first-image-layer ${!isPortrait ? "mobile" : ""}`}
            src="./images/logo-2-layer.png"
            draggable="false"
            alt="Логотип слой 2"
          />
          <img
            className={`second-image-layer ${!isPortrait ? "mobile" : ""}`}
            src="./images/logo-1-layer.png"
            draggable="false"
            alt="Логотип слой 1"
          />
        </div>
        <div className={`first-block ${!isPortrait ? "mobile" : ""}`}>
          <h1 style={{ color: "#4824ff" }}>
            ОАО РПИИ <span className="title">Якутпроект</span> Республиканский проектно-изыскательский институт
          </h1>
          <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
            Был создан<span style={{ color: "#4824ff" }}> 1</span> <br /> марта
            <span style={{ color: "#4824ff" }}> 1999 г.</span> в <br /> г. Якутск.
          </h2>
          <h3>
            <span style={{ color: "#4824ff" }}>Институт «Якутпроект» </span> — ведущая республиканская
            проектно-изыскательская организация, сочетающая бюджетные, корпоративные и коммерческие заказы. Мы
            предоставляем полный спектр услуг: от инженерных изысканий до разработки проектно-сметной документации,
            авторского надзора и функций генерального проектировщика. Институт имеет аккредитацию на проведение
            негосударственной экспертизы проектной документации и результатов инженерных изысканий.
          </h3>
          {!isPortrait && (
            <button onClick={() => handleModal(true)} className="btn mobile">
              Связаться
            </button>
          )}
        </div>
      </div>

      {/* Service Block */}
      <div className={isPortrait ? "service-block" : "service-block mobile"} ref={refs.serviceBlock} draggable="false">
        <h1 style={{ fontSize: isPortrait ? "52px" : "10vw" }}>УСЛУГИ</h1>
        <p style={{ fontSize: isPortrait ? "27px" : "6vw" }}>
          Основным видом деятельности института являются выполнение проектно-сметной документации:
        </p>

        <div style={{ display: isPortrait ? "flex" : "" }}>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            Проекты планировок и застроек
          </TagWithIcon>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            На новое строительство, расширение, реконструкция и техническое перевооружение действующих предприятий
          </TagWithIcon>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            На строительство городских инженерных сооружений и коммуникаций
          </TagWithIcon>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            На строительство наружных и внутренних инженерных сетей тепло и водоснабжения, канализации,
            электроснабжения, связи, газоснабжения и сооружений на них
          </TagWithIcon>
        </div>
        <div style={{ display: isPortrait ? "flex" : "", marginTop: isPortrait ? "16px" : "" }}>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            На строительство котельных, установок холодоснабжений, очистных сооружений и.т.п.
          </TagWithIcon>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            Геодезические и геологические работы в строительстве
          </TagWithIcon>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            Техническое обследование зданий и сооружений
          </TagWithIcon>
        </div>

        <p style={{ fontSize: isPortrait ? "27px" : "6vw" }}>Кадастровые услуги:</p>

        <div style={{ display: isPortrait ? "flex" : "" }}>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            Запрос любых кадастровых сведений на интересующие земельные участки
          </TagWithIcon>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            Составление межевых планов на любые виды кадастровых работ
          </TagWithIcon>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            Разработка карт (планов) на объекты землеустройства
          </TagWithIcon>
          <TagWithIcon isPortrait={isPortrait} theme={theme}>
            Анализ межевых планов получивших отказ (приостановку) при осуществлении государственного учета
          </TagWithIcon>
        </div>
      </div>

      {/* Object Block */}
      <div className="object-block" ref={refs.objectBlock}>
        <div className={isPortrait ? "first-block" : "first-block mobile"}>
          <h1 className={isPortrait ? "main-title" : "main-title mobile"}>Объекты</h1>
          <div style={{ position: "absolute", marginLeft: isPortrait ? "-560px" : "-50vw" }}>
            <p className={isPortrait ? "gradient-part-one" : "gradient-part-one mobile"}></p>
            <p className={isPortrait ? "title-border" : "title-border mobile"}>Объ</p>
          </div>
          <div style={{ position: "absolute", marginLeft: isPortrait ? "520px" : "50vw" }}>
            <p className={isPortrait ? "gradient-part-two" : "gradient-part-two mobile"}></p>
            <p className={isPortrait ? "title-border" : "title-border mobile"}>екты</p>
          </div>
        </div>

        <div className={isPortrait ? "" : "filter-scrollbar"}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "20px",
              width: "90vw",
            }}
          >
            <TagItem
              category="All"
              isPortrait={isPortrait}
              selectedCategory={ui.selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              Все работы
            </TagItem>
            <TagItem
              category="LivingBuilding"
              isPortrait={isPortrait}
              selectedCategory={ui.selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              Жилые дома
            </TagItem>
            <TagItem
              category="SchoolInstitutions"
              isPortrait={isPortrait}
              selectedCategory={ui.selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              Дошкольные и школьные учреждения
            </TagItem>
            <TagItem
              category="HealthFacilities"
              isPortrait={isPortrait}
              selectedCategory={ui.selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              Объекты здравоохранения
            </TagItem>
            <TagItem
              category="PublicBuildings"
              isPortrait={isPortrait}
              selectedCategory={ui.selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              Административные и общественные здания
            </TagItem>
            <TagItem
              category="SportBuildings"
              isPortrait={isPortrait}
              selectedCategory={ui.selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              Спортивные сооружения
            </TagItem>
            <TagItem
              category="AgriculturalFacilities"
              isPortrait={isPortrait}
              selectedCategory={ui.selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              Объекты сельского хозяйства
            </TagItem>
            <TagItem
              category="GeneralPlans"
              isPortrait={isPortrait}
              selectedCategory={ui.selectedCategory}
              setSelectedCategory={setSelectedCategory}
            >
              Генеральные планы
            </TagItem>
          </div>
        </div>
        <div className="content" style={{ marginLeft: "-5vw", marginRight: "-5vw" }}>
          {renderComponent}
        </div>
      </div>

      {/* Department Block */}
      <div className={isPortrait ? "department-block" : "department-block mobile"} ref={refs.departmentBlock}>
        <h1 style={{ fontSize: isPortrait ? "50px" : "10vw" }}>ОТДЕЛЫ ИНСТИТУТА</h1>
        <p className={isPortrait ? "description" : "description mobile"}>
          В структуру нашего института входят{" "}
          <span className="selecting"> проектные и административно-вспомогательные </span>подразделения, обеспечивающие
          полный цикл проектирования и сопровождения строительных объектов. От разработки архитектурных концепций до
          авторского надзора за строительством, от инженерных изысканий до финансово-экономического анализа — каждый
          отдел выполняет важную роль в создании качественных проектов. <br /> Наши специалисты разрабатывают
          генеральные планы городов, проектируют здания и сооружения различного назначения, инженерные системы, дороги и
          инфраструктуру. <span className="selecting"> Административные </span>подразделения обеспечивают эффективную
          работу всего института, занимаясь кадровыми вопросами, документооборотом, техническим обеспечением и
          финансовым планированием. <br />
          Благодаря слаженной работе всех отделов, мы создаем проекты, отвечающие современным требованиям и потребностям
          заказчиков.
        </p>

        <div className={isPortrait ? "department-carause1" : "department-carause1 mobile"}>
          <div className={isPortrait ? "department-container" : "department-container mobile"} ref={refs.container}>
            {departments.slice(-visibleDepartments)}
            {departments}
            {departments.slice(0, visibleDepartments)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className={isPortrait ? "next-button" : "next-button mobile"} style={{ transform: "rotate(180deg)" }}>
            <span className="array-next-icon" onClick={btnPrevDepartment} />
          </p>
          <p className={isPortrait ? "next-button" : "next-button mobile"}>
            <span className="array-next-icon" onClick={btnNextDepartment} />
          </p>
        </div>
      </div>

      {/* Contacts Block */}
      <div className={isPortrait ? "contacts-block" : "contacts-block mobile"} ref={refs.contactsBlock}>
        <h1 style={{ fontSize: isPortrait ? "52px" : "10vw", paddingBottom: isPortrait ? "20px" : "0" }}>КОНТАКТЫ</h1>

        <ol className={isPortrait ? "contacts-points" : "contacts-points mobile"}>
          <li className={theme === "light" ? "point address" : "point address-dark"}>
            <span style={{ color: "#4824ff" }}>Место нахождения:</span> 677000, Республика Саха (Якутия), г. Якутск, ул.
            Аммосова, д. 8
          </li>
          <li className={theme === "light" ? "point telephone" : "point telephone-dark"}>
            <span style={{ color: "#4824ff" }}>Тел/Факс:</span> (4112) 34-15-09
          </li>
          <li className={theme === "light" ? "point email" : "point email-dark"}>
            <span style={{ color: "#4824ff" }}>E-mail:</span> info@yakutproekt.ru
          </li>
        </ol>

        <h2
          style={{
            fontSize: "30px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          РЕКВИЗИТЫ КОМПАНИИ
        </h2>

        <ol className={isPortrait ? "requisite-points" : "requisite-points mobile"}>
          <li className="point">
            <span style={{ color: "#4824ff" }}>ИНН:</span> 1435104600
          </li>
          <li className="point">
            <span style={{ color: "#4824ff" }}>Расчетный счет АКБ «Алмазэргиэнбанк» ОАО, г.Якутск:</span> <br />№ 40 702
            810 200 000 000 873
          </li>
          <li className="point">
            <span style={{ color: "#4824ff" }}>Кор. счет:</span> № 30 101 810 300 000 000 770
          </li>
          <li className="point">
            <span style={{ color: "#4824ff" }}>БИК:</span> 049805770
          </li>
        </ol>
      </div>

      <div className="footer">© ОАО РПИИ ЯКУТПРОЕКТ</div>

      <button
        className={ui.scroll < 2760 ? "" : isPortrait ? "btn-up" : "btn-up mobile"}
        onClick={() => scrollToRef(refs.welcomeBlock)}
      ></button>
    </div>
  )
}

export default Main

