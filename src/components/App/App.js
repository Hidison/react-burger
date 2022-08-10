import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css";
import * as MainApi from "../../utils/MainApi.js";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

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
      <OrderDetails
        modalVisible={orderModalVisible}
        handleCloseModal={closeAllModal}
      />
      <IngredientDetails
        title={"Детали ингредиента"}
        modalVisible={ingredientModalVisible}
        handleCloseModal={closeAllModal}
        selectedIngredient={selectedIngredient}
      />
    </div>
  );
}

export default App;
