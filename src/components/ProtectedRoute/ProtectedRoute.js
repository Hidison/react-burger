import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { SET_AUTH } from "../../services/actions/Auth";
import { getUser } from "../../services/actions/Profile";
import { getCookie } from "../../utils/utils";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { updateTokenFailed } = useSelector((state) => state.updateToken);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const aToken = getCookie("accessToken");

  const init = async () => {
    await dispatch(getUser(aToken));
    setUserLoaded(true);
  };

  useEffect(() => {
    if (updateTokenFailed) {
      dispatch({
        type: SET_AUTH,
        auth: false,
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

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
