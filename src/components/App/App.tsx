import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css";
import data from "../utils/data";

function App() {
  return (
    <div className={AppStyles.App}>
      <AppHeader />
      <main className={AppStyles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
