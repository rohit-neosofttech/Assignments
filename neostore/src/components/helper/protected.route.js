import React from "react";
import { Route, Redirect } from "react-router-dom";
import sweetalert from 'sweetalert'


/**
  * Protected route that will check if the user is logged-in or not when the user redirect using the url.
  * If the not logged-in he will be redirected to the Login page
  * 
  * @param   component  the name of the component 
  * @param   rest       contains the child props of the component
  */
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
        } 
        else {
          sweetalert("Please Login First",{icon:"error",button:false,timer:3000})
          // props.history.push('/login')
          localStorage.removeItem('custDetail')
          return (
                  <Redirect
                  to={{
                      pathname: "/login",
                      state: {
                      from: props.location
                      }
                  }}
                  />
            );
        }
      }}
    />
  );
};
