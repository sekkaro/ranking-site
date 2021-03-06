import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";

const AdminRoute = ({ children, ...props }) => {
  const { isAuth, error } = useSelector((state) => state.auth);

  return (
    <Route
      {...props}
      render={() =>
        (isAuth || localStorage.getItem("token")) && !error ? (
          <DefaultLayout isAdmin>{children}</DefaultLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
