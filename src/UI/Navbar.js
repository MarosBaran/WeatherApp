import classes from "./Navbar.module.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchActions } from "../store/fetch-slice";
import useInput from "../hooks/useInput";

const Navbar = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBluHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const dispatch = useDispatch();

  const searchHandler = (event) => {
    event.preventDefault();

    dispatch(fetchActions.setLocationState({ locationState: true }));
    dispatch(fetchActions.setCity(""));
  };

  const cityHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid) {
      return;
    }

    dispatch(fetchActions.setLocationState({ locationState: false }));
    dispatch(fetchActions.setWeatherInfo(""));
    dispatch(fetchActions.setCity({ city: enteredName }));
    resetNameInput();
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.input}>
        <input
          className={nameInputHasError ? classes.invalid : ""}
          type="text"
          placeholder={nameInputHasError ? "Please enter city" : "Type in city"}
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        ></input>
        <motion.button
          whileHover={{ backgroundColor: "#00BCFF" }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={cityHandler}
        >
          Search
        </motion.button>
      </div>
      <div className={classes.actionDiv}>
        <motion.button
          type="button"
          whileHover={{ backgroundColor: "#00BCFF" }}
          transition={{ type: "spring", stiffness: 200 }}
          className={classes.action}
          onClick={searchHandler}
        >
          Search your location
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
