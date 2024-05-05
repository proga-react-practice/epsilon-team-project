import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Box, Link } from '@mui/material';

const Home: React.FC = () => {
  return (
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
          Lorem ipsum dolor sit
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula massa nec lacus maximus,
          a posuere quam scelerisque.
        </Typography>
          <Link href="/maks" underline="none">
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>Пропоную роботу</Button>
          </Link>
          <Link href="/vova" underline="none">
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>Пропоную послуги</Button>
          </Link>
        </Container>
    </Box>
  );
};

export default Home;
