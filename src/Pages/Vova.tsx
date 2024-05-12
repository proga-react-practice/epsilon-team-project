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

  // Update handleEdit function to match the expected signature
  const handleEdit = (updatedFreelancer: Freelancer | Freelancer[], index: number) => {
    if (Array.isArray(updatedFreelancer)) {
      // Handle array of freelancers
      const updatedFreelancers = [...updatedFreelancer];
      setFreelancers(updatedFreelancers);
    } else {
      // Handle individual freelancer
      const updatedFreelancers = [...freelancers];
      updatedFreelancers[index] = updatedFreelancer;
      setFreelancers(updatedFreelancers);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item xs={12} md={6} lg={4}>
          <RegistrationForm onSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
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
