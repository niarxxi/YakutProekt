import React, { useCallback, useEffect, useState } from "react";
import "./ModalMenu.css";

const ModalMenu= ({ show, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 800);
      document.removeEventListener("keydown", handleKeyDown);
      return () => clearTimeout(timer);
    }
  }, [show, handleKeyDown]);

  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={`modal-menu-backdrop ${show ? "show" : ""}`}
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClose}
    >
      <div className="modal-menu-content" onClick={(e) => e.stopPropagation()}>
    
        {children}
        
      </div>
    </div>
  );
};

export default ModalMenu;
