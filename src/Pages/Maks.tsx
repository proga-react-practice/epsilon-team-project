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

  const updateProject = (id: number, updatedProject: Project) => {
    setProjects(
      projects.map((project) => (project.id === id ? updatedProject : project))
    );
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={6}>
        <AddOrderForm addProject={addProject} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Cards
          projects={projects}
          deleteProject={deleteProject}
          updateProject={updateProject}
          setProjects={setProjects}
        />
      </Grid>
    </Grid>
  );
};

export default Customers;
