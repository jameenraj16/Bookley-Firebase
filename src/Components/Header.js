import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";

import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleLogout = () => {
    signOut(auth);
    dispatch(authActions.logout());
    localStorage.clear();
    navigate("/");
  };

  const handleMyAccountClick = () => {
    setDrawerOpen(true);
  };

  return (
    <div>
      <AppBar sx={{ backgroundColor: "white" }} position="sticky">
        <Toolbar>
          <Typography
            style={{ cursor: "pointer" }}
            variant="h4"
            color={"black"}
          >
            <Link
              to="/"
              style={{
                color: "#ff6700",
              }}
            >
              <span style={{ fontWeight: "bolder" }}>Bookley</span>
            </Link>{" "}
          </Typography>

          {isLoggedIn && (
            <Tabs
              sx={{ ml: "auto" }}
              textColor="inherit"
              indicatorColor="primary"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab
                LinkComponent={Link}
                to="/books"
                style={{ color: "black" }}
                label="All Books"
              />
              <Tab
                LinkComponent={Link}
                style={{ color: "black" }}
                to="/about"
                label="About Us"
              />
            </Tabs>
          )}
          {/* Drawer Menu */}
          <Box mr={0} ml={"auto"}>
            <Button sx={{ m: 0 }}>
              <MenuRoundedIcon
                sx={{ m: 0 }}
                style={{ color: "black" }}
                onClick={handleMyAccountClick}
              />
            </Button>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                {isLoggedIn && (
                  <ListItem>
                    <Link to={`/myaccount/${localStorage.getItem("userId")}`}>
                      <AccountBoxRoundedIcon sx={{ mr: 1 }} />
                      My Account
                    </Link>
                    <Divider variant="middle" component="li" />
                  </ListItem>
                )}
                {!isLoggedIn && (
                  <ListItem>
                    <Link to={`/admin`}>
                      <LockPersonRoundedIcon />
                      Admin Login
                    </Link>
                    <Divider variant="middle" component="li" />
                  </ListItem>
                )}

                {isLoggedIn && (
                  <ListItem>
                    <Button
                      onClick={() => handleLogout()}
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        color: "white",
                        margin: 1,
                        borderRadius: 2,
                        backgroundColor: "#34312D",
                        transition: "0.2s ease",
                        ":hover": {
                          backgroundColor: "white",
                          color: "#34312D",
                        },
                      }}
                    >
                      <LogoutIcon />
                      <span style={{ margin: 5 }}>Logout</span>
                    </Button>
                  </ListItem>
                )}
                {!isLoggedIn && (
                  <>
                    <ListItem>
                      <Button
                        sx={{ width: 100, fontWeight: 600, borderRadius: 4 }}
                        variant="contained"
                        onClick={() => navigate("/signup")}
                      >
                        Sign up
                      </Button>
                    </ListItem>
                    <ListItem>
                      <Button
                        sx={{ width: 100, fontWeight: 600, borderRadius: 4 }}
                        variant="contained"
                        onClick={() => navigate("/login")}
                      >
                        Sign in
                      </Button>
                    </ListItem>
                  </>
                )}
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
