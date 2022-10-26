describe("app works correctly at burger constructor", function () {
  before(function () {
    cy.visit("http://localhost:3000/");
  });

  it("should open burger constructor page", function () {
    cy.get("h1").should("contain", "Соберите бургер");
  });
});

describe("modal window works correctly", function () {
  it("modal windows opened and closed at close button", function () {
    cy.get('div[id="60d3b41abdacab0026a733c6"]').as("bun_first");

    cy.get("@bun_first").click();
    cy.get("div[class*='Modal_modal']").as("modal");
    cy.get("@modal").find("h2[class*='Modal_modalTitle']").as("ingredient_modal_title");
    cy.get("@modal")
      .find("figcaption[class*='IngredientDetails_modal__imageText']")
      .as("ingredient_title");
    cy.get("@modal")
      .find("button[class*='Modal_modal__closeButton']")
      .last()
      .as("modal_close_button");

    cy.url().should("contains", "/ingredients/60d3b41abdacab0026a733c6");
    cy.get("@ingredient_modal_title").should("contain", "Детали ингредиента");
    cy.get("@ingredient_title").should("contain", "Краторная булка N-200i");

    cy.get("@modal_close_button").click();
    cy.url().should("not.contains", "/ingredients/60d3b41abdacab0026a733c6");
  });

  it("modal windows opened and closed at overlay", function () {
    cy.get('div[id="60d3b41abdacab0026a733cc"]').as("main_ingredient_sauce");

    cy.get("@main_ingredient_sauce").click();
    cy.get("div[class*='Modal_modal']").as("modal");
    cy.get("@modal").find("h2[class*='Modal_modalTitle']").as("ingredient_modal_title");
    cy.get("@modal")
      .find("figcaption[class*='IngredientDetails_modal__imageText']")
      .as("ingredient_title");
    cy.get("div[class*='ModalOverlay_active']").as("overlay");

    cy.url().should("contains", "/ingredients/60d3b41abdacab0026a733cc");
    cy.get("@ingredient_modal_title").should("contain", "Детали ингредиента");
    cy.get("@ingredient_title").should("contain", "Соус Spicy-X");

    cy.get("@overlay").click(100, 100);
    cy.url().should("not.contains", "/ingredients/60d3b41abdacab0026a733cc");
  });

  it("modal windows opened and closed at esc", function () {
    cy.get('div[id="60d3b41abdacab0026a733c8"]').as("main_ingredient");

    cy.get("@main_ingredient").click();
    cy.get("div[class*='Modal_modal']").as("modal");
    cy.get("@modal").find("h2[class*='Modal_modalTitle']").as("ingredient_modal_title");
    cy.get("@modal")
      .find("figcaption[class*='IngredientDetails_modal__imageText']")
      .as("ingredient_title");

    cy.url().should("contains", "/ingredients/60d3b41abdacab0026a733c8");
    cy.get("@ingredient_modal_title").should("contain", "Детали ингредиента");
    cy.get("@ingredient_title").should("contain", "Филе Люминесцентного тетраодонтимформа");

    cy.get("body").trigger("keydown", { key: "Escape" });
    cy.url().should("not.contains", "/ingredients/60d3b41abdacab0026a733c8");
  });
});

describe("drugging works correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000/login");
    cy.get("div[class*='input_type_email']").as("email_input");
    cy.get("div[class*='input_type_password']").as("password_input");
    cy.get("button[class*='button_button']").as("submit_button");
    cy.get("@submit_button").should("have.attr", "disabled");

    cy.get("@email_input").type("sash.aleksandrov2011@yandex.ru");
    cy.get("@password_input").type("qwerty");
    cy.get("@submit_button").should("not.have.attr", "disabled");

    cy.get("@submit_button").click();
  });

  it("should drag buns ingredients", () => {
    cy.get('div[id="60d3b41abdacab0026a733c6"]').as("bun_first");
    cy.get('div[id="60d3b41abdacab0026a733c7"]').as("bun_second");
    cy.get("@bun_first").find("p[class*='counter_counter__num']").as("count_bun_first");
    cy.get("@bun_second").find("p[class*='counter_counter__num']").as("count_bun_second");
    cy.get('ul[id="list__bun_top"]').as("list__bun_top");
    cy.get('ul[id="list__bun_bottom"]').as("list__bun_bottom");
    cy.get("span[class*='BurgerConstructor_BurgerConstructor__totalPrice']").as("total_price");
    cy.get("div[class*='BurgerConstructor_BurgerConstructor__result']").as("result_container");
    cy.get("@result_container").find("button[class*='button_button']").as("order_button");

    cy.get("@count_bun_first").should("contain", "0");
    cy.get("@count_bun_second").should("contain", "0");
    cy.get("@list__bun_top").should("contain", "Выберите булку (верх)");
    cy.get("@list__bun_bottom").should("contain", "Выберите булку (низ)");
    cy.get("@total_price").should("contain", "0");
    cy.get("@order_button").should("have.attr", "disabled");

    cy.get("@bun_first").drag("@list__bun_top");
    cy.get("@list__bun_top").find("span[class*='constructor-element__price']").as("bun_top_price");
    cy.get("@list__bun_bottom")
      .find("span[class*='constructor-element__price']")
      .as("bun_bottom_price");
    cy.get("@count_bun_first").should("contain", "2");
    cy.get("@count_bun_second").should("contain", "0");
    cy.get("@list__bun_top").should("contain", "Краторная булка N-200i (верх)");
    cy.get("@list__bun_bottom").should("contain", "Краторная булка N-200i (низ)");
    cy.get("@bun_top_price").should("contain", "1255");
    cy.get("@bun_bottom_price").should("contain", "1255");
    cy.get("@total_price").should("contain", "2510");

    cy.get("@bun_second").drag("@list__bun_bottom");
    cy.get("@count_bun_first").should("contain", "0");
    cy.get("@count_bun_second").should("contain", "2");
    cy.get("@list__bun_top").should("contain", "Флюоресцентная булка R2-D3 (верх)");
    cy.get("@list__bun_bottom").should("contain", "Флюоресцентная булка R2-D3 (низ)");
    cy.get("@bun_top_price").should("contain", "988");
    cy.get("@bun_bottom_price").should("contain", "988");
    cy.get("@total_price").should("contain", "1976");
  });

  it("should drag main ingredients", () => {
    cy.get("span[class*='BurgerConstructor_BurgerConstructor__totalPrice']").as("total_price");
    cy.get("div[class*='BurgerConstructor_BurgerConstructor__result']").as("result_container");
    cy.get("@result_container").find("button[class*='button_button']").as("order_button");
    cy.get('div[id="60d3b41abdacab0026a733ce"]').as("main_ing");
    cy.get('div[id="60d3b41abdacab0026a733cb"]').as("main_ing_2");
    cy.get('div[id="60d3b41abdacab0026a733d4"]').as("main_ing_3");

    cy.get("@main_ing").find("p[class*='counter_counter__num']").as("count_main_ing");
    cy.get("@main_ing_2").find("p[class*='counter_counter__num']").as("count_main_ing_2");
    cy.get("@main_ing_3").find("p[class*='counter_counter__num']").as("count_main_ing_3");

    cy.get("@count_main_ing").should("contain", "0");
    cy.get("@count_main_ing_2").should("contain", "0");
    cy.get("@count_main_ing_3").should("contain", "0");

    cy.get('ul[id="list__main"]').as("list__main");

    cy.get("@main_ing").drag("@list__main");
    cy.get("@total_price").should("contain", "1991");
    cy.get("@order_button").should("not.have.attr", "disabled");
    cy.get("@count_main_ing").should("contain", "1");
    cy.get("@list__main").should("contain", "Соус традиционный галактический");
    cy.get("@list__main").should("contain", "15");

    cy.get("@main_ing_2").drag("@list__main");
    cy.get("@total_price").should("contain", "2415");
    cy.get("@count_main_ing_2").should("contain", "1");
    cy.get("@list__main").should("contain", "Биокотлета из марсианской Магнолии");
    cy.get("@list__main").should("contain", "424");

    cy.get("@main_ing_3").drag("@list__main");
    cy.get("@total_price").should("contain", "6557");
    cy.get("@count_main_ing_3").should("contain", "1");
    cy.get("@list__main").should("contain", "Сыр с астероидной плесенью");
    cy.get("@list__main").should("contain", "4142");

    cy.get("@main_ing_2").drag("@list__main");
    cy.get("@total_price").should("contain", "6981");
    cy.get("@count_main_ing_2").should("contain", "2");
  });
});

describe("ingredient del works correctly at burger constructor", function () {
  it("should click del button at ingredient", function () {
    cy.get('div[id="60d3b41abdacab0026a733ce"]').as("main_ing");
    cy.get("@main_ing").find("p[class*='counter_counter__num']").as("count_main_ing");
    cy.get("span[class*='BurgerConstructor_BurgerConstructor__totalPrice']").as("total_price");
    cy.get('ul[id="list__main"]').as("list__main");
    cy.get("@list__main")
      .find("span[class*='constructor-element__action']")
      .first()
      .as("ingredient_del_button");

    cy.get("@count_main_ing").should("contain", "1");

    cy.get("@ingredient_del_button").click();
    cy.get("@list__main").should("not.contain", "Соус традиционный галактический");
    cy.get("@count_main_ing").should("contain", "0");
    cy.get("@total_price").should("contain", "6966");
  });
});

describe("order works correctly at burger constructor", function () {
  it("handle click order button", function () {
    cy.get("div[class*='BurgerConstructor_BurgerConstructor__result']").as("result_container");
    cy.get("@result_container").find("button[class*='button_button']").as("order_button");

    cy.get("@order_button").should("not.have.attr", "disabled");

    cy.get("@order_button").click();
    cy.get("div[class*='Modal_modal']").as("modal");
    cy.get("@modal")
      .find("button[class*='Modal_modal__closeButton']")
      .last()
      .as("modal_close_button");
    cy.get("@modal").find("p[class*='text text_type_main-medium mb-15']").as("modal_title");
    cy.get("@modal").find("p[class*='text text_type_main-default mb-2']").as("modal_info_text");
    cy.get("@modal_title").should("contain", "идентификатор заказа");
    cy.get("@modal_info_text").should("contain", "Ваш заказ начали готовить");

    cy.get("@modal_close_button").click();
    cy.get("h1").should("contain", "Соберите бургер");
  });

  it("check modal at order", function () {
    cy.get("div[class*='Modal_modal']").as("modal");
    cy.get("@modal")
      .find("button[class*='Modal_modal__closeButton']")
      .last()
      .as("modal_close_button");
    cy.get("@modal").find("p[class*='text text_type_main-medium mb-15']").as("modal_title");
    cy.get("@modal").find("p[class*='text text_type_main-default mb-2']").as("modal_info_text");
    cy.get("@modal_title").should("contain", "идентификатор заказа");
    cy.get("@modal_info_text").should("contain", "Ваш заказ начали готовить");

    cy.get("@modal_close_button").click();
    cy.get("h1").should("contain", "Соберите бургер");
  });
});
