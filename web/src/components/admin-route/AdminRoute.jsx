import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import { logout } from "../../pages/login/loginAction";

const AdminRoute = ({ children, ...props }) => {
  const { isAuth, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error === "Forbidden") {
      dispatch(logout());
    }
    console.log(error);
  }, [dispatch, error]);

  return (
    <Route
      {...props}
      render={() =>
        isAuth || localStorage.getItem("token") ? (
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
