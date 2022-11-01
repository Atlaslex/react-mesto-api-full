// eslint-disable-next-line
import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../hooks/useFormValidation";


function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onChange, minLength, maxLength }) {
  const linkInputRef = useRef();
  const nameInputRef = useRef();
  const { isButtonValid, handleTheFirstInputChange, handleTheSecondInputChange, resetValid } = useFormValidation(nameInputRef, linkInputRef);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    nameInputRef.current.value = '';
    linkInputRef.current.value = '';
    resetValid();
    // eslint-disable-next-line
  }, [isOpen])

  function handleErrorMessage(e) {
    if (!e.target.validity.valid) {
      setIsValid(false);
      setErrorMessage(e.target.validationMessage);
    }
    else
    {
      setIsValid(true);
      setErrorMessage('');
    }

    onChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      link: linkInputRef.current.value,
      name: nameInputRef.current.value
    });
  }

  return (
    <PopupWithForm

      name="add-image"
      title="Новое место"
      textBtn="Создать"
      loadingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isButtonValid}
      isLoading={isLoading}
    >
      <fieldset className="form__input" name="addcard">
        <label className="label">
          <input 
          id="input-name" 
          className="form__item form__item_type_location-name"
          // {`"form__item form__item_type_location-name" ${!isValid && "form__input_type_error"}`}
          type="text" 
          name="name"
          placeholder="Название" 
          ref={nameInputRef} 
          onChange={handleTheFirstInputChange} 
          required minLength="2" 
          maxLength="30" 
          autoComplete="off" />
          <span 
          className="form__input-error input-name-error"
          onChange={handleErrorMessage}
          
          ></span>
        </label>
        <label className="label">
          <input id="input-link" className="form__item form__item_type_link-img" type="url" name="link"
            placeholder="Сылка на картинку" ref={linkInputRef} onChange={handleTheSecondInputChange} required autoComplete="off" />
          <span className="form__input-error input-link-error"></span>
        </label>

      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;