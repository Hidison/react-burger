import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { Redirect, Route } from "react-router-dom";
import { SET_AUTH } from "../../services/actions/Auth";
import { getUser } from "../../services/actions/Profile";
import { getCookie } from "../../utils/utils";

interface IProtectedRoute {
  path: string;
  exact: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { updateTokenFailed } = useSelector((state) => state.updateToken);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const aToken: string | undefined = getCookie("accessToken");

  const init = async () => {
    await dispatch(getUser(aToken as string));
    setUserLoaded(true);
  };

  useEffect(() => {
    if (updateTokenFailed) {
      dispatch({
        type: SET_AUTH,
        payload: false,
      });
    }
  }, [dispatch, updateTokenFailed]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
