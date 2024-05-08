import {Container, Box } from '@mui/material';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box sx={{}}>
      <Container >
        {children}
      </Container>
    </Box>
  );
};

export default DefaultLayout;
