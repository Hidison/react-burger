import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import ModalSwitchStyles from "./ModalSwitch.module.css";
import ForgotPasswordPage from "../../pages/forgot-password";
import IngredientPage from "../../pages/ingredient";
import LoginPage from "../../pages/login";
import MainPage from "../../pages/main";
import NotFound404 from "../../pages/not-found";
import OrdersPage from "../../pages/orders";
import ProfilePage from "../../pages/profile";
import RegisterPage from "../../pages/register";
import ResetPasswordPage from "../../pages/reset-password";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Location } from "history";
import FeedPage from "../../pages/feed";
import FeedPageID from "../../pages/feed-id";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_START,
  WS_CONNECTION_START_AUTH,
} from "../../services/actions/wsActionTypes";
import { getMessages, getMessagesAuth, getWsConnected } from "../../services/selectors";
import OrderDataDetails from "../OrderDataDetails/OrderDataDetails";
import Loader from "../UI/Loader/Loader";
import { getWsError } from "../../services/selectors/getWsError";
import WsConnectedError from "../WsConnectedError/WsConnectedError";

const ModalSwitch = () => {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const messagesAuth = useSelector(getMessagesAuth);
  const wsConnected: boolean = useSelector(getWsConnected);
  const isWsError = useSelector(getWsError);

  const [ingredientModalVisible, setIngredientModalVisible] = useState<boolean>(true);
  const [orderModalVisible, setOrderModalVisible] = useState<boolean>(false);
  const location = useLocation<{ background: Location }>();
  const history = useHistory();
  const background = location.state && location.state.background;

  const handleModalClose: Function = () => {
    setIngredientModalVisible(false);
    history.goBack();
  };

  const feedLocation = location.pathname.includes("feed");
  const ordersLocation = location.pathname.includes("orders");

  useEffect(() => {
    if (feedLocation) {
      dispatch({
        type: WS_CONNECTION_START,
      });
    } else if (ordersLocation) {
      dispatch({
        type: WS_CONNECTION_START_AUTH,
      });
    }

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    };
  }, [dispatch, feedLocation, ordersLocation]);

  return (
    <main className={ModalSwitchStyles.main}>
      <Switch location={background || location}>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
          <OrdersPage
            setOrderModalVisible={setOrderModalVisible}
            modalVisible={orderModalVisible}
          />
        </ProtectedRoute>
        <Route path="/ingredients/:ingredientId" exact={true}>
          <IngredientPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          {isWsError ? (
            <WsConnectedError />
          ) : wsConnected && messages ? (
            <FeedPageID modalVisible={orderModalVisible} />
          ) : (
            <div style={{ marginTop: "60px" }}>
              <Loader />
            </div>
          )}
        </Route>
        <Route path="/profile/orders/:id" exact={true}>
          {isWsError ? (
            <WsConnectedError />
          ) : wsConnected && messagesAuth ? (
            <FeedPageID modalVisible={orderModalVisible} />
          ) : (
            <div style={{ marginTop: "60px" }}>
              <Loader />
            </div>
          )}
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage setOrderModalVisible={setOrderModalVisible} modalVisible={orderModalVisible} />
        </Route>
        <Route path="/" exact={true}>
          <MainPage setIngredientModalVisible={setIngredientModalVisible} />
        </Route>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:ingredientId">
          <Modal
            title={"Детали ингредиента"}
            modalVisible={ingredientModalVisible}
            handleCloseModal={handleModalClose}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal title={""} modalVisible={orderModalVisible} handleCloseModal={handleModalClose}>
            <OrderDataDetails modalVisible={orderModalVisible} />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal title={""} modalVisible={orderModalVisible} handleCloseModal={handleModalClose}>
            <OrderDataDetails modalVisible={orderModalVisible} />
          </Modal>
        </Route>
      )}
    </main>
  );
};

export default ModalSwitch;
