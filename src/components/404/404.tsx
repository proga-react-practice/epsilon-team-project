import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DefaultLayout from '../deafoltlayout';
import { useMediaQuery } from '@mui/material';

const NotFoundPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)'); // Define breakpoint for mobile

  return (
    <DefaultLayout>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FreelanceBase
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            404 - Сторінку не знайдено
          </Typography>
          <Typography variant="body1" gutterBottom>
            Вибачте, але сторінку, яку ви шукаєте, не знайдено.
          </Typography>
          <Box sx={{ display: 'flex', mt: isMobile ? 2 : 4, justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <Button variant="contained" color="primary" component={Link} to="/">
              На головну
            </Button>
          </Box>
        </Container>
      </Box>
    </DefaultLayout>
  );
};

export default NotFoundPage;
