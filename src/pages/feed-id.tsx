import React, { useEffect, useMemo, FC } from "react";
import { getOrderFromLocation } from "../utils/utils";
import { useHistory, useLocation } from "react-router-dom";
import NotFound404 from "./not-found";
import { useDispatch, useSelector } from "../services/hooks";
import { getMessagesAll, getMessagesAuth } from "../services/selectors";
import OrderDataDetails from "../components/OrderDataDetails/OrderDataDetails";
import { SET_ORDER_DATA } from "../services/actions/OrderData";
import { TMessage } from "../types";

interface IFeedPageID {
  modalVisible: boolean;
}

const FeedPageID: FC<IFeedPageID> = ({ modalVisible }) => {
  const { orderData } = useSelector((state) => state.orderData);
  const { ingredientsRequest } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const messages: TMessage = useSelector(getMessagesAll);
  const messagesAuth: TMessage = useSelector(getMessagesAuth);
  const orderFromlocation: string = getOrderFromLocation(history.location.pathname);

  const orderDetail = useMemo(
    () =>
      location.pathname.includes("feed")
        ? messages && messages.orders.find((item) => String(item.number) === orderFromlocation)
        : messagesAuth &&
          messagesAuth.orders.find((item) => String(item.number) === orderFromlocation),
    [location.pathname, messages, messagesAuth, orderFromlocation]
  );

  useEffect(() => {
    dispatch({
      type: SET_ORDER_DATA,
      payload: orderDetail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderFromlocation]);

  if (ingredientsRequest) {
    return null;
  } else if (!orderDetail) {
    return <NotFound404 />;
  } else {
    return <>{orderData && <OrderDataDetails modalVisible={modalVisible} />}</>;
  }
};

export default FeedPageID;
