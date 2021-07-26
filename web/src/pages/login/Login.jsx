import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "./loginAction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const onSuccess = (res) => {
    console.log("success: ", res);
    dispatch(
      login(res.tokenId, history, res.profileObj.email, res.profileObj.name)
    );
  };

  const onFailure = (res) => {
    console.log("failure: ", res);
    alert(res.error);
  };
  return (
    <div className={classes.root}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}
        hostedDomain="leadia.co.kr"
        onSuccess={onSuccess}
        onFailure={onFailure}
        // isSignedIn={true}
        cookiePolicy="single_host_origin"
        // uxMode="redirect"
      />
    </div>
  );
};

export default Login;
