import React, { useState } from "react";
import AddOrderForm from "../components/customer/AddOrderForm";
import Cards from "../components/customer/Cards";
import { Project } from "../components/customer/Utils";
import Grid from "@mui/material/Grid";

const Customers: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={6}>
        <AddOrderForm addProject={addProject} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Cards projects={projects} deleteProject={deleteProject} />
      </Grid>
    </Grid>
  );
};

export default Customers;
