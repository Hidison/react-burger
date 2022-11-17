import React, { FC, useEffect } from "react";
import ProfileNav from "../components/ProfileNav/ProfileNav";
import OrdersStyles from "./orders.module.css";
import ProfileStyles from "./profile.module.css";
import { Redirect, useHistory } from "react-router-dom";
import MyScrollbar from "../components/UI/myScrollbar/MyScrollbar";
import OrderData from "../components/OrderData/OrderData";
import { useDispatch, useSelector } from "../services/hooks";
import { getMessagesAuth } from "../services/selectors";
import Loader from "../components/UI/Loader/Loader";
import { updateToken } from "../services/actions/Login";
import { getWsAuthClosed, getWsAuthError } from "../services/selectors/getWsError";
import WsConnectedError from "../components/WsConnectedError/WsConnectedError";
import { TMessageOrder } from "../types";

interface IOrdersPage {
  modalVisible: boolean;
  setOrderModalVisible: Function;
}

const OrdersPage: FC<IOrdersPage> = ({ setOrderModalVisible, modalVisible }) => {
  const dispatch = useDispatch();

  const isWsAuthError = useSelector(getWsAuthError);
  const isWsAuthClosed = useSelector(getWsAuthClosed);
  const messages = useSelector(getMessagesAuth);

  const { heightApp } = useSelector((state) => state.app);
  const { heightHeader } = useSelector((state) => state.appHeader);

  const rToken = localStorage.getItem("refreshToken");

  const ordersListHeight = heightApp - heightHeader - 42;

  const history = useHistory();

  const messagesReverse =
    messages && messages.success && messages.orders.map(messages.orders.pop, [...messages.orders]);

  useEffect(() => {
    const target = "getOrder";
    if (messages && !messages.success) {
      dispatch(updateToken(rToken, target));
    }
  }, [dispatch, messages, rToken]);

  if (history.location.pathname !== "/profile/orders" && !modalVisible) {
    return (
      <Redirect
        to={{
          pathname: `${history.location.pathname}`,
        }}
      />
    );
  }

  return (
    <main className={ProfileStyles.main}>
      <section>
        <ProfileNav />
      </section>
      {isWsAuthError && isWsAuthClosed ? (
        <WsConnectedError />
      ) : messages && messages.success ? (
        <section className=" ml-15 mt-10">
          <MyScrollbar height={ordersListHeight}>
            <div className={`${OrdersStyles.orders__list}`}>
              {messagesReverse.map((item: TMessageOrder) => (
                <OrderData key={item._id} item={item} setOrderModalVisible={setOrderModalVisible} />
              ))}
            </div>
          </MyScrollbar>
        </section>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default OrdersPage;
