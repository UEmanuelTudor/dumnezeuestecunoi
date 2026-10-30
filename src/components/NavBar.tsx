import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const NAV_ITEMS = [
  { label: "Învățare", to: "/c/invatare" },
  { label: "Rugăciune", to: "/c/rugaciune" },
  { label: "Predicare", to: "/c/predicare" },
  { label: "Cântare", to: "/c/cantare" },
  { label: "Mărturie", to: "/c/marturie" },
];

export default function NavBar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem("theme") === "dark");
  const { pathname } = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10, // Se activează după ce dai scroll 10 pixeli în jos
  });

  React.useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const isActive = (to: string) => pathname.startsWith(to);

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0} // Oprim umbra standard ca să o controlăm noi mai frumos
        sx={{
          bgcolor: darkMode ? "#111827" : "white",
          color: darkMode ? "#f8fafc" : "black",
          fontFamily: '"Raleway", Helvetica, sans-serif',
          // AICI E MAGIA: Dacă `trigger` e activ (ai dat scroll), apare umbra. Altfel, e transparentă.
          boxShadow: trigger ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
          // Opțional: punem o linie super-fină jos când ești în top, ca să separe meniul de pagină
          borderBottom: trigger ? "none" : "1px solid rgba(0,0,0,0.06)",
          transition: "box-shadow 0.3s ease-in-out, border-bottom 0.3s ease-in-out", // Efect fluid de tranziție
        }}
      >
        {/* Am adăugat Container-ul aici pentru a centra conținutul */}
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ width: "100%", gap: 1 }}>
            
            {/* Logo + titlu */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              component={RouterLink}
              to="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuBookIcon sx={{ color: darkMode ? "#93c5fd" : "#0f2e60" }} />
              <Typography
                variant="h6"
                fontWeight={800} // L-am făcut puțin mai gros pentru a fi mai vizibil
                sx={{
                  textTransform: "uppercase",
                  fontFamily: '"Raleway", Helvetica, sans-serif',
                  color: darkMode ? "#f8fafc" : "#0f2e60",
                  letterSpacing: "0.5px" // O idee mai aerisit
                }}
              >
                Credință și încurajare
              </Typography>
            </Stack>

            {/* Spațiul gol care împinge butoanele la dreapta */}
            <Box sx={{ flex: 1 }} />

            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconButton
                component={RouterLink}
                to="/cautare"
                aria-label="Caută pe site"
                sx={{ color: darkMode ? "#f8fafc" : "inherit" }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                onClick={() => setDarkMode((value) => !value)}
                aria-label={darkMode ? "Dezactivează modul întunecat" : "Activează modul întunecat"}
                sx={{ color: darkMode ? "#f8fafc" : "inherit" }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Stack>

            {isDesktop ? (
              // Desktop: butoane pe o linie
              <Stack direction="row" spacing={1} alignItems="center">
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    disableRipple
                    sx={{
                      fontFamily: '"Raleway", Helvetica, sans-serif',
                      fontSize: "0.95rem",
                      color: isActive(item.to)
                        ? (darkMode ? "#93c5fd" : "#0f2e60")
                        : (darkMode ? "#f8fafc" : "#222"),
                      fontWeight: isActive(item.to) ? 700 : 600,
                      borderRadius: 0,
                      position: "relative",
                      backgroundColor: "transparent",
                      textTransform: "uppercase",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: isActive(item.to) ? "80%" : "0%",
                        height: "2px",
                        bottom: "4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: darkMode ? "#93c5fd" : "#0f2e60",
                        transition: "width 0.3s ease-in-out",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: darkMode ? "#93c5fd" : "#0f2e60",
                        "&::after": {
                          width: "80%",
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                
                {/* Butonul NEVOI */}
                <Button
                  component={RouterLink}
                  to="/nevoi"
                  variant="contained"
                  startIcon={<FavoriteIcon />}
                  sx={{
                    backgroundColor: "#e63946",
                    color: "white",
                    borderRadius: "24px",
                    px: 3,
                    py: 0.8,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    fontFamily: '"Raleway", Helvetica, sans-serif',
                    boxShadow: "0 4px 10px rgba(230, 57, 70, 0.3)",
                    transition: "all 0.3s ease",
                    ml: 2, // Am pus o mică margine în stânga butonului NEVOI ca să fie mai separat de restul meniului
                    "&:hover": {
                      backgroundColor: "#d90429",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 20px rgba(217, 4, 41, 0.4)",
                    },
                  }}
                >
                  Nevoi
                </Button>
              </Stack>
            ) : (
              // Mobil: buton hamburger
              <IconButton
                aria-label="deschide meniul"
                onClick={() => setOpen(true)}
                edge="end"
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer mobil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "85vw",
            maxWidth: 360,
            bgcolor: darkMode ? "#111827" : "white",
            color: darkMode ? "#f8fafc" : "inherit",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            component={RouterLink}
            to="/"
            onClick={() => setOpen(false)}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuBookIcon sx={{ color: darkMode ? "#93c5fd" : "#0f2e60" }} />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                fontFamily: '"Raleway", Helvetica, sans-serif',
                textTransform: "uppercase",
                color: darkMode ? "#f8fafc" : "black",
              }}
            >
              Credință și încurajare
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.to}
                onClick={() => setOpen(false)}
                selected={isActive(item.to)}
                sx={(theme) => ({
                  color: darkMode ? "#f8fafc" : "inherit",
                  "&.Mui-selected": {
                    backgroundColor: darkMode ? "rgba(147,197,253,0.16)" : "rgba(0,0,0,0.06)",
                  },
                  "&.Mui-selected .MuiListItemText-primary": {
                    fontWeight: 700,
                    textDecoration: "underline",
                    color: darkMode ? "#93c5fd" : "inherit",
                  },
                })}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontFamily: '"Raleway", Helvetica, sans-serif',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/nevoi"
              onClick={() => setOpen(false)}
              sx={{
                backgroundColor: "#e63946",
                color: "white",
                borderRadius: "16px", // Puțin rotunjit pentru meniul mobil
                m: 1, // Spațiu în jurul butonului pe mobil
                boxShadow: "0 4px 10px rgba(230, 57, 70, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#d90429",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 15px rgba(217, 4, 41, 0.4)",
                },
              }}
            >
              <FavoriteIcon sx={{ color: "white", mr: 1 }} />
              <ListItemText
                primary="NEVOI"
                primaryTypographyProps={{
                  fontFamily: '"Raleway", Helvetica, sans-serif',
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItemButton component={RouterLink} to="/cautare" onClick={() => setOpen(false)}>
            <SearchIcon sx={{ mr: 1 }} />
            <ListItemText primary="Căutare" />
          </ListItemButton>
          <ListItemButton onClick={() => setDarkMode((value) => !value)}>
            {darkMode ? <LightModeIcon sx={{ mr: 1 }} /> : <DarkModeIcon sx={{ mr: 1 }} />}
            <ListItemText primary={darkMode ? "Mod luminos" : "Mod întunecat"} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
