import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../pages/login/loginAction";
import { getUserInfo } from "./meAction";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  item: {
    "&.active": {
      background: "#e0dcdc",
    },
  },
  // link: {
  //   marginRight: 100,
  // },
}));

const Header = ({ isAdmin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    if (isAdmin && !isAuth && localStorage.getItem("token")) {
      dispatch(getUserInfo());
    }
  }, [isAuth, dispatch, isAdmin]);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={NavLink}
            to="/admin"
            variant="h6"
            className={classes.title}
          >
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
      {isAdmin && (
        <Drawer
          open={open}
          className={classes.drawer}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <div>안녕하세요 {user.name}님</div>
              <Divider />
              <ListItem
                className={classes.item}
                component={NavLink}
                to="/players"
                button
                key="players"
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="players" />
              </ListItem>
              <ListItem
                className={classes.item}
                component={NavLink}
                to="/leagues"
                button
                key="leagues"
              >
                <ListItemIcon>
                  <GroupWorkIcon />
                </ListItemIcon>
                <ListItemText primary="리그" />
              </ListItem>
              <ListItem
                className={classes.item}
                component={NavLink}
                to="/teams"
                button
                key="teams"
              >
                <ListItemIcon>
                  <PeopleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="팀" />
              </ListItem>
              <ListItem
                className={classes.item}
                component={NavLink}
                to="/positions"
                button
                key="positions"
              >
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="포지션" />
              </ListItem>
              {/* {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )} */}
            </List>
            {/* <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
          </div>
        </Drawer>
      )}
    </>
  );
};

export default Header;
