import PopupWithForm from "./PopupWithForm";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, inputRef, isLoading }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [isNameValid, setIsNameValid] = useState(false);
  const [description, setDescription] = useState(currentUser.about);
  const [isAboutValid, setIsAboutValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
    }
    if (currentUser) {
      setDescription(currentUser.about);
    }
    setIsNameValid(true);
    setIsAboutValid(true);
    // eslint-disable-next-line
  }, [currentUser, !isOpen]);

  useEffect(() => {
    setIsButtonValid(isAboutValid && isNameValid);
  }, [isNameValid, isAboutValid])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setIsNameValid(true);
    }
    else {
      setIsNameValid(false);
    }
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    if (e.target.validity.valid) {
      setIsAboutValid(true);
    }
    else {
      setIsAboutValid(false);
    }
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      textBtn="Сохранить"
      loadingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      isValid={isButtonValid}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className="form__input">
        <label className="label">
          <input
            id="input-title"
            className="form__item form__item_type_name"
            type="text"
            placeholder="Имя"
            required minLength="2"
            maxLength="40"
            autoComplete="off"
            value={name}
            onChange={handleNameChange}
            ref={inputRef}
          />
          <span className="form__input-error input-title-error"></span>
        </label>
        <label className="label">
          <input
            id="input-job"
            className="form__item form__item_type_job"
            type="text"
            placeholder="Вид деятельности"
            required
            minLength="2"
            maxLength="200"
            autoComplete="off"
            value={description}
            onChange={handleDescriptionChange}
            ref={inputRef}
          />
          <span className="form__input-error input-job-error"></span>
        </label>

      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;