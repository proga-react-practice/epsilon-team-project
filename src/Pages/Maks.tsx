import React, { useState } from "react";
import AddOrderForm from "../components/customer/AddOrderForm";
import Cards from "../components/customer/Cards";
import { Project } from "../components/customer/Utils";
import { lightTheme, darkTheme } from "../components/themes/themes";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import DefaultLayout from '../components/layout/deafoltlayout';
const Customers: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <DefaultLayout>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className={`main ${darkMode ? "dark-background" : "light-background"}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <IconButton
          onClick={toggleDarkMode}
          aria-label="toggle dark mode"
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <Brightness4Icon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ flexBasis: "30%", marginRight: "20px" }}>
            <AddOrderForm addProject={addProject} />
          </Box>
          <Box sx={{ flexBasis: "65%" }}>
            <Cards projects={projects} deleteProject={deleteProject} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    </DefaultLayout>
  );
};

export default Customers;
