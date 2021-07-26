import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  MenuItem,
  Menu,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  Settings,
} from "@material-ui/icons";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../pages/login/loginAction";

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
  },
  // button: {
  //   "&.active": {
  //     background: "grey",
  //   },
  // },
  // link: {
  //   marginRight: 100,
  // },
}));

const Header = ({ isAdmin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenSettings = () => {
    setOpenCollapse(!openCollapse);
  };

  const toggleDrawer = () => {
    setOpen((open) => !open);
  };

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
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
