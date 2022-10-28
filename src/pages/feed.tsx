import React, { useEffect, useRef, FC, useMemo } from "react";
import FeedPageStyles from "./feed.module.css";
import MyScrollbar from "../components/UI/myScrollbar/MyScrollbar";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "../services/hooks";
import { getMessagesAll } from "../services/selectors";
import OrderData from "../components/OrderData/OrderData";
import Loader from "../components/UI/Loader/Loader";
import { TMessage } from "../types";
import { getWsClosed, getWsError } from "../services/selectors/getWsError";
import WsConnectedError from "../components/WsConnectedError/WsConnectedError";

interface IFeedPage {
  modalVisible: boolean;
  setOrderModalVisible: Function;
}

const FeedPage: FC<IFeedPage> = ({ setOrderModalVisible, modalVisible }) => {
  const history = useHistory();
  const messages: TMessage = useSelector(getMessagesAll);
  const isWsError = useSelector(getWsError);
  const isWsClosed = useSelector(getWsClosed);
  const { heightApp } = useSelector((state) => state.app);
  const { heightHeader } = useSelector((state) => state.appHeader);
  const ordersListHeight = heightApp - heightHeader - 108;

  const ordersCreated = useMemo(
    () => messages && messages.orders.filter((item) => item.status === "pending").slice(0, 20),
    [messages]
  );

  const ordersDone = useMemo(
    () => messages && messages.orders.filter((item) => item.status === "done").slice(0, 20),
    [messages]
  );

  useEffect(() => {
    if (history.location.pathname === "/feed") {
      setOrderModalVisible(false);
    }
  }, [history.location.pathname, setOrderModalVisible]);

  const titleRef = useRef<HTMLHeadingElement>(null);

  if (history.location.pathname !== "/feed" && !modalVisible) {
    return (
      <Redirect
        to={{
          pathname: `${history.location.pathname}`,
        }}
      />
    );
  }

  return (
    <div className={`${FeedPageStyles.feed__page}`}>
      <h1 ref={titleRef} className={`${FeedPageStyles.feed__title}`}>
        Лента заказов
      </h1>
      {isWsError && isWsClosed ? (
        <WsConnectedError />
      ) : messages ? (
        <>
          {" "}
          <section>
            <MyScrollbar height={ordersListHeight}>
              <div className={`${FeedPageStyles.feed__list}`}>
                {messages.orders.map((item) => (
                  <OrderData
                    key={item._id}
                    item={item}
                    setOrderModalVisible={setOrderModalVisible}
                  />
                ))}
              </div>
            </MyScrollbar>
          </section>
          <section className={`${FeedPageStyles.feed__order_info} ml-15`}>
            <div className={`${FeedPageStyles.feed__order_info_container}`}>
              <div className={`${FeedPageStyles.feed__order_info_subcontainer}`}>
                <span
                  className={`${FeedPageStyles.feed__order_info_status_title} text text_type_main-medium mb-6`}
                >
                  Готовы:
                </span>
                <ul className={`${FeedPageStyles.feed__order_info_container_list}`}>
                  {ordersDone.map((item) => (
                    <li
                      key={item._id}
                      className={`${FeedPageStyles.feed__order_info_container_list_item} ${FeedPageStyles.colour_created} text text_type_digits-default`}
                    >
                      {item.number}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${FeedPageStyles.feed__order_info_subcontainer}`}>
                <span
                  className={`${FeedPageStyles.feed__order_info_status_title} text text_type_main-medium mb-6`}
                >
                  В работе:
                </span>
                <ul className={`${FeedPageStyles.feed__order_info_container_list}`}>
                  {ordersCreated.map((item) => (
                    <li
                      key={item._id}
                      className={`${FeedPageStyles.feed__order_info_container_list_item} text text_type_digits-default`}
                    >
                      {item.number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`${FeedPageStyles.feed__order_all_time_container} mt-15`}>
              <span className="text text_type_main-medium">Выполнено за все время:</span>
              <p
                className={`${FeedPageStyles.feed__order_all_time_container_value} text text_type_digits-large`}
              >
                {messages.total}
              </p>
            </div>
            <div className={`${FeedPageStyles.feed__order_today_container} mt-15`}>
              <span className="text text_type_main-medium">Выполнено за сегодня:</span>
              <p
                className={`${FeedPageStyles.feed__order_all_time_container_value} text text_type_digits-large`}
              >
                {messages.totalToday}
              </p>
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default FeedPage;
