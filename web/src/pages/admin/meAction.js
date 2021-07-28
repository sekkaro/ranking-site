import { me } from "../../api/authApi";
import { getUserSuccess, loginFail } from "./authSlice";

export const getUserInfo = (history) => async (dispatch) => {
  try {
    const user = await me();
    dispatch(getUserSuccess(user));
    history.push(
      history.location.state?.from ? history.location.state.from : "/admin"
    );
  } catch (err) {
    console.log(err);
    dispatch(loginFail(err.message));
    localStorage.removeItem("token");
  }
};
