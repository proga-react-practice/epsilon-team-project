import { Box, Typography, Button, Grid } from '@mui/material';
import doggif from "./doggif.gif";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        pl: { lg: '15%',  xl: '15%'},
        mt: { xs: '10%', sm: '10%', md: '10%', lg: '10%', xl: '10%'},

      }}
    >
      <Grid container spacing={2} alignItems="center" >
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <img src={doggif} alt="404 Not Found" style={{ maxWidth: '80%' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography variant="h4" color="primary" gutterBottom sx={{ fontFamily:'Montserrat', fontWeight:'bold' }}>
            Oops! Сторінку не знайдено
          </Typography>
          <Typography variant="body1" color="primary" gutterBottom sx={{ fontFamily:'Montserrat' }}>
            Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена
          </Typography>
          <Button variant="contained" color="primary" href="/" sx={{ minWidth:'40%', minHeight:'45px', fontFamily:'Montserrat', mt:"3%" }}>
            На головну
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotFoundPage;
