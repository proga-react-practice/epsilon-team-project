import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
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
          404 - Сторінку не знайдено
        </Typography>
        <Typography variant="body1" gutterBottom>
          Вибачте, але сторінку, яку ви шукаєте, не знайдено.
        </Typography>
        <Box sx={{ display: 'flex', mt: 4 }}>
          <Button variant="contained" color="primary" component={Link} to="/">
            На головну
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
