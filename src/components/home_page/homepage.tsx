import React from 'react';
import { Typography, Button, Box, Link, Grid } from '@mui/material';


const Home: React.FC = () => { 
  return (
      <Grid container spacing={2} sx={{
        padding: '20px',
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'center', 
        width:'100%',
        pl: {
          lg: '10%', 
          xl: '10%', 
        },
        height:'100%'
        
      }}>
        <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
          <Box sx={{ mt: { xs: '20%', md: '25%' } }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "Montserrat", fontWeight: 'bold', fontSize: { xs: '24px', md: '48px' } }} color="primary">
              Lorem ipsum dolor sit
            </Typography>

            <Typography variant="body1" gutterBottom sx={{ maxWidth: '100%', fontFamily: "Montserrat", fontSize: { xs: '16px', md: '24px' } }} color="primary">
              Developers: Max, Vova - students of Computer Science, LNU
            </Typography>

                <Box sx={{ display: 'flex', mt:"4%" }}>
                  <Link href="/maks" underline="none">
                    <Button variant="contained" color="primary" sx={{ height: { xs: '40px', md: '100%', color:'whitesmoke', }, fontFamily: "Montserrat", mr: { xs: '6px', md: '12px' }, fontSize: { xs: '8px', md: '14px' },   }}>
                      Пропоную роботу
                    </Button>
                  </Link>

                  <Link href="/vova" underline="none">
                    <Button variant="contained" color="primary" sx={{ height: { xs: '40px', md: '100%', color:'whitesmoke' }, fontFamily: "Montserrat", fontSize: { xs: '8px', md: '14px' } }} >
                      Пропоную послуги
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
              <Box sx={{ mt: { xs: '2%', md: '12%' }, ml: '12%', display: 'flex', mr:'10%' }}>
                <img src="home10.png" alt="fff" style={{ maxWidth: '100%' }} />
              </Box>
            </Grid>
          </Grid>  
  );
};

export default Home;
