import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
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

const ModalSwitch = () => {
  const [ingredientModalVisible, setIngredientModalVisible] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    setIngredientModalVisible(false);
    history.goBack();
  };

  return (
    <>
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
          <OrdersPage />
        </ProtectedRoute>
        <Route path="/ingredients/:ingredientId" exact={true}>
          <IngredientPage />
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
    </>
  );
};

export default ModalSwitch;
