import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../pages/login/loginAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

const Header = ({ isAdmin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Ranking {isAdmin && "Admin"} site
        </Typography>
        {isAdmin && (
          <Button
            color="inherit"
            onClick={() => {
              dispatch(logout());
            }}
          >
            LOGOUT
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
