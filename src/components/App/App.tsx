import { BrowserRouter as Router } from "react-router-dom";
import AppStyles from "./App.module.css";
import { getCookie } from "../../utils/utils";
import { useEffect, useRef } from "react";
import { SET_AUTH } from "../../services/actions/Auth";
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import AppHeader from "../AppHeader/AppHeader";
import { getIngredients } from "../../services/actions/BurgerIngredients";
import { useDispatch } from "../../services/hooks";
import { SET_APP_HEIGHT } from "../../services/actions/App";

function App() {
  const dispatch = useDispatch();

  const aToken: string | undefined = getCookie("accessToken");
  const rToken: string | null = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (aToken && rToken) {
      dispatch({
        type: SET_AUTH,
        payload: true,
      });
    } else {
      dispatch({
        type: SET_AUTH,
        payload: false,
      });
    }
  }, [aToken, dispatch, rToken]);

  const AppRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    const height = AppRef && AppRef.current && AppRef.current.offsetHeight;
    dispatch({
      type: SET_APP_HEIGHT,
      payload: height,
    });
  }, [AppRef, dispatch]);

  return (
    <div ref={AppRef} className={AppStyles.App}>
      <Router>
        <AppHeader />
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;
