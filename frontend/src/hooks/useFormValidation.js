// eslint-disable-next-line
import React, {useState, useEffect} from "react";

const useFormValidation = (theFirstInput, theSecondInput) => {
  const [isTheFirstValid, setIsTheFirstValid] = useState(false);
  const [isTheSecondValid, setIsTheSecondValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);

  function handleTheFirstInputChange() {
    if(theFirstInput.current.validity.valid) {
      setIsTheFirstValid(true);
    }
    else {
      setIsTheFirstValid(false);
    }
  }

  function handleTheSecondInputChange() {
    if(theSecondInput.current.validity.valid) {
      setIsTheSecondValid(true);
    }
    else {
      setIsTheSecondValid(false);
    }
  }

  function resetValid() {
    setIsTheFirstValid(false);
    setIsTheSecondValid(false);
  }

  function activeValid() {
    setIsTheFirstValid(true);
    setIsTheSecondValid(true);
  }

  useEffect(() => {
    setIsButtonValid(isTheFirstValid && isTheSecondValid);
  }, [isTheFirstValid, isTheSecondValid])
  
  return {isButtonValid, handleTheFirstInputChange, handleTheSecondInputChange, resetValid, activeValid};
}

export default useFormValidation;