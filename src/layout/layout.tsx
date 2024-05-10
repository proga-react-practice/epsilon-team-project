// DefaultLayout.tsx
import { Container, Box, Switch, AppBar, Toolbar, Typography, ThemeProvider } from '@mui/material';
import { Outlet } from "react-router-dom"; 
import { FC, useState } from "react";
import { darkTheme, lightTheme } from '../components/themes/themes';

const DefaultLayout: FC = () => { 
  const [darkMode, setDarkMode] = useState(false);
 
  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
    <Box>
      <AppBar position="static" color="primary" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Montserrat', fontSize: { xs: '18px', md: '24px' } }} color="customColor1" >
            FreelanceBase
          </Typography>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            color="primary"
            inputProps={{ 'aria-label': 'toggle dark mode' }}
          />
        </Toolbar>
      </AppBar>
      <Container sx={{}}>
        <Outlet /> 
      </Container>
    </Box>
    </ThemeProvider>
  );
};

export default DefaultLayout;
