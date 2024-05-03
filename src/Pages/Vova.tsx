import React, { useState } from 'react';
import RegistrationForm from '../components/freelancer/form';
import FreelancerList from '../components/freelancer/cards';
import { Freelancer } from '../components/freelancer/Freelancer';
import { ThemeProvider} from '@mui/material/styles';
import { lightTheme, darkTheme } from '../themes';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid } from '@mui/material';

const Freelancers: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  const handleDelete = (index: number) => {
    const updatedFreelancers = [...freelancers];
    updatedFreelancers.splice(index, 1);
    setFreelancers(updatedFreelancers);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Switch
          checked={darkMode}
          onChange={toggleDarkMode}
          color="primary"
          inputProps={{ 'aria-label': 'toggle dark mode' }}
        />
        <Grid container justifyContent="center"   spacing={22}>
          <Grid item xs={12} md={6} lg={4}>
            <RegistrationForm setFreelancers={setFreelancers} />
          </Grid>
          <Grid item xs={12} md={6} lg={5} >
            <FreelancerList freelancers={freelancers} onDelete={handleDelete} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Freelancers;