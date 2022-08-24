import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

function App() {
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);

  const closeAllModal = () => {
    setOrderModalVisible(false);
    setIngredientModalVisible(false);
  };

  const openOrderModal = () => {
    setOrderModalVisible(true);
  };

  const openIngredientModal = () => {
    setIngredientModalVisible(true);
  };

  return (
    <div className={AppStyles.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={AppStyles.main}>
          <BurgerIngredients handleOpenModal={openIngredientModal} />
          <BurgerConstructor handleOpenModal={openOrderModal} />
        </main>
      </DndProvider>
      <Modal modalVisible={orderModalVisible} handleCloseModal={closeAllModal}>
        <OrderDetails />
      </Modal>
      <Modal
        title={"Детали ингредиента"}
        modalVisible={ingredientModalVisible}
        handleCloseModal={closeAllModal}
      >
        <IngredientDetails />
      </Modal>
    </div>
  );
}

export default App;
