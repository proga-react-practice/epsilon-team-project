import { useState } from 'react';
import FreelancerList from '../components/freelancer/cards';
import { Freelancer } from '../components/freelancer/Freelancer';
import { Box, Grid } from '@mui/material';

const FreelancerListPage = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  const handleDelete = (index: number) => {
    const updatedFreelancers = [...freelancers];
    updatedFreelancers.splice(index, 1);
    setFreelancers(updatedFreelancers);
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: { lg: '18%', xl: '20%' } }}>
      <Grid container spacing={8} justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}>
        <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
          <FreelancerList freelancers={freelancers} onDelete={handleDelete} onEdit={handleEdit} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FreelancerListPage;