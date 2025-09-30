import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Button,
  Avatar,
  Container,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Home,
  Book,
  Favorite,
  Login,
  PersonAdd,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { setUser } from "../redux/auth";
import axios from "axios";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar(props) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyRecipeClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
      toast.error("Please login to view your recipes");
    }
  };

  const logOutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5500/api/user/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        handleProfileMenuClose();
      }
    } catch (error) {
   
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const navItems = [
    { label: "Home", to: "/", icon: <Home sx={{ mr: 1 }} /> },
    { 
      label: "My Recipe", 
      to: user ? `/myrecipe/${user.email}` : "/login", 
      icon: <Book sx={{ mr: 1 }} />,
      requiresAuth: true 
    },
    { label: "Favourite", to: "/Favourite", icon: <Favorite sx={{ mr: 1 }} /> },
  ];

  const authItems = [
    { label: "Login", to: "/login", icon: <Login sx={{ mr: 1 }} /> },
    { label: "SignUp", to: "/signup", icon: <PersonAdd sx={{ mr: 1 }} /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", width: 250 }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: "bold",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Foodi<span style={{ color: "#ffd700" }}>.</span>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            to={item.to}
            onClick={item.requiresAuth ? handleMyRecipeClick : null}
            sx={{
              color: "text.primary",
              "&:hover": {
                backgroundColor: "action.hover",
                color: "success.main",
              },
            }}
          >
            {item.icon}
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        {user ? (
          <>
            {/* User info in mobile drawer - non-clickable */}
            <ListItem
              sx={{
                color: "text.primary",
                backgroundColor: "action.selected",
                pointerEvents: "none",
              }}
            >
              <AccountCircle sx={{ mr: 1 }} />
              <ListItemText primary={user.email} secondary={user.fullname} />
            </ListItem>
            <ListItem
              button
              onClick={logOutHandler}
              sx={{
                color: "error.main",
                "&:hover": {
                  backgroundColor: "error.light",
                  color: "error.contrastText",
                },
              }}
            >
              <ExitToApp sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          authItems.map((item) => (
            <ListItem
              key={item.label}
              component={Link}
              to={item.to}
              sx={{
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "action.hover",
                  color: "success.main",
                },
              }}
            >
              {item.icon}
              <ListItemText primary={item.label} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar
          position="fixed"
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.1)",
            color: "text.primary",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
              {/* Logo */}
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "text.primary",
                  "&:hover": { color: "success.main" },
                }}
              >
                Foodi<span style={{ color: "#ffd700" }}>.</span>
              </Typography>

              {/* Desktop Navigation */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.to}
                    onClick={item.requiresAuth ? handleMyRecipeClick : null}
                    startIcon={item.icon}
                    sx={{
                      color: "text.primary",
                      "&:hover": {
                        color: "success.main",
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {user ? (
                  <>
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      sx={{
                        ml: 1,
                        border: "2px solid",
                        borderColor: "success.main",
                        "&:hover": {
                          borderColor: "success.dark",
                        },
                      }}
                    >
                      {user.Profile ? (
                        <Avatar
                          src={user.Profile}
                          sx={{ width: 32, height: 32 }}
                          alt={user.fullname}
                        />
                      ) : (
                        <AccountCircle sx={{ color: "success.main" }} />
                      )}
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleProfileMenuClose}
                      PaperProps={{
                        elevation: 3,
                        sx: {
                          mt: 1.5,
                          minWidth: 200,
                          borderRadius: 2,
                        },
                      }}
                    >
                      {/* User info section - non-clickable */}
                      <MenuItem
                        sx={{
                          pointerEvents: "none",
                          "&:hover": { backgroundColor: "success.light" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <AccountCircle
                            sx={{ mr: 2, color: "success.main" }}
                          />
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {user.fullname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={logOutHandler}
                        sx={{
                          color: "error.main",
                        }}
                      >
                        <ExitToApp sx={{ mr: 2 }} />
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  authItems.map((item) => (
                    <Button
                      key={item.label}
                      component={Link}
                      to={item.to}
                      startIcon={item.icon}
                      variant={item.label === "SignUp" ? "contained" : "text"}
                      sx={{
                        ml: 1,
                        borderRadius: 2,
                        ...(item.label === "SignUp" && {
                          background:
                            "linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)",
                          color: "white",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)",
                          },
                        }),
                        ...(item.label === "Login" && {
                          "&:hover": {
                            color: "success.main",
                          },
                        }),
                      }}
                    >
                      {item.label}
                    </Button>
                  ))
                )}
              </Box>

              {/* Mobile menu button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: "none" },
                  "&:hover": {
                    color: "success.main",
                    backgroundColor: "success.light",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Add spacing for fixed navbar */}
      <Toolbar />
      <Toaster position="top-right" />
    </>
  );
}

export default Navbar;