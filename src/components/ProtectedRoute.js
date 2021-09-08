import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookieFromBrowser } from "../auth/cookies";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = getCookieFromBrowser("authToken")
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
