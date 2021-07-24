import { verify } from "../../api/authApi";
import { loginFail, loginSuccess } from "../admin/authSlice";

export const login = (token, history) => async (dispatch) => {
  try {
    await verify(token);
    dispatch(loginSuccess());
    history.push(history.location.state.from);
  } catch (err) {
    console.log(err);
    dispatch(loginFail(err.message));
  }
};
