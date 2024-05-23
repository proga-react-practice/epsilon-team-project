import { createContext, useState, ReactNode, useContext } from "react";
import { Project } from "../customer/Utils";

interface CustomerContextValue {
  projects: Project[];
  addProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  updateProject: (id: number, updatedProject: Project) => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const CustomerContext = createContext<CustomerContextValue | null>(null);

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerContext must be used within a CustomerProvider"
    );
  }
  return context;
};

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
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

  const value = {
    projects,
    addProject,
    deleteProject,
    updateProject,
    setProjects,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};