import { me } from "../../api/authApi";
import { getUserSuccess, loginFail } from "../../pages/admin/authSlice";

export const getUserInfo = () => async (dispatch) => {
  try {
    const user = await me();
    dispatch(getUserSuccess(user));
  } catch (err) {
    console.log(err);
    dispatch(loginFail(err.message));
    // localStorage.removeItem("token");
  }
};
