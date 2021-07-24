import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Ranking {isAdmin && "Admin"} site
        </Typography>
        {/* {isAdmin && (
          <Button component={Link} to="/login" color="inherit">
            LOGIN
          </Button>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
