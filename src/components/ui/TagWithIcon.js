import React from "react"

const TagWithIcon = ({ children, isPortrait, theme }) => (
  <p className={isPortrait ? "tag" : "tag mobile"}>
    <span
      className={`tag-icon ${theme === "light" ? "tag-icon icon-dark" : "tag-icon icon-light"} ${isPortrait ? "" : "mobile"}`}
    />
    {children}
  </p>
)

export default React.memo(TagWithIcon)

