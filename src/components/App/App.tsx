import { BrowserRouter as Router } from "react-router-dom";
import AppStyles from "./App.module.css";
import { getCookie } from "../../utils/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../services/actions/Auth";
import ModalSwitch from "../ModalSwitch/ModalSwitch";
import AppHeader from "../AppHeader/AppHeader";
import { getIngredients } from "../../services/actions/BurgerIngredients";

function App() {
  const dispatch: any = useDispatch();
  const aToken: string | undefined = getCookie("accessToken");
  const rToken: string | null = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (aToken && rToken) {
      dispatch({
        type: SET_AUTH,
        auth: true,
      });
    } else {
      dispatch({
        type: SET_AUTH,
        auth: false,
      });
    }
  }, [aToken, dispatch, rToken]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={AppStyles.App}>
      <Router>
        <AppHeader />
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;
