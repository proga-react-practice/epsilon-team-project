import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
} from "@mui/material";
import { Typography } from "@mui/material";
import { Project } from "./Utils";
import { styled } from "@mui/system";

const TechnologiesList: { id: string; name: string }[] = [
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "js", name: "JavaScript" },
  { id: "ts", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "scala", name: "Scala" },
  { id: "reactjs", name: "React.js" },
  { id: "nodejs", name: "Node.js" },
  { id: "php", name: "PHP" },
];

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const StyledFormWrapper = styled(Box)(({ theme }) => ({
  border: "1px solid #ccc",
  padding: "20px",
  width: "450px",
  backgroundColor: theme.palette.background.default,
  borderRadius: "10px",
}));

const AddOrderForm: React.FC<{
  addProject: (project: Project) => void;
}> = ({ addProject }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !deadline || technologies.length === 0) {
      alert("Please fill in all fields");
      return;
    }
    const newProject: Project = {
      id: Date.now(),
      name,
      description,
      deadline,
      technologies,
    };

    addProject(newProject);

    setName("");
    setDescription("");
    setDeadline("");
    setTechnologies([]);
  };

  const handleCheckboxChange = (value: string) => {
    if (technologies.includes(value)) {
      setTechnologies(technologies.filter((tech) => tech !== value));
    } else {
      setTechnologies([...technologies, value]);
    }
  };

  return (
    <Box
      className="form-container"
      sx={{
        justifyContent: "left",
        padding: "20px",
      }}
    >
      <StyledFormWrapper>
        <StyledTypography
          variant="h2"
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark" ? "#62D682" : "#646BD9",
          }}
        >
          Project Order Form
        </StyledTypography>
        <form onSubmit={handleSubmit}>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <StyledTypography>Project Name:</StyledTypography>
            <TextField
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                width: "350px",
              }}
            />
          </Box>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <StyledTypography>Project Description:</StyledTypography>
            <TextField
              id="project-description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              sx={{
                width: "350px",
              }}
            />
          </Box>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <StyledTypography>Deadline:</StyledTypography>
            <TextField
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </Box>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <StyledTypography>Technologies:</StyledTypography>
            <FormGroup>
              {TechnologiesList.map((tech) => (
                <FormControlLabel
                  key={tech.id}
                  control={
                    <Checkbox
                      checked={technologies.includes(tech.id)}
                      onChange={() => handleCheckboxChange(tech.id)}
                    />
                  }
                  label={tech.name}
                />
              ))}
            </FormGroup>
          </Box>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginRight: "10px",
                bgcolor: (theme) => theme.palette.primary.main,
              }}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ bgcolor: (theme) => theme.palette.secondary.main }}
              onClick={() => {
                setName("");
                setDescription("");
                setDeadline("");
                setTechnologies([]);
              }}
            >
              Clear Form
            </Button>
          </Box>
        </form>
      </StyledFormWrapper>
    </Box>
  );
};

export default AddOrderForm;
