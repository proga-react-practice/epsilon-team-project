import {
  Container,
  Box,
  Switch,
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { darkTheme, lightTheme } from "../themes/themes";

const saveThemeToLocalStorage = (theme: string) => {
  localStorage.setItem("theme", theme);
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "light";
};

const DefaultLayout: FC = () => {
  const [darkMode, setDarkMode] = useState(
    getThemeFromLocalStorage() === "dark"
  );

  useEffect(() => {
    saveThemeToLocalStorage(darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "background.default" }}>
        <AppBar position="static" color="primary" sx={{ width: "100%" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: { xs: "18px", md: "24px" },
                }}
                color="customColor1"
              >
                FreelanceBase
              </Typography>
            </Link>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="primary"
              inputProps={{ "aria-label": "toggle dark mode" }}
            />
          </Toolbar>
        </AppBar>
        <Container
          sx={{ minWidth: "100%", display: "flex", flexDirection: "row" }}
        >
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DefaultLayout;
