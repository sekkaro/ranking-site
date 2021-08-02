import { me } from "../../api/authApi";
import { getUserSuccess } from "../../pages/admin/authSlice";
import { logout } from "../../pages/login/loginAction";

export const getUserInfo = () => async (dispatch) => {
  try {
    const user = await me();
    dispatch(getUserSuccess(user));
  } catch (err) {
    console.log(err);
    dispatch(logout(err.message));
  }
};
