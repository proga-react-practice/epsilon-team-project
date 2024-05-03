import React from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { Freelancer } from './Freelancer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  freelancers: Freelancer[];
  onDelete: (index: number) => void;
}

const FreelancerList: React.FC<Props> = ({ freelancers, onDelete }) => {
  return (
    <Box sx={{ ml:'16%', mt:'10%' }}>
      <Typography sx={{ fontSize: '40px', marginBottom: '18px', fontFamily:'Montserrat', fontWeight:'600'}} color="primary">Registered Freelancers</Typography>
      {freelancers.map((freelancer, index) => (
        <Card key={index} className="freelancer-card" sx={{width:'500px', mb:'24px', height:'180px'}}>
          <CardContent sx={{ p: 2, display:'flex' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ mb: 1, fontFamily:'Montserrat', fontWeight:'600' }}>Freelancer {index + 1}</Typography>
              <Typography sx={{ mt: '12px', fontFamily: 'Montserrat' }}>
                <Box component="span" sx={{ fontWeight: '600' }}>Name:</Box> {freelancer.firstName} {freelancer.lastName}
              </Typography>
              <Typography sx={{ mt: '12px', fontFamily: 'Montserrat' }}>
                <Box component="span" sx={{ fontWeight: '600' }}>Age:</Box> {freelancer.age}
              </Typography>
              <Typography sx={{ mt: '12px', fontFamily: 'Montserrat', whiteSpace: 'nowrap' }}>
                <Box component="span" sx={{ fontWeight: '600' }}>Skills:</Box> {freelancer.skills.join(', ')}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={() => onDelete(index)} color="primary"><DeleteIcon /></IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FreelancerList;
