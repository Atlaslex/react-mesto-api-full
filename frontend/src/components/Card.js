import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `element__delete-button ${isOwn ? "element__delete-button-on" : ""
        }`;

    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? "element__like_on" : ""
        }`;

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }


    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <li className="element">
            <img
                className="element__element-img"
                alt={card.name}
                src={card.link}
                onClick={handleClick}
            />
            <div className="element__text-like">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-counter">
                    <button className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    ></button>
                    <h4 className="element__counter">{card.likes.length}</h4>
                </div>
            </div>
            <button
                className={cardDeleteButtonClassName}
                type="button"
                onClick={handleDeleteClick}
            >

            </button>

        </li>
    );
};

export default Card;