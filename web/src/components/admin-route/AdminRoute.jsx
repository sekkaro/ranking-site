import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";

const AdminRoute = ({ children, ...props }) => {
  const { isAuth } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // const history = useHistory();

  // useEffect(() => {
  //   if (!isAuth && localStorage.getItem("token")) {
  //     history.location.state = {
  //       from: props.location,
  //     };
  //     dispatch(autoLogin(history));
  //   }
  // }, [isAuth, dispatch, history, props.location]);

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
