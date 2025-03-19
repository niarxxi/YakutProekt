"use client"

import React from "react"

const HeaderButtons = ({ handleModal, theme, toggleTheme, ui }) => (
  <div className="header-buttons">
    <button onClick={() => handleModal(true)} className="btn">
      Связаться
    </button>

    <a
      href="https://t.me/yakutproekt_bot"
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

export default React.memo(HeaderButtons)

