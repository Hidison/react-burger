import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css";
import * as MainApi from "../../utils/MainApi.js";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const ModalOrderDetails = ({ modalVisible, handleCloseModal }) => {
  return ReactDOM.createPortal(
    <OrderDetails
      modalVisible={modalVisible}
      handleCloseModal={handleCloseModal}
    />,
    document.body
  );
};

const ModalIngredientDetails = ({
  modalVisible,
  handleCloseModal,
  selectedIngredient,
}) => {
  return ReactDOM.createPortal(
    <IngredientDetails
      modalVisible={modalVisible}
      handleCloseModal={handleCloseModal}
      selectedIngredient={selectedIngredient}
    />,
    document.body
  );
};

function App() {
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState({});

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

  useEffect(() => {
    MainApi.getIngredients()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={AppStyles.App}>
      <AppHeader />
      {data !== null && (
        <main className={AppStyles.main}>
          <BurgerIngredients
            data={data}
            setSelectedIngredient={setSelectedIngredient}
            handleOpenModal={openIngredientModal}
          />
          <BurgerConstructor data={data} handleOpenModal={openOrderModal} />
        </main>
      )}
      <ModalOrderDetails
        modalVisible={orderModalVisible}
        handleCloseModal={closeAllModal}
      />
      <ModalIngredientDetails
        modalVisible={ingredientModalVisible}
        handleCloseModal={closeAllModal}
        selectedIngredient={selectedIngredient}
      />
    </div>
  );
}

export default App;
