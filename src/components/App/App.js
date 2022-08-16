import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css";
import * as MainApi from "../../utils/MainApi.js";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { IngredientContext } from "../../contexts/ingredientsContext";
import { OrderContext } from "../../contexts/orderContext";

function App() {
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [ingredientModalVisible, setIngredientModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [orderNumber, setOrderNumber] = useState(1234);

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

  const getOrderNumber = (id) => {
    MainApi.postOrder(id)
      .then((res) => {
        setOrderNumber(res.order.number);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={AppStyles.App}>
      <IngredientContext.Provider value={{ data }}>
        <OrderContext.Provider value={{ orderNumber }}>
          <AppHeader />
          {data !== null && (
            <main className={AppStyles.main}>
              <BurgerIngredients
                data={data}
                setSelectedIngredient={setSelectedIngredient}
                handleOpenModal={openIngredientModal}
              />
              <BurgerConstructor
                handleOpenModal={openOrderModal}
                getOrderNumber={getOrderNumber}
              />
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
        </OrderContext.Provider>
      </IngredientContext.Provider>
    </div>
  );
}

export default App;
