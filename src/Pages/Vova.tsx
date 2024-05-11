import React, { useState } from 'react';
import RegistrationForm from '../components/freelancer/form';
import FreelancerList from '../components/freelancer/cards';
import { Freelancer } from '../components/freelancer/Freelancer';
import { Box, Grid } from '@mui/material';


const Freelancers: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  const handleDelete = (index: number) => {
    const updatedFreelancers = [...freelancers];
    updatedFreelancers.splice(index, 1);
    setFreelancers(updatedFreelancers);
  };

  return (
      <Box sx={{
        padding: '20px',
        minHeight: '100vh', 
      }}>
        <Grid container justifyContent="center"   spacing={22}>
          <Grid item xs={12} md={6} lg={4}>
            <RegistrationForm setFreelancers={setFreelancers} />
          </Grid>
          <Grid item xs={12} md={6} lg={5} >
            <FreelancerList freelancers={freelancers} onDelete={handleDelete} />
          </Grid>
        </Grid>
      </Box>
  );
};

export default Freelancers;