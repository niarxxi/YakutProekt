import React, { useState, useEffect, useRef } from "react";
import ModalWindow from "./ModalWindow";
import AllGallery from "./AllGallery";
import LivingBuilding from "./LivingBuilding";
import SchoolInstitutions from "./SchoolInstitutions";
import HealthFacilities from "./HealthFacilities";
import PublicBuildings from "./PublicBuildings";
import SportBuildings from "./SportBuildings";
import AgriculturalFacilities from "./AgriculturalFacilities";
import GeneralPlans from "./GeneralPlans";
import Review from "./Review";
import Theme from "./Theme";
import ModalMenu from "./ModalMenu";
import Resize from "./Resize";

const Main = () => {
  const isPortrait = Resize();

  const { theme, setTheme } = Theme();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleTheme = () => {
    if (isDarkTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const lightTheme = () => {
    setTheme("light");
  };

  const darkTheme = () => {
    setTheme("dark");
  };

  const renderComponent = () => {
    switch (selectedCategory) {
      case "All":
        return <AllGallery />;
      case "LivingBuilding":
        return <LivingBuilding />;
      case "SchoolInstitutions":
        return <SchoolInstitutions />;
      case "HealthFacilities":
        return <HealthFacilities />;
      case "PublicBuildings":
        return <PublicBuildings />;
      case "SportBuildings":
        return <SportBuildings />;
      case "AgriculturalFacilities":
        return <AgriculturalFacilities />;
      case "GeneralPlans":
        return <GeneralPlans />;
      default:
        return <AllGallery />;
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalMenu = () => {
    setShowModalMenu(true);
  };

  const handleCloseModalMenu = () => {
    setShowModalMenu(false);
  };

  const containerRef = useRef(null);
  const reviewWidthRef = useRef(0);

  const reviews = [
    <Review
      key={1}
      name="Vladislav M."
      link="https://t.me"
      text="Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока."
    />,
    <Review
      key={2}
      name="Maxim L."
      link="https://t.me"
      text="Отзыв оставленный Максимом."
    />,
    <Review
      key={3}
      name="Petr O."
      link="https://t.me"
      text="Подписывайся на телеграм канал."
    />,
  ];

  const visibleReviews = 3;

  const handleScroll = () => {
    const box = containerRef.current;
    const width = reviewWidthRef.current * visibleReviews;

    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = "auto";
      box.scrollLeft = box.scrollWidth - 2 * width;
      box.style.scrollBehavior = "smooth";
    }

    if (box.scrollLeft >= box.scrollWidth - width) {
      box.style.scrollBehavior = "auto";
      box.scrollLeft = width;
      box.style.scrollBehavior = "smooth";
    }
  };

  const btnPrevReview = () => {
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
    const box = containerRef.current;
    box.scrollLeft += reviewWidthRef.current;
  };

  useEffect(() => {
    const box = containerRef.current;
    const firstReview = box.querySelector(".review-card");
    reviewWidthRef.current = firstReview.clientWidth;
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollWidth - width) / 2;
    box.addEventListener("scroll", handleScroll);

    return () => {
      box.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scroll, setScroll] = useState(0);

  const scrollUp = () => {
    setScroll(window.scrollY);
  };

  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollUp);
  }, []);

  const toBlock = (height) => {
    window.scrollTo({ top: height, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <header style={{zIndex: "1"}}>
        {isPortrait ? (
          <div className="navigation">
            <div className="menu">
              <a onClick={upButton}>О Фирме</a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="700"
              >
                Услуги
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="1600"
              >
                Объекты
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="2200"
              >
                Отзывы
              </a>
              <a
                onClick={(e) => toBlock(e.target.getAttribute("height"))}
                height="3000"
              >
                Контакты
              </a>
            </div>
            <div className="header-buttons">
              <button onClick={handleOpenModal} className="btn">
                Связаться
              </button>

              <a
                href="https://t.me/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon telegram light"
                    : "icon telegram dark"
                }
              ></a>
              <a
                href="https://instagram.com/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon instagram light"
                    : "icon instagram dark"
                }
              ></a>

              <div className="switch" onClick={toggleTheme}>
                <div
                  className={theme === "light" ? "theme light" : "theme dark"}
                  style={{
                    transform: isDarkTheme
                      ? "translateX(38px)"
                      : "translate(0)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="navigation">
            <div className="switch switch-mobile" onClick={toggleTheme}>
              <div
                className={
                  theme === "light"
                    ? "theme theme-mobile light"
                    : "theme theme-mobile dark"
                }
                style={{
                  transform: isDarkTheme ? "translateX(8.6vw)" : "translate(0)",
                }}
              ></div>
            </div>
            <div className="header-buttons-mobile">
              <a
                href="https://t.me/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon icon-mobile telegram light"
                    : "icon icon-mobile telegram dark"
                }
              ></a>
              <a
                href="https://instagram.com/"
                target="_blank"
                className={
                  theme === "light"
                    ? "icon icon-mobile instagram light"
                    : "icon icon-mobile instagram dark"
                }
              ></a>
              <a
                onClick={handleOpenModalMenu}
                className={
                  theme === "light" ? "icon-menu light" : "icon-menu dark"
                }
              ></a>
            </div>
          </div>
        )}
      </header>

      <ModalWindow show={showModal} onClose={handleCloseModal}>
        <h2 style={{ color: "#4824ff", fontSize: isPortrait ? "40px" : "15vw", marginTop: isPortrait ? '' : '0' }}>Контакты</h2>
        {isPortrait ? (
        <p style={{ fontSize: "22px" }}>
          Вы можете связаться с нами в Телеграм <br /> или Инстаграм 👇
        </p> ) : (
          <p style={{ fontSize: "33px" }}>
          Вы можете связаться с нами в Телеграм <br /> или Инстаграм 👇
        </p>
        )}
      </ModalWindow>

      <ModalMenu show={showModalMenu} onClose={handleCloseModalMenu}>
        <a onClick={upButton}>О Фирме</a>
        <a
          onClick={(e) => toBlock(e.target.getAttribute("height"))}
          height="950"
        >
          Услуги
        </a>
        <a
          onClick={(e) => toBlock(e.target.getAttribute("height"))}
          height="2250"
        >
          Объекты
        </a>
        <a
          onClick={(e) => toBlock(e.target.getAttribute("height"))}
          height="3200"
        >
          Отзывы
        </a>
        <a
          onClick={(e) => toBlock(e.target.getAttribute("height"))}
          height="3900"
        >
          Контакты
        </a>
      </ModalMenu>

      {isPortrait ? (
        <div className="welcome-block">
          <div className="first-block">
            <h1 style={{ color: "#4824ff" }}>
              ОАО РПИИ <span className="title">Якутпроект</span> Республиканский
              проектно-изыскательский институт
            </h1>
            <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
              Был создан<span style={{ color: "#4824ff" }}> 1</span> <br />{" "}
              марта
              <span style={{ color: "#4824ff" }}> 1999 г.</span> в <br /> г.
              Якутск.
            </h2>
            <h3>
              <span style={{ color: "#4824ff" }}>Институт «Якутпроект» </span> —
              ведущая республиканская проектно-изыскательская организация,
              сочетающая бюджетные, корпоративные и коммерческие заказы. Мы
              предоставляем полный спектр услуг: от инженерных изысканий до
              разработки проектно-сметной документации, авторского надзора и
              функций генерального проектировщика. Институт имеет аккредитацию
              на проведение негосударственной экспертизы проектной документации
              и результатов инженерных изысканий.
            </h3>
          </div>

          <div className="main-image-box">
            <img
              className="first-image-layer"
              src="./images/logo-2-layer.png"
              draggable="false"
            />
            <img
              className="second-image-layer"
              src="./images/logo-1-layer.png"
              draggable="false"
            />
          </div>
        </div>
      ) : (
        <div className="welcome-block mobile">
          <div className="main-image-box mobile">
            <img
              className="first-image-layer mobile"
              src="./images/logo-2-layer.png"
              draggable="false"
            />
            <img
              className="second-image-layer mobile"
              src="./images/logo-1-layer.png"
              draggable="false"
            />
          </div>
          <div className="first-block mobile">
            <h1 style={{ color: "#4824ff" }}>
              ОАО РПИИ <span className="title">Якутпроект</span> Республиканский
              проектно-изыскательский институт
            </h1>
            <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
              Был создан<span style={{ color: "#4824ff" }}> 1</span> <br />{" "}
              марта
              <span style={{ color: "#4824ff" }}> 1999 г.</span> в <br /> г.
              Якутск.
            </h2>
            <h3>
              <span style={{ color: "#4824ff" }}>Институт «Якутпроект» </span> —
              ведущая республиканская проектно-изыскательская организация,
              сочетающая бюджетные, корпоративные и коммерческие заказы. Мы
              предоставляем полный спектр услуг: от инженерных изысканий до
              разработки проектно-сметной документации, авторского надзора и
              функций генерального проектировщика. Институт имеет аккредитацию
              на проведение негосударственной экспертизы проектной документации
              и результатов инженерных изысканий.
            </h3>
            <button onClick={handleOpenModal} className="btn mobile">
                Связаться
            </button>
          </div>
        </div>
      )}

      <div className={isPortrait ? "service-block" : "service-block mobile"}draggable="false">
        <h1 style={{ fontSize: isPortrait ? "52px" : "10vw" }}>УСЛУГИ</h1>
        <p style={{ fontSize: isPortrait ? "27px" : "6vw" }}>
          Основным видом деятельности института являются выполнение
          проектно-сметной документации:
        </p>

        <div style={{ display: isPortrait ? "flex" : ""}}>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            Проекты планировок и застроек
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            На новое строительство, расширение, реконструкция и техническое
            перевооружение действующих предприятий
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            На строительство городских инженерных сооружений и коммуникаций
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            На строительство наружных и внутренних инженерных сетей тепло и
            водоснабжения, канализации, электроснабжения, связи, газоснабжения и
            сооружений на них
          </p>
        </div>
        <div style={{ display: isPortrait ? "flex" : "", marginTop: isPortrait ? '16px' : '' }}>
        <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            На строительство котельных, установок холодоснабжений, очистных
            сооружений и.т.п.
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            Геодезические и геологические работы в строительстве
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            Техническое обследование зданий и сооружений
          </p>
        </div>

        <p style={{ fontSize: isPortrait ? "27px" : "6vw" }}>Кадастровые услуги:</p>

        <div style={{ display: isPortrait ? "flex" : ""}}>
        <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            Запрос любых кадастровых сведений на интересующие земельные участки
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            Составление межевых планов на любые виды кадастровых работ
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            Разработка карт (планов) на объекты землеустройства
          </p>
          <p className={isPortrait ? "tag" : "tag mobile"}>
            <p
              className={`tag-icon
                ${theme === 'light' ? 'tag-icon icon-dark' : 'tag-icon icon-light'} ${isPortrait ? '' : 'mobile'}
              `}
            />
            Анализ межевых планов получивших отказ (приостановку) при
            осуществлении государственного учета
          </p>
        </div>
      </div>

      <div className="object-block">
        <div className={isPortrait ? "first-block" : "first-block mobile"}>
          <h1 className={isPortrait ? "main-title" : "main-title mobile"}>Объекты</h1>
          <div style={{ position: "absolute", marginLeft: isPortrait ? "-560px" : "-50vw" }}>
            <p className={isPortrait ? "gradient-part-one" : "gradient-part-one mobile" }></p>
            {isPortrait ? (<p className="title-border">Объ</p>) : (<p className="title-border mobile">Объ</p>)}
          </div>
          <div style={{ position: "absolute", marginLeft: isPortrait ? "520px" : '50vw' }}>
            <p className={isPortrait ? "gradient-part-two" : "gradient-part-two mobile" }></p>
            {isPortrait ? (<p className="title-border">екты</p>) : (<p className="title-border mobile">екты</p>)}
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
              width: "90vw"
            }}
          >
            <p
              className={`tag ${selectedCategory === "All" ? "selected" : ""} ${isPortrait ? '' : 'mobile'}`}
              onClick={() => setSelectedCategory("All")}
            >
              Все работы
            </p>
            <p
              className={`tag ${
                selectedCategory === "LivingBuilding" ? "selected" : ""
              } ${isPortrait ? '' : 'mobile'}`}
              onClick={() => setSelectedCategory("LivingBuilding")}
            >
              Жилые дома
            </p>
            <p
              className={`tag ${
                selectedCategory === "SchoolInstitutions" ? "selected" : ""
              } ${isPortrait ? '' : 'mobile'}`}
              onClick={() => setSelectedCategory("SchoolInstitutions")}
            >
              Дошкольные и школьные учреждения
            </p>
            <p
              className={`tag ${
                selectedCategory === "HealthFacilities" ? "selected" : ""
              } ${isPortrait ? '' : 'mobile'}`}
              onClick={() => setSelectedCategory("HealthFacilities")}
            >
              Объекты здравоохранения
            </p>
            <p
              className={`tag ${
                selectedCategory === "PublicBuildings" ? "selected" : ""
              } ${isPortrait ? '' : 'mobile'}`}
              onClick={() => setSelectedCategory("PublicBuildings")}
            >
              Административные и общественные здания
            </p>
            <p
              className={`tag ${
                selectedCategory === "SportBuildings" ? "selected" : ""
              } ${isPortrait ? '' : 'mobile'}`}
              onClick={() => setSelectedCategory("SportBuildings")}
            >
              Спортивные сооружения
            </p>
            <p
              className={`tag ${
                selectedCategory === "AgriculturalFacilities" ? "selected" : ""
              } ${isPortrait ? '' : 'mobile'}`}
              onClick={() => setSelectedCategory("AgriculturalFacilities")}
            >
              Объекты сельского хозяйства
            </p>
            <p
              className={`tag ${
                selectedCategory === "GeneralPlans" ? "selected" : ""
              } ${isPortrait ? '' : 'mobile'}`}
              onClick={() => setSelectedCategory("GeneralPlans")}
            >
              Генеральные планы
            </p>
          </div>
        </div>      
        <div
          className="content"
          style={{ marginLeft: "-5vw", marginRight: "-5vw" }}
        >
          {renderComponent()}
        </div>
      </div>

      <div className={isPortrait ? "review-block" : "review-block mobile"}>
        <h1 style={{ fontSize: isPortrait ? '50px' : '10vw'}}>ОТЗЫВЫ</h1>
        <p className={isPortrait ? "description" : "description mobile"}>
          Отзывы клиентов, написанные со своих{" "}
          <span className="selecting"> личных аккаунтов </span>Телеграм. Всё
          прозрачно! <br /> Любой отзыв можно{" "}
          <span className="selecting"> открыть </span>в Телеграм и{" "}
          <span className="selecting"> спросить </span>об впечатлениях работы с
          нами <br /> у создателя отзыва лично.
        </p>

        <div className={isPortrait ? "review-carause1" : "review-carause1 mobile"}>
          <div className={isPortrait ? "review-container" : "review-container mobile"} ref={containerRef}>
            {reviews.slice(-visibleReviews)}
            {reviews}
            {reviews.slice(0, visibleReviews)}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className={isPortrait ? "next-button" : "next-button mobile"} style={{ transform: "rotate(180deg)" }}>
            <p className="array-next-icon" onClick={btnPrevReview} />
          </p>
          <p className={isPortrait ? "next-button" : "next-button mobile"}>
            <p className="array-next-icon" onClick={btnNextReview} />
          </p>
        </div>
      </div>

      <div className={isPortrait ? "contacts-block" : "contacts-block mobile"}>
        <h1 style={{ fontSize: isPortrait ? "52px" : "10vw", paddingBottom: isPortrait ? "20px" : "0" }}>КОНТАКТЫ</h1>

        <ol className={isPortrait ? "contacts-points" : "contacts-points mobile"}>
          <li
            className={
              theme === "light" ? "point address" : "point address-dark"
            }
          >
            <span style={{ color: "#4824ff" }}>Место нахождения:</span> 677000,
            Республика Саха (Якутия), г. Якутск, ул. Аммосова, д. 8
          </li>
          <li
            className={
              theme === "light" ? "point telephone" : "point telephone-dark"
            }
          >
            <span style={{ color: "#4824ff" }}>Тел/Факс:</span> (4112) 34-15-09
          </li>
          <li
            className={theme === "light" ? "point email" : "point email-dark"}
          >
            <span style={{ color: "#4824ff" }}>E-mail:</span>{" "}
            info@yakutproekt.ru
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
            <span style={{ color: "#4824ff" }}>
              Расчетный счет АКБ «Алмазэргиэнбанк» ОАО, г.Якутск:
            </span>{" "}
            <br />№ 40 702 810 200 000 000 873
          </li>
          <li className="point">
            <span style={{ color: "#4824ff" }}>Кор. счет:</span> № 30 101 810
            300 000 000 770
          </li>
          <li className="point">
            <span style={{ color: "#4824ff" }}>БИК:</span> 049805770
          </li>
        </ol>
      </div>

      <div className="footer">© ОАО РПИИ ЯКУТПРОЕКТ</div>

      <button
        className={scroll < 1960 ? "" : isPortrait ? "btn-up" : "btn-up mobile"}
        onClick={upButton}
      ></button>
    </div>
  );
};

export default Main;
