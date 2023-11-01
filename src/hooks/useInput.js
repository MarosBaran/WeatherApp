import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBluHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  const inputClasses = hasError ? "invalid" : "";
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    inputClasses,
    valueChangeHandler,
    inputBluHandler,
    reset,
  };
};

export default useInput;
