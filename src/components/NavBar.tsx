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
import { Link as RouterLink, useLocation } from "react-router-dom";

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
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname.startsWith(to);

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={1}
        sx={{
          bgcolor: "white",
          color: "black",
          fontFamily: '"Raleway", Helvetica, sans-serif',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", gap: 1 }}>
          {/* Logo + titlu */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuBookIcon />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                textTransform: "uppercase",
                fontFamily: '"Raleway", Helvetica, sans-serif',
              }}
            >
              Dumnezeu este cu noi
            </Typography>
          </Stack>

          <Box sx={{ flex: 1 }} />

          {isDesktop ? (
            // Desktop: butoane pe o linie
            <Stack direction="row" spacing={1} alignItems="center">
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color="inherit"
                  sx={{
                    fontFamily: '"Raleway", Helvetica, sans-serif',
                    borderBottom: isActive(item.to)
                      ? "2px solid black"
                      : "2px solid transparent",
                    borderRadius: 0,
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                component={RouterLink}
                to="/nevoi"
                variant="contained"
                startIcon={<FavoriteIcon sx={{ color: "red" }} />}
                sx={{
                  background:
                    "linear-gradient(90deg, #ffc1cc 0%, #ffe4e9 100%)",
                  color: "black",
                  borderRadius: 3,
                  px: 2.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontFamily: '"Raleway", Helvetica, sans-serif',
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #ff9aa2 0%, #ffd1dc 100%)",
                  },
                }}
              >
                Nevoi
              </Button>
              {/* Admin nu apare în meniu */}
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
      </AppBar>

      {/* Drawer mobil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: "85vw", maxWidth: 360 } }}
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
            <MenuBookIcon />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                fontFamily: '"Raleway", Helvetica, sans-serif',
                textTransform: "uppercase",
                color: "black",
              }}
            >
              Dumnezeu este cu noi
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
                  "&.Mui-selected": {
                    backgroundColor: "rgba(0,0,0,0.06)",
                  },
                  "&.Mui-selected .MuiListItemText-primary": {
                    fontWeight: 700,
                    textDecoration: "underline",
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
                background:
                  "linear-gradient(90deg, #ffc1cc 0%, #ffe4e9 100%)",
                color: "black",
                borderRadius: 1.5,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #ff9aa2 0%, #ffd1dc 100%)",
                },
              }}
            >
              <FavoriteIcon sx={{ color: "red", mr: 1 }} />
              <ListItemText
                primary="NEVOI"
                primaryTypographyProps={{
                  fontFamily: '"Raleway", Helvetica, sans-serif',
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
