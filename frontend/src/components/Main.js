import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <button
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}>

          </button>
          <img className="profile__avatar" src={currentUser.avatar}
            alt="Аватар" />
        </div>
        <div className="profile__info">
          <div className="profile__info-text">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <ul className="elements">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />)
        )}
      </ul>
    </main>
  );
}
export default Main;