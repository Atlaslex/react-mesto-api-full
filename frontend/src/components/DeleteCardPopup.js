import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onSubmit, onClose, card, isLoading }) {

  function handleClick(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (

    <PopupWithForm

      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleClick}
      isValid={true}
      name="delete"
      title="Вы уверены?"
      textBtn="Да"
      loadingText="Удаление..."
      isLoading={isLoading}
    >
    </PopupWithForm>

  )
}

export default DeleteCardPopup;


