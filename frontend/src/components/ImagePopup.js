import { useEffect } from "react";

function ImagePopup({ card, onClose, isOpen }) {

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
    // eslint-disable-next-line
  }, [isOpen]);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  function handleCloseOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

   return (
    <div
      className={`popup popup_type_img ${card.isOpen ? 'popup_opened' : ''}`}
      onClick={handleCloseOverlayClick}
    >
      <div
        className="popup__img-container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <div className="popup__img-title">
          <img className="popup__image" alt={card.card.name} src={card.card.link} />
          <h2 className="popup__title">{card.card.name}</h2>
        </div>
      </div>
    </div>
  );
}
export default ImagePopup;