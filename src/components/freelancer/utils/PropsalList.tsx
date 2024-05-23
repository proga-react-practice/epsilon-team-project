import React from 'react';
import { Project } from '../../customer/Utils';
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme } from '@mui/material';

interface ProposalListProps {
  proposals: Project[];
}

const ProposalList: React.FC<ProposalListProps> = ({ proposals }) => {
  const theme = useTheme();
  const isXtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h3"
        color="primary"
        sx={{
          fontWeight: '600',
          fontFamily: 'Montserrat',
          ml: '5%',
          mt: '3%',
          fontSize: isXtraSmallScreen ? '1.5rem' : isSmallScreen ? '2rem' : isMediumScreen ? '2.5rem' : isLargeScreen ? '3rem' : '3.5rem',
        }}
      >
        Offers
      </Typography>
      {proposals.map((proposal, index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            width: '90%',
            ml: '6%',
            mt: '2%',
            border: '1px solid #ccc',
            borderRadius: 1,
          }}
        >
          <CardContent sx={{ padding: '2%' }}>
            <Box sx={{ width: '80%' }}>
              <Typography
                variant="h6"
                component="div"
                color="primary"
                sx={{
                  fontWeight: '600',
                  fontFamily: 'Montserrat',
                  fontSize: isXtraSmallScreen ? '1rem' : isSmallScreen ? '1.2rem' : isMediumScreen ? '1.4rem' : isLargeScreen ? '1.6rem' : '1.8rem',
                }}
              >
                {proposal.name}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontFamily: 'Montserrat',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontSize: isXtraSmallScreen ? '0.8rem' : isSmallScreen ? '0.9rem' : isMediumScreen ? '1rem' : isLargeScreen ? '1.1rem' : '1.2rem',
                }}
              >
                {proposal.description}
              </Typography>
            </Box>
            <Box sx={{ width: '80%' }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: isXtraSmallScreen ? '0.8rem' : isSmallScreen ? '0.9rem' : isMediumScreen ? '1rem' : isLargeScreen ? '1.1rem' : '1.2rem',
                }}
              >
                <strong>Deadline:</strong> {proposal.deadline}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontFamily: 'Montserrat',
                  fontSize: isXtraSmallScreen ? '0.8rem' : isSmallScreen ? '0.9rem' : isMediumScreen ? '1rem' : isLargeScreen ? '1.1rem' : '1.2rem',
                }}
              >
                <strong>Technologies:</strong> {proposal.technologies.join(', ')}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProposalList;