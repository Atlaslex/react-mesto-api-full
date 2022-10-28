import React from "react";

function Popup({ name, nameContainer, isOpen, onClose, children }) {
  function handleCLoseOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  }

  if (isOpen) {
    window.addEventListener('keydown', handleEscClose);
  }

  function handleEscClose(e) {
    e.key === "Escape" && closePopup();
  }

  function closePopup() {
    window.removeEventListener('keydown', handleEscClose);
    onClose();
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleCLoseOverlayClick}
    >
      <div className={nameContainer}>
        <button
          onClick={closePopup}
          type="button"
          className="popup__close"
          aria-label="Закрыть окно"
        />
        {children}
      </div>
    </div>
  );
}

export default Popup;