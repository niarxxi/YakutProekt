"use client"

import React from "react"

const MobileHeaderButtons = ({ handleModalMenu, theme }) => (
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

export default React.memo(MobileHeaderButtons)

