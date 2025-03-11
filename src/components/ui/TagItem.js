"use client"

import React from "react"

const TagItem = ({ category, children, isPortrait, selectedCategory, setSelectedCategory }) => (
  <p
    className={`tag ${selectedCategory === category ? "selected" : ""} ${isPortrait ? "" : "mobile"}`}
    onClick={() => setSelectedCategory(category)}
  >
    {children}
  </p>
)

export default React.memo(TagItem)

