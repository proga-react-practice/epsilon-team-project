import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import doggif from "./doggif.gif";


const NotFoundPage = () => {
  const prefersSmallerScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: 'background.default',
        padding: prefersSmallerScreen ? '10px' : '20px', 
      }}
    >
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
  );
};

export default NotFoundPage;
