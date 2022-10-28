import React from "react";

const InfoTooltip = ({ image, text }) => {
  return (

    <>
      <img src={image} className="popup__tick" alt="Отметка" />
      <h2 className="popup__title-info">{text}</h2>
    </>
  )
}

export default InfoTooltip;