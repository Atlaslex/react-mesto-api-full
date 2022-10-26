import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";


const SignUp = ({ title, titleBtn, isLogin, onSubmit }) => {
  const userEmail = useRef();
  const userPassword = useRef();
  const { isButtonValid, handleTheFirstInputChange, handleTheSecondInputChange } = useFormValidation(userEmail, userPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      email: userEmail.current.value,
      password: userPassword.current.value
    })
  }

  return (
    <div className="sign-up__container">
      <h2 className="form__title">{title}</h2>
      <form className="form form__page" name="sing-in" onSubmit={handleSubmit}>

        <fieldset className="form__input">
          <label className="label">
            <input
              id="input-email"
              className="form__item form__item_type_registration"
              type="email"
              placeholder="Email"
              required minLength="2"
              maxLength="40"
              autoComplete="off"
              onChange={handleTheFirstInputChange}

              ref={userEmail}
            />
            <span className="form__input-error"></span>
          </label>
          <label className="label">
            <input
              id="input-password"
              className="form__item form__item_type_registration"
              type="password"
              placeholder="Пароль"
              required
              minLength="8"
              maxLength="50"
              onChange={handleTheSecondInputChange}
              ref={userPassword}
            />
            <span className="form__input-error input-job-error"></span>
          </label>

        </fieldset>


        <button
          className={`button sign-up__authorization-button ${!isButtonValid && "sign-up__authorization-button_inactive"} ${isLogin && "button_type_login"}`}
          value={titleBtn}
          id="button-save"
          disabled={!isButtonValid}
        >
          {titleBtn}
        </button>
        {!isLogin && <p className="sign-up__description">Уже зарегистрированы? <Link to="/sign-in" className="link">Войти</Link></p>}
      </form>
    </div>
  )
}

export default SignUp;