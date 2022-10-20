import React, { useEffect } from "react";
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
import { getWsClosed, getWsError } from "../services/selectors/getWsError";
import WsConnectedError from "../components/WsConnectedError/WsConnectedError";

const OrdersPage = ({ setOrderModalVisible, modalVisible }: any) => {
  const dispatch = useDispatch();

  const isWsError = useSelector(getWsError);
  const isWsClosed = useSelector(getWsClosed);
  const messagesAuth = useSelector(getMessagesAuth);

  const { heightApp } = useSelector((state) => state.app);
  const { heightHeader } = useSelector((state) => state.appHeader);

  const rToken = localStorage.getItem("refreshToken");

  const ordersListHeight = heightApp - heightHeader - 42;

  const history = useHistory();

  const messagesAuthReverse =
    messagesAuth &&
    messagesAuth.success &&
    messagesAuth.orders.map(messagesAuth.orders.pop, [...messagesAuth.orders]);

  useEffect(() => {
    const target = "getOrder";
    if (messagesAuth && !messagesAuth.success) {
      dispatch(updateToken(rToken, target));
    }
  }, [dispatch, messagesAuth, rToken]);

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
      {isWsError && isWsClosed ? (
        <WsConnectedError />
      ) : messagesAuth && messagesAuth.success ? (
        <section className=" ml-15 mt-10">
          <MyScrollbar height={ordersListHeight}>
            <div className={`${OrdersStyles.orders__list}`}>
              {messagesAuthReverse.map((item: any) => (
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
