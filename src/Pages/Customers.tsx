import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Cards from "../components/customer/Cards";
import { useCustomerContext } from "../components/context/CustomerContext";

const CustomersListPage: React.FC = () => {
  const { projects, deleteProject, updateProject } = useCustomerContext()!;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: "5%",
        pl: { xs: "0%", md: "10%" },
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: {
                xs: "30px",
                sm: "35px",
                md: "40px",
                lg: "45px",
                xl: "50px",
              },
              fontFamily: "Montserrat",
              fontWeight: "900",
              textAlign: { xs: "center", md: "left" },
            }}
            color="primary"
          >
            Project Orders
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
          <Cards
            projects={projects}
            deleteProject={deleteProject}
            updateProject={updateProject}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomersListPage;
