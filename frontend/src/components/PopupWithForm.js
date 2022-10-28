import { useEffect } from "react";

function PopupWithForm({ name, title, isOpen, onClose, children, onSubmit, isLoading, loadingText, textBtn }) {

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
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleCloseOverlayClick} >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно"
        >

        </button>
        <form className="form form_type_edit" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="form__title">{title}</h2>
          <fieldset className="form__input">
            {children}
            <button className="form__save" type="submit" name="save">{isLoading ? loadingText : textBtn}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;