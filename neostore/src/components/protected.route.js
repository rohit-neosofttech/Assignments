import React from "react";
import { Route, Redirect } from "react-router-dom";
import sweetalert from 'sweetalert'

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('userToken')) {
          return <Component {...props} />;
        } else {
          return (
            <>
                {/* {sweetalert("Please Login First",{icon:"error",button:{cancel: "Close"}})} */}
                {/* <Redirect
                to={{
                    pathname: "/login",
                    state: {
                    from: props.location
                    }
                }}
                /> */}
                {alert("Please Login First")}
                {props.history.push('/login')}
                {/* {sweetalert("Please Login First",{icon:"error",button:{cancel: "Close"}})} */}

            </>
          );
        }
      }}
    />
  );
};
