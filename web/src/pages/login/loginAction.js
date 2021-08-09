import { loginUser } from "../../api/authApi";
import { getUserInfo } from "../../layout/partials/meAction";
import { loginFail, loginSuccess } from "../admin/authSlice";

export const login = (token, history, email, name) => async (dispatch) => {
  try {
    await loginUser(token, email, name);
    dispatch(loginSuccess());
    dispatch(getUserInfo());
    history.push(
      history.location.state?.from ? history.location.state.from : "/admin"
    );
  } catch (err) {
    console.log(err);
    dispatch(loginFail(err.message));
  }
};

export const logout =
  (err = "") =>
  (dispatch) => {
    localStorage.removeItem("token");
    dispatch(loginFail(err));
  };
