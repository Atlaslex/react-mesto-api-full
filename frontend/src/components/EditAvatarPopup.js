import React, { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = useRef();
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);

  useEffect(() => {
    setIsButtonValid(isLinkValid);
  }, [isLinkValid]);

  useEffect(() => {
    inputRef.current.value = '';
    setIsLinkValid(false);
  }, [isOpen])

  function handleLinkChange() {
    if (inputRef.current.validity.valid) {
      setIsLinkValid(true);
    }
    else {
      setIsLinkValid(false);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (

    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textBtn="Сохранить"
      loadingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleClick}
      isValid={isButtonValid}
      isLoading={isLoading}
    >
      <fieldset className="form__input" name="avatar">
        <label className="label">
          <input
            id="input-avatar"
            className="form__item form__item_type_link-avatar"
            type="url"
            name="link"
            placeholder="Сылка на аватар"
            required
            autoComplete="off"
            ref={inputRef}
            onChange={handleLinkChange}
          />
          <span className="form__input-error input-avatar-error"></span>
        </label>

      </fieldset>
    </PopupWithForm>


  )
}

export default EditAvatarPopup;