import React from "react";
import AddOrderForm from "../components/customer/AddOrderForm";
import Grid from "@mui/material/Grid";
import { useCustomerContext } from "../components/context/CustomerContext";

const Customers: React.FC = () => {
  const { addProject } = useCustomerContext()!;

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={6}>
        <AddOrderForm addProject={addProject} />
      </Grid>
    </Grid>
  );
};

export default Customers;
