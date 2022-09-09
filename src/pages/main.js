import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainStyles from "./main.module.css";
import PropTypes from "prop-types";
import AppHeader from "../components/AppHeader/AppHeader";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import Modal from "../components/Modal/Modal";
import OrderDetails from "../components/OrderDetails/OrderDetails";

const MainPage = ({ setIngredientModalVisible }) => {
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  const closeAllModal = () => {
    setOrderModalVisible(false);
  };

  const openOrderModal = () => {
    setOrderModalVisible(true);
  };

  const openIngredientModal = () => {
    setIngredientModalVisible(true);
  };
  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={MainStyles.main}>
          <BurgerIngredients handleOpenModal={openIngredientModal} />
          <BurgerConstructor handleOpenModal={openOrderModal} />
        </main>
      </DndProvider>
      <Modal modalVisible={orderModalVisible} handleCloseModal={closeAllModal}>
        <OrderDetails />
      </Modal>
    </>
  );
};

MainPage.propTypes = {
  setIngredientModalVisible: PropTypes.func,
};

export default MainPage;
