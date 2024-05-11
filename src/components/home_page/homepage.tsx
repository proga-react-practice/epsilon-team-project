import React from 'react';
import { Typography, Button, Box, Link, Grid } from '@mui/material';



const Home: React.FC = () => { 
  return (
      <Grid container spacing={2} sx={{
        padding: '20px',
        minHeight: '100vh',
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'center', 
        width:'100%',
        
      }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mt: { xs: '40px', md: '190px' } }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "Montserrat", fontWeight: 'bold', fontSize: { xs: '24px', md: '48px' } }} color="primary">
              Lorem ipsum dolor sit
            </Typography>

            <Typography variant="body1" gutterBottom sx={{ maxWidth: '100%', fontFamily: "Montserrat", fontSize: { xs: '16px', md: '24px' } }} color="primary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula massa nec lacus maximus,
              a posuere quam scelerisque.
            </Typography>

                <Box sx={{ display: 'flex', mt: 4 }}>
                  <Link href="/maks" underline="none">
                    <Button variant="contained" color="primary" sx={{ height: { xs: '40px', md: '45px', color:'whitesmoke' }, fontFamily: "Montserrat", mr: { xs: '6px', md: '12px' }, fontSize: { xs: '12px', md: '14px' } }}>
                      Пропоную роботу
                    </Button>
                  </Link>

                  <Link href="/vova" underline="none">
                    <Button variant="contained" color="primary" sx={{ height: { xs: '40px', md: '45px', color:'whitesmoke' }, fontFamily: "Montserrat", fontSize: { xs: '12px', md: '14px' } }} >
                      Пропоную послуги
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mt: { xs: '40px', md: '100px' }, ml: '40px', display: 'flex', mr:'10px' }}>
                <img src="home10.png" alt="fff" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            </Grid>
          </Grid>  
  );
};

export default Home;
