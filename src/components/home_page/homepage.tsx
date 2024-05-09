import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  ThemeProvider,
  Switch,
  Grid,
} from "@mui/material";
import { lightTheme, darkTheme } from "../themes/themes";

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontFamily: "Montserrat",
              fontSize: { xs: "18px", md: "24px" },
            }}
            color="customColor1"
          >
            FreelanceBase
          </Typography>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="primary"
            inputProps={{ "aria-label": "toggle dark mode" }}
          />
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: { xs: "40px", md: "190px" } }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  fontSize: { xs: "24px", md: "48px" },
                }}
                color="primary"
              >
                Lorem ipsum dolor sit
              </Typography>

              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  maxWidth: "100%",
                  fontFamily: "Montserrat",
                  fontSize: { xs: "16px", md: "24px" },
                }}
                color="primary"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vehicula massa nec lacus maximus, a posuere quam scelerisque.
              </Typography>

              <Box sx={{ display: "flex", mt: 4 }}>
                <Link href="/maks" underline="none">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      height: { xs: "40px", md: "45px", color: "whitesmoke" },
                      fontFamily: "Montserrat",
                      mr: { xs: "6px", md: "12px" },
                      fontSize: { xs: "12px", md: "14px" },
                    }}
                  >
                    Пропоную роботу
                  </Button>
                </Link>

                <Link href="/vova" underline="none">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      height: { xs: "40px", md: "45px", color: "whitesmoke" },
                      fontFamily: "Montserrat",
                      fontSize: { xs: "12px", md: "14px" },
                    }}
                  >
                    Пропоную послуги
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mt: { xs: "40px", md: "100px" },
                ml: "40px",
                display: "flex",
                mr: "10px",
              }}
            >
              <img
                src="home10.png"
                alt="fff"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
