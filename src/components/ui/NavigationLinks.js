"use client"

import React from "react"

const NavigationLinks = ({ onClickHandler, mobile, refs, scrollToRef }) => {
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

export default React.memo(NavigationLinks)

