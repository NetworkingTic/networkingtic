import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ForumIcon from "@mui/icons-material/Forum";
import BusinessIcon from "@mui/icons-material/Business";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { Link as RouterLink, useLocation } from "react-router-dom";
import logo from "@assets/logo4.jpeg";
import "./Navbar.css";

const NAV_ITEMS = [
  { to: "/", label: "Inicio", Icon: HomeIcon },
  { to: "/servicios", label: "Servicios", Icon: MiscellaneousServicesIcon },
  { to: "/partners", label: "Partners", Icon: BlurOnIcon },
  { to: "/conocenos", label: "Nosotros", Icon: BusinessIcon },
  { to: "/contactanos", label: "Contáctanos", Icon: ForumIcon },
];

export const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();

  return (
    <AppBar position="fixed" component="nav" aria-label="Menú principal">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <RouterLink to="/" aria-label="Ir al inicio">
            <img src={logo} alt="NetWorking TIC" className="img-logo" />
          </RouterLink>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                aria-label="Abrir menú"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 250 }} role="presentation">
                  <List>
                    {NAV_ITEMS.map(({ to, label, Icon }) => (
                      <ListItemButton
                        key={to}
                        component={RouterLink}
                        to={to}
                        selected={pathname === to}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <ListItemIcon>
                          <Icon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={label}
                          primaryTypographyProps={{ color: "#171b1d" }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                gap: 4,
              }}
            >
              {NAV_ITEMS.map(({ to, label, Icon }) => (
                <Button
                  key={to}
                  component={RouterLink}
                  to={to}
                  color="inherit"
                  className="navbar-item"
                  startIcon={<Icon />}
                  aria-current={pathname === to ? "page" : undefined}
                  sx={{
                    fontSize: "1.1rem",
                    textTransform: "none",
                    borderBottom: pathname === to ? "2px solid #fff" : "2px solid transparent",
                    borderRadius: 0,
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
