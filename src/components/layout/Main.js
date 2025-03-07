"use client"

import { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from "react"
import ModalWindow from "../common/ModalWindow"
import ModalMenu from "../common/ModalMenu"
import Resize from "../../utils/Resize"
import Theme from "../../utils/Theme"
import Department from "./Department"


const AllGallery = lazy(() => import("../pages/AllGallery"))
const LivingBuilding = lazy(() => import("../pages/LivingBuilding"))
const SchoolInstitutions = lazy(() => import("../pages/SchoolInstitutions"))
const HealthFacilities = lazy(() => import("../pages/HealthFacilities"))
const PublicBuildings = lazy(() => import("../pages/PublicBuildings"))
const SportBuildings = lazy(() => import("../pages/SportBuildings"))
const AgriculturalFacilities = lazy(() => import("../pages/AgriculturalFacilities"))
const GeneralPlans = lazy(() => import("../pages/GeneralPlans"))

const Main = () => {
  const isPortrait = Resize()
  const { theme, setTheme } = Theme()

  const [ui, setUi] = useState({
    showModal: false,
    showModalMenu: false,
    selectedCategory: "All",
    isDarkTheme: false,
    scroll: 0,
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
    setTheme(newIsDarkTheme ? "dark" : "light")
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
  }, [])

  const btnPrevDepartment = useCallback(() => {
    const box = refs.container.current
    if (box) box.scrollLeft -= refs.departmentWidth.current
  }, [])

  const btnNextDepartment = useCallback(() => {
    const box = refs.container.current
    if (box) box.scrollLeft += refs.departmentWidth.current
  }, [])

  
  const departments = useMemo(
    () => [
      <Department
        key={1}
        name="Архитектурно-планировочный отдел, технологический отдел"
        text="Отдел занимается превращением идей архитектора в конкретные чертежи и планы зданий. Они работают на раннем этапе создания проектов, следуя принципам пользы, прочности и красоты. Их задача — перевести творческие замыслы архитектора в техническую документацию, которая будет использована для строительства."
      />,
      <Department
        key={2}
        name="Отдел генеральных планов"
        text="Отдел занимается разработкой генеральных планов для городов и поселков. Они создают схемы развития населенных пунктов, определяя где и как будут располагаться здания, улицы и районы. Этот отдел сохранил опытных специалистов, которые умеют планировать целые города, хотя обычно такая работа выполняется на государственном уровне."
      />,
      <Department
        key={3}
        name="Строительный отдел"
        text="Строительный отдел в иснтитуте выполняет проектные работы по строительной части объектов гражданского, общественного и промышленного назначения. Отдел разрабатывает проекты как на новое строительство, так и на реконструкцию и техническое перевооружение построенных объектов, обеспечивая безопасность и надежность зданий и сооружений."
      />,
      <Department
        key={4}
        name="Инженерный отдел"
        text="Инженерный отдел занимается проектированием всех инженерных систем для зданий. Они разрабатывают планы для отопления, вентиляции, водоснабжения, канализации, теплоснабжения, газоснабжения и решают вопросы охраны окружающей среды. Это большой отдел с разными специалистами, которые могут спроектировать все технические системы даже для сложных объектов."
      />,
      <Department
        key={5}
        name="Электротехнический отдел"
        text="Отдел занимается проектированием всех электрических и автоматизированных систем в зданиях. Они разрабатывают планы для электроснабжения, освещения, автоматизации инженерных систем, а также систем связи, сигнализации и противопожарной безопасности. Проще говоря, они отвечают за все, что связано с электричеством и электронными системами в здании."
      />,
      <Department
        key={6}
        name="Отдел автомобильных дорог"
        text="Отдел проектирует автомобильные дороги, мосты, аэродромы и разные гидротехнические сооружения."
      />,
      <Department
        key={7}
        name="Отдел расчетов и инвестиций"
        text="Отдел расчетов и инвестиций занимается подсчетом стоимости строительства. Они определяют, сколько будет стоить построить здание или сооружение, сколько денег нужно вложить в проект, и какой будет окончательная цена по договору. Также они разрабатывают планы организации строительных работ и демонтажа старых зданий. По сути, этот отдел отвечает за финансовую сторону строительных проектов."
      />,
      <Department
        key={8}
        name="Отдел САПР и группа дизайна"
        text="В обязанности отдела входит обслуживание компьютерной и печатной техники, разработка прикладных программ по автоматизации инженерных расчетов, поддержка используемых в проектировании программ."
      />,
      <Department
        key={9}
        name="Отдел изысканий"
        text="Основными видами деятельности отдела являются инженерно-геодезические и инженерно-геологические изыскания для строительства зданий и сооружений I и II уровней ответственности."
      />,
      <Department
        key={10}
        name="Инжиниринговый отдел"
        text="Инжиниринговый отдел следит за строительством по проектам института. Это включает авторский надзор, чтобы всё строилось согласно задумке проектировщиков. Отдел контролирует качество работ подрядчиков на стройплощадке, взаимодействует с заказчиками и изучает рынок новых строительных материалов и технологий. Отдел обеспечивает правильное воплощение проектов в реальность."
      />,
      <Department
        key={11}
        name="Административно-управленческий персонал"
        text="Отдел кадров занимается расстановкой персонала в институте, обеспечивая эффективную работу всех подразделений. Секретариат отвечает за документооборот института, ведение архива и поддержание связи между заказчиками и партнерами организации."
      />,
      <Department
        key={12}
        name="Финансово-экономический отдел"
        text="ФЭО служит центром финансово-экономической информации и аналитической поддержки руководства. Через этот отдел проходят все информационные потоки, связанные с финансами института. Здесь собираются и анализируются все данные о финансово-хозяйственной деятельности, что позволяет отделу наиболее точно оценивать текущее положение института и перспективы достижения поставленных целей."
      />,
      <Department
        key={13}
        name="Технический отдел"
        text="Основными задачами отдела является техническое руководство и организация технологии проектирования, повышение качества и производительности труда основного персонала."
      />,
      <Department
        key={14}
        name="Хозяйственный и транспортный отделы"
        text="В обязанности отдела входят: организация материально-технического обеспечения и складского хозяйства, уборка и охрана помещений, переплет документов и курьерская служба."
      />,
    ],
    [],
  )

  
  const renderComponent = useMemo(() => {
    return (
      <Suspense fallback={<div className="loading">Загрузка...</div>}>
        {(() => {
          switch (ui.selectedCategory) {
            case "All":
              return <AllGallery />
            case "LivingBuilding":
              return <LivingBuilding />
            case "SchoolInstitutions":
              return <SchoolInstitutions />
            case "HealthFacilities":
              return <HealthFacilities />
            case "PublicBuildings":
              return <PublicBuildings />
            case "SportBuildings":
              return <SportBuildings />
            case "AgriculturalFacilities":
              return <AgriculturalFacilities />
            case "GeneralPlans":
              return <GeneralPlans />
            default:
              return <AllGallery />
          }
        })()}
      </Suspense>
    )
  }, [ui.selectedCategory])


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
  }, [handleScroll, refs.container.current, refs.departmentWidth.current])

  
  useEffect(() => {
    window.addEventListener("scroll", scrollUp)
    return () => window.removeEventListener("scroll", scrollUp)
  }, [scrollUp])


  const TagItem = ({ selected, category, children }) => (
    <p
      className={`tag ${ui.selectedCategory === category ? "selected" : ""} ${isPortrait ? "" : "mobile"}`}
      onClick={() => setSelectedCategory(category)}
    >
      {children}
    </p>
  )

  const TagWithIcon = ({ children }) => (
    <p className={isPortrait ? "tag" : "tag mobile"}>
      <p
        className={`tag-icon ${theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"} ${isPortrait ? "" : "mobile"}`}
      />
      {children}
    </p>
  )

  const HeaderButtons = () => (
    <div className="header-buttons">
      <button onClick={() => handleModal(true)} className="btn">
        Связаться
      </button>

      <a
        href="https://t.me/"
        target="_blank"
        className={theme === "light" ? "icon telegram light" : "icon telegram dark"}
        rel="noreferrer"
      ></a>
      <a
        href="https://whatsapp.com/"
        target="_blank"
        className={theme === "light" ? "icon whatsapp light" : "icon whatsapp dark"}
        rel="noreferrer"
      ></a>

      <div className="switch" onClick={toggleTheme}>
        <div
          className={theme === "light" ? "theme light" : "theme dark"}
          style={{
            transform: ui.isDarkTheme ? "translateX(38px)" : "translate(0)",
          }}
        ></div>
      </div>
    </div>
  )

  const MobileHeaderButtons = () => (
    <div className="header-buttons-mobile">
      <a
        href="https://t.me/"
        target="_blank"
        className={theme === "light" ? "icon icon-mobile telegram light" : "icon icon-mobile telegram dark"}
        rel="noreferrer"
      ></a>
      <a
        href="https://whatsapp.com/"
        target="_blank"
        className={theme === "light" ? "icon icon-mobile whatsapp light" : "icon icon-mobile whatsapp dark"}
        rel="noreferrer"
      ></a>
      <a onClick={() => handleModalMenu(true)} className={theme === "light" ? "icon-menu light" : "icon-menu dark"}></a>
    </div>
  )

  const NavigationLinks = ({ onClickHandler, mobile }) => {
    const links = [
      { ref: refs.welcomeBlock, text: "О Фирме" },
      { ref: refs.serviceBlock, text: "Услуги" },
      { ref: refs.objectBlock, text: "Объекты" },
      { ref: refs.departmentBlock, text: "Отделы" },
      { ref: refs.contactsBlock, text: "Контакты" },
    ]

    return (
      <div className={mobile ? "modal-menu-links" : "menu"}>
        {links.map((link, index) => (
          <a
            key={index}
            onClick={() => {
              scrollToRef(link.ref)
              if (onClickHandler) onClickHandler()
            }}
          >
            {link.text}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div>
      <header style={{ zIndex: "2" }}>
        {isPortrait ? (
          <div className="navigation">
            <NavigationLinks />
            <HeaderButtons />
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
            <MobileHeaderButtons />
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
        <NavigationLinks onClickHandler={() => handleModalMenu(false)} mobile />
      </ModalMenu>

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
          <TagWithIcon>Проекты планировок и застроек</TagWithIcon>
          <TagWithIcon>
            На новое строительство, расширение, реконструкция и техническое перевооружение действующих предприятий
          </TagWithIcon>
          <TagWithIcon>На строительство городских инженерных сооружений и коммуникаций</TagWithIcon>
          <TagWithIcon>
            На строительство наружных и внутренних инженерных сетей тепло и водоснабжения, канализации,
            электроснабжения, связи, газоснабжения и сооружений на них
          </TagWithIcon>
        </div>
        <div style={{ display: isPortrait ? "flex" : "", marginTop: isPortrait ? "16px" : "" }}>
          <TagWithIcon>На строительство котельных, установок холодоснабжений, очистных сооружений и.т.п.</TagWithIcon>
          <TagWithIcon>Геодезические и геологические работы в строительстве</TagWithIcon>
          <TagWithIcon>Техническое обследование зданий и сооружений</TagWithIcon>
        </div>

        <p style={{ fontSize: isPortrait ? "27px" : "6vw" }}>Кадастровые услуги:</p>

        <div style={{ display: isPortrait ? "flex" : "" }}>
          <TagWithIcon>Запрос любых кадастровых сведений на интересующие земельные участки</TagWithIcon>
          <TagWithIcon>Составление межевых планов на любые виды кадастровых работ</TagWithIcon>
          <TagWithIcon>Разработка карт (планов) на объекты землеустройства</TagWithIcon>
          <TagWithIcon>
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
            <TagItem category="All">Все работы</TagItem>
            <TagItem category="LivingBuilding">Жилые дома</TagItem>
            <TagItem category="SchoolInstitutions">Дошкольные и школьные учреждения</TagItem>
            <TagItem category="HealthFacilities">Объекты здравоохранения</TagItem>
            <TagItem category="PublicBuildings">Административные и общественные здания</TagItem>
            <TagItem category="SportBuildings">Спортивные сооружения</TagItem>
            <TagItem category="AgriculturalFacilities">Объекты сельского хозяйства</TagItem>
            <TagItem category="GeneralPlans">Генеральные планы</TagItem>
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
            <p className="array-next-icon" onClick={btnPrevDepartment} />
          </p>
          <p className={isPortrait ? "next-button" : "next-button mobile"}>
            <p className="array-next-icon" onClick={btnNextDepartment} />
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

export default Main;
