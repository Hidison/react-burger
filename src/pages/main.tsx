import React, { FC, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainStyles from "./main.module.css";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import Modal from "../components/Modal/Modal";
import OrderDetails from "../components/OrderDetails/OrderDetails";

interface IMainPage {
  setIngredientModalVisible: Function;
}

const MainPage: FC<IMainPage> = ({ setIngredientModalVisible }) => {
  const [orderModalVisible, setOrderModalVisible] = useState<boolean>(false);

  const closeAllModal: Function = () => {
    setOrderModalVisible(false);
  };

  const openOrderModal: Function = () => {
    setOrderModalVisible(true);
  };

  const openIngredientModal: Function = () => {
    setIngredientModalVisible(true);
  };
  return (
    <>
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

export default MainPage;
