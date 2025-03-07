"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const Department = (props) => {
  const [isPortrait, setIsPortrait] = useState(true)
  const contentRef = useRef(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const resizeObserver = useRef(null)
  const scrollTimeout = useRef(null)

  const checkOverflowAndScroll = useCallback(() => {
    const content = contentRef.current
    if (!content) return

    const isOverflowing = content.scrollHeight > content.clientHeight
    setHasOverflow(isOverflowing)

    if (isOverflowing) {
      const scrolledToBottom = content.scrollHeight - content.scrollTop - content.clientHeight < 2
      setIsAtBottom(scrolledToBottom)
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }

    scrollTimeout.current = setTimeout(() => {
      checkOverflowAndScroll()
    }, 100)
  }, [checkOverflowAndScroll])

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerWidth > window.innerHeight)
    }

    checkOrientation()

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(checkOrientation)
      observer.observe(document.documentElement)

      return () => observer.disconnect()
    } else {
      window.addEventListener("resize", checkOrientation)
      return () => window.removeEventListener("resize", checkOrientation)
    }
  }, [])

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    checkOverflowAndScroll()

    content.addEventListener("scroll", handleScroll, { passive: true })


    if (typeof ResizeObserver !== "undefined") {
      resizeObserver.current = new ResizeObserver(checkOverflowAndScroll)
      resizeObserver.current.observe(content)
    }

    const mutationObserver = new MutationObserver(checkOverflowAndScroll)
    mutationObserver.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    const timeoutId = setTimeout(checkOverflowAndScroll, 500)

    return () => {
      content.removeEventListener("scroll", handleScroll)
      if (resizeObserver.current) {
        resizeObserver.current.disconnect()
      }
      mutationObserver.disconnect()
      clearTimeout(timeoutId)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [props.text, checkOverflowAndScroll, handleScroll])

  return (
    <div className={isPortrait ? "department-card" : "department-card mobile"}>
      <div
        ref={contentRef}
        className={`
          ${isPortrait ? "department-content" : "department-content mobile"}
          ${hasOverflow ? "has-overflow" : ""}
          ${isAtBottom ? "scrolled-to-bottom" : ""}
        `}
      >
        <div style={{ padding: "10px 20px 0 25px" }}>
          <div style={{ display: "flex", placeItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: isPortrait ? "" : "7vw" }}>{props.name}</h2>
          </div>
          <p className={isPortrait ? "department" : "department mobile"}>{props.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Department;