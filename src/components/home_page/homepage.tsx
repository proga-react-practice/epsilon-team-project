import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link, ThemeProvider } from '@mui/material';
import DefaultLayout from '../deafoltlayout';
import { lightTheme, darkTheme } from '../themes'; 

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
          <AppBar position="static" sx={{ width: '100%' }} color="primary">
            <Toolbar >
              <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Montserrat' }}>
                FreelanceBase
              </Typography>
              <Button color="inherit" onClick={toggleTheme}>
                {darkMode ? "Світла тема" : "Темна тема"}
              </Button>
            </Toolbar>
          </AppBar>

          <DefaultLayout>
          <Box sx={{display:'flex', mt:'32px'}}>
          
          <Box sx={{mt:'120px'}}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "Montserrat", fontWeight:'bold', fontSize:'48px' }}>
              Lorem ipsum dolor sit
            </Typography>

            <Typography variant="body1" gutterBottom sx={{ maxWidth: '75%', fontFamily: "Montserrat" , fontSize:'24px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula massa nec lacus maximus,
              a posuere quam scelerisque.
            </Typography>

            <Box sx={{ display: 'flex', mt: 4 }}>
              <Link href="/maks" underline="none">
                <Button variant="contained" color="primary" sx={{ height: '55px' }}>
                  Пропоную роботу
                </Button>
              </Link>

              <Link href="/vova" underline="none">
                <Button variant="contained" color="primary" sx={{ height: '55px', ml: '12px' }} >
                  Пропоную послуги
                </Button>
              </Link>
            </Box>
            </Box>
            

            <Box sx={{ display: 'flex', justifyContent:'end',mt:'96px'}}>
              <img src="" alt="fff" style={{ }} />
            </Box>
            
          
          
          </Box>
          </DefaultLayout>
    </ThemeProvider>
  );
};

export default Home;
