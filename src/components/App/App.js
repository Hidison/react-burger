import { BrowserRouter as Router } from "react-router-dom";
import AppStyles from "./App.module.css";
import { getCookie } from "../../utils/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_AUTH } from "../../services/actions/Auth";
import ModalSwitch from "../ModalSwitch/ModalSwitch";

function App() {
  const dispatch = useDispatch();
  const aToken = getCookie("accessToken");
  const rToken = localStorage.getItem("refreshToken");

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

  return (
    <div className={AppStyles.App}>
      <Router>
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;
