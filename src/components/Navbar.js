import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoIcon from "@mui/icons-material/Info";
import SellIcon from "@mui/icons-material/Sell";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const navLinks = [
    { text: "Présentation", to: "/", icon: <InfoIcon /> },
    { text: "Mr Rodolphe Meyer", to: "/rodolphe-meyer", icon: <PersonIcon /> },
    { text: "Comment Vendre", to: "/comment-vendre", icon: <SellIcon /> },
    { text: "Beautés du Monde", to: "/products", icon: <ShoppingBagIcon /> },
    { text: "Contact", to: "/contact", icon: <EmailIcon /> },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#f0d9b0",
          boxShadow: "none",
          borderBottom: "1px solid black",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
          }}
        >
          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src="/logo.jpeg"
              alt="Logo"
              sx={{
                height: 110,
                width: 110,
                borderRadius: "30%",
                border: "2px solid #a68e5d",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "black",
                fontFamily: "Playfair Display",
                letterSpacing: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              {/* Add a title if needed */}
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.slice(0, 4).map(({ text, to }) => (
              <Button
                key={text}
                component={Link}
                to={to}
                variant="outlined"
                sx={{
                  color: "black",
                  borderColor: "#a68e5d",
                  borderRadius: "30px",
                  textTransform: "none",
                  px: 2,
                  "&:hover": {
                    bgcolor: "#f8ecd7",
                    borderColor: "#8c784b",
                  },
                }}
              >
                {text}
              </Button>
            ))}
            <Button
              component={Link}
              to="/contact"
              startIcon={<EmailIcon />}
              variant="contained"
              sx={{
                bgcolor: "#a68e5d",
                color: "white",
                borderRadius: "30px",
                textTransform: "none",
                px: 3,
                "&:hover": { bgcolor: "#8c784b" },
              }}
            >
              Contact
            </Button>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
  <Box
    sx={{
      width: 300, // was 250 — increased width
      bgcolor: "#f8ecd7",
      height: "100%",
      px: 2, // padding for inner spacing
      mt:10
    }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <List>
      {navLinks.map(({ text, to }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link} to={to}>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: "1rem",
                fontFamily: "Playfair Display",
                color: "#4b3e2a",
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>

    </>
  );
};

export default Navbar;
