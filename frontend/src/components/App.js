import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from '../context/CurrentUserContext';
import DeleteCardPopup from "./DeleteCardPopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, withRouter } from 'react-router-dom';
import Register from './Register';
import { getUserData, authorize, register, signOut } from "../utils/auth";
import AcceptRegist from '../images/Accept-registration.png';
import RejectRegist from '../images/rejectRegistration.png'
import ProtectedRoute from "./ProtectedRoute";
import Login from './Login';
import PopupWithoutForm from "./PopupWithoutForm";
import InfoTooltip from './InfoTooltip';


function App({ history }) {

  const [selectedCard, setSelectCard] = useState({ card: {} });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmationDelete, setIsConfirmationDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [cardToBeDeleted, setCardToBeDeleted] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [textForInfoTooltip, setTextForInfoTooltip] = useState('');
  const [imageForInfoTooltip, setImageForInfoTooltip] = useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getUserEmail();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  const getUserEmail = async (token) => {
    try {
      const res = await getUserData(token);
      if (res.email) {
        setUserEmail(res.email);
        setLoggedIn(true);
        history.push('/')
      } else {
        setLoggedIn(false);
      }
    } catch {
      console.error("Ошибка?");
    }
  }

  const closeAllPopups = () => {
    setSelectCard({ isOpen: false, card: {} });
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationDelete(false);
    setIsInfoTooltipPopupOpen(false);
    setImagePopupOpen(false);
  };

  function handleConfirmationDeleteClick() {
    setIsConfirmationDelete(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)

  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);

  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));

  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api.patchAvatarInfo(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));

  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => {

          return cards.filter(item => item !== card);

        })
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (isLiked) {
      api.deleteLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      api.setLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.patchUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);

  }

  function handleCardClick(card) {
    setSelectCard({ isOpen: true, card: card });
    setImagePopupOpen(!isImagePopupOpen);
  }

  function handleDeleteCardClick(card) {
    setCardToBeDeleted(card);
    setIsConfirmationDelete(true);

  }

  const handleSignIn = async ({ email, password }) => {
    try {
      const res = await authorize(email, password);
      // localStorage.setItem('token', res.token);
      setUserEmail(email);
      setLoggedIn(true);
      history.push('/');
    } catch {
      setIsInfoTooltipPopupOpen(true);
      setImageForInfoTooltip(RejectRegist);
      setTextForInfoTooltip("Неверный Email или пароль");
    }
  }

  // const handleSignOut = () => {
  //   if (localStorage.getItem('token')) {
  //     localStorage.removeItem('token')
  //     setLoggedIn(false);
  //     setUserEmail('');
  //   }
  // }
  const handleSignOut = async () => {
    try {
      const res = await signOut();
      setLoggedIn(false);
      setUserEmail('');
    } catch (err) {
      console.dir(err);
    }
  }



  const handleRegistration = async ({ email, password }) => {
    try {
      // eslint-disable-next-line
      const res = await register(email, password);
      setIsInfoTooltipPopupOpen(true);
      setImageForInfoTooltip(AcceptRegist);
      setTextForInfoTooltip("Вы успешно зарегистрировались!");
      handleSignIn({ email, password });
    } catch {
      setIsInfoTooltipPopupOpen(true);
      setImageForInfoTooltip(RejectRegist);
      setTextForInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
    }
  }



  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
          >

            <Header linkTitle="Выйти" link="/sign-in" onSignOut={handleSignOut} email={userEmail} loggedIn={loggedIn} />
            <Main
              onCardClick={handleCardClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onConfirmationDelete={handleConfirmationDeleteClick}
              onCardDelete={handleDeleteCardClick}
              cards={cards}
              onCardLike={handleCardLike}
            />
            <Footer />
          </ProtectedRoute>

          <Route path="/sign-up">
            <Register onRegistration={handleRegistration} loggedIn={loggedIn} />
          </Route>
          <Route path="/sign-in">
            <Login onLogIn={handleSignIn} loggedIn={loggedIn} />
          </Route>
        </Switch>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />



        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <DeleteCardPopup
          onSubmit={handleCardDelete}
          isOpen={isConfirmationDelete}
          onClose={closeAllPopups}
          card={cardToBeDeleted}
          isLoading={isLoading}
        >

        </DeleteCardPopup>


        <PopupWithoutForm
          name="info"
          nameContainer="popup__container-info"
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        >
          <InfoTooltip
            image={imageForInfoTooltip}
            text={textForInfoTooltip}
          />
        </PopupWithoutForm>
      </CurrentUserContext.Provider>

    </div>


  );
}




export default withRouter(App);;
