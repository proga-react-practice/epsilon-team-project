import { useState } from 'react';
import { Box, Typography, Button, Switch, ThemeProvider, useMediaQuery } from '@mui/material';
import doggif from "./doggif.gif";
import { lightTheme, darkTheme } from '../themes/themes'; 

const NotFoundPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const prefersSmallerScreen = useMediaQuery('(max-width:600px)');

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: theme.palette.background.default, 
        color: theme.palette.text.primary,
        padding: prefersSmallerScreen ? '10px' : '20px', // Задаємо менше відступи для менших екранів
      }}
    >
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        color="primary"
        inputProps={{ 'aria-label': 'toggle dark mode' }}
        sx={{ position: 'absolute', top: 0, right: 0 }} // Перемикач теми знаходиться зверху справа
      />
      <img src={doggif} alt="404 Not Found" style={{ width: prefersSmallerScreen ? '250px' : '350px', height: prefersSmallerScreen ? '250px' : '350px', marginBottom: prefersSmallerScreen ? '20px' : '40px' }} />
      <Typography variant="h4" color="primary" gutterBottom sx={{ fontFamily:'Montserrat', fontWeight:'bold' }}>
        Oops! Сторінку не знайдено
      </Typography>
      <Typography variant="body1" color="primary" gutterBottom sx={{ fontFamily:'Montserrat' }}>
        Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена
      </Typography>
      <Button variant="contained" color="primary" href="/" sx={{ width:'175px', height:'50px', fontFamily:'Montserrat', mt: prefersSmallerScreen ? '10px' : '15px' }}>
        На головну
      </Button>
    </Box>
    </ThemeProvider>
  );
};

export default NotFoundPage;
