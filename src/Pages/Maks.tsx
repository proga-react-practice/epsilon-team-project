import React, { useState } from "react";
import AddOrderForm from "../components/customer/AddOrderForm";
import Cards from "../components/customer/Cards";
import { Project } from "../components/customer/Utils";
import Box from "@mui/material/Box";
const Customers: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        
        <AddOrderForm addProject={addProject} />
        <Cards
        projects={projects}
        deleteProject={deleteProject} darkMode={false} />
      </Box>
  );
};
export default Customers;
