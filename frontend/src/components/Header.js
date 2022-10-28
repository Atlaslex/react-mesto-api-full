import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ linkTitle, link, onSignOut, email }) {

  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  if (isDesktop) {
    return (

      <header className="header">
        <div className="header__container">
          <div className="header__logo"></div>
          <div className="header__flex">
            <span className="header__email">{email}</span>
            <Link to={link} className="link header__link" onClick={onSignOut}>{linkTitle}</Link>
          </div>

        </div>

      </header>

    );
  }
  else {
    return (
      <>

        <div
          className={`header__menu ${isMenuOpen && "header__menu_open"
            }`}
        >
          <span className="header__email">{email}</span>
          <Link to={link} className="link header__link" onClick={onSignOut}>{linkTitle}</Link>
        </div>

        <header className="header">
          <div className="header__container">
            <div className="header__logo"></div>
            <button
              className={`${isMenuOpen ? "header__button-mobile_exit" : "header__button-mobile"}`}
              onClick={toggleMenu}
            >

            </button>

          </div>

        </header>
      </>
    )
  }
}

export default Header;