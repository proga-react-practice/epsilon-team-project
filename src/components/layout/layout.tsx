import { Container, Box, Switch, AppBar, Toolbar, Typography, ThemeProvider, Link, IconButton, Menu, MenuItem } from '@mui/material';
import { Outlet, Link as RouterLink } from "react-router-dom";
import { FC, useState } from "react";
import { darkTheme, lightTheme } from '../themes/themes';
import MenuIcon from '@mui/icons-material/Menu';

const DefaultLayout: FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default' }}>
        <AppBar position="static" color="primary" sx={{ width: '100%' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Montserrat', fontSize: { xs: '18px', md: '24px' }, ml: '10%', fontWeight:'600' }} color="customColor1">
              FreelanceBase
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around', alignItems: 'center', width: '60%', mr: '12%', ml:'2%'  }}>
              <Link component={RouterLink} to="/home" underline="none" color="inherit" sx={{ mr: 2, fontFamily: 'Montserrat' }}>
                Home
              </Link>
              <Link component={RouterLink} to="/freelancers" underline="none" color="inherit" sx={{ mr: 2, fontFamily: 'Montserrat' }}>
                Freelancers
              </Link>
              <Link component={RouterLink} to="/projects" underline="none" color="inherit" sx={{ mr: 2, fontFamily: 'Montserrat' }}>
                Projects
              </Link>
              <Link component={RouterLink} to="/vova" underline="none" color="inherit" sx={{ mr: 2, fontFamily: 'Montserrat' }}>
                Become a freelancer
              </Link>
              <Link component={RouterLink} to="/maks" underline="none" color="inherit" sx={{ mr: 2, fontFamily: 'Montserrat' }}>
                Become a customer 
              </Link>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={RouterLink} to="/home">
                  Home
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/freelancers">
                  Freelancers
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/projects">
                  Projects
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/vova">
                  Become a freelancer
                </MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/maks">
                  Become a customer
                </MenuItem>
              </Menu>
            </Box>
            <Switch checked={darkMode} onChange={toggleDarkMode} color="primary" inputProps={{ 'aria-label': 'toggle dark mode' }} />
          </Toolbar>
        </AppBar>
        <Container sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DefaultLayout;