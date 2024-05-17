import FreelancerList from '../components/freelancer/cards';
import { Box, Grid } from '@mui/material';
import { useFreelancerContext } from '../components/context/FreelancerContext';

const FreelancerListPage = () => {
  const { freelancers, deleteFreelancer, updateFreelancer } = useFreelancerContext()!;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: { lg: '18%', xl: '20%' } }}>
      <Grid container spacing={8} justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}>
        <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
          <FreelancerList
            freelancers={freelancers}
            onDelete={deleteFreelancer}
            onEdit={updateFreelancer}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FreelancerListPage;