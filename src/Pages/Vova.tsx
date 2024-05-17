import { useContext } from 'react';
import RegistrationForm from '../components/freelancer/form';
import { FreelancerContext } from '../context/FreelancerContext';
import { Freelancer } from '../components/freelancer/Freelancer';
import { Box, Grid } from '@mui/material';

const RegistrationPage = () => {
  const ctx = useContext(FreelancerContext);
  const registerFreelancer = ctx?.registerFreelancer;

  const handleSubmit = (data: Freelancer) => {
    if (registerFreelancer) {
      registerFreelancer(data);
    } 
  };

  return (
    <Box sx={{ justifyContent: 'center', alignItems: 'center', mt:'4%', pl: { lg: '30%', xl: '35%', sm:'20%', md:'25%' } }}>
      <Grid container  justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}>
        <Grid item xs={12} sm={10} md={12} lg={12} xl={12}>
          <RegistrationForm onSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegistrationPage;