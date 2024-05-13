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

  const handleSubmit = (data: Freelancer) => {
    setFreelancers(prevFreelancers => [...prevFreelancers, data]);
  };

  const handleEdit = (updatedFreelancer: Freelancer | Freelancer[], index: number) => {
    if (Array.isArray(updatedFreelancer)) {
      const updatedFreelancers = [...updatedFreelancer];
      setFreelancers(updatedFreelancers);
    } else {
      const updatedFreelancers = [...freelancers];
      updatedFreelancers[index] = updatedFreelancer;
      setFreelancers(updatedFreelancers);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ml:'25%' 
      }}
    >
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid item xs={12} md={6}>
          <RegistrationForm onSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FreelancerList
            freelancers={freelancers}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Freelancers;
