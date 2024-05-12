import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Checkbox,
  FormGroup,
  Box,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Project } from "./Utils";

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

const AddOrderForm: React.FC<{ addProject: (project: Project) => void }> = ({
  addProject,
}) => {
  const { control, handleSubmit, reset } = useForm<Project>({
    defaultValues: {
      name: "",
      description: "",
      deadline: "",
      technologies: [],
    },
  });

  const onSubmit = (data: Project) => {
    const newProject: Project = {
      ...data,
      id: Date.now(),
    };

    addProject(newProject);
    reset();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <StyledTypography>Project Name:</StyledTypography>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  sx={{
                    width: "350px",
                  }}
                />
              )}
            />
          </Box>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <StyledTypography>Project Description:</StyledTypography>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  required
                  sx={{
                    width: "350px",
                  }}
                />
              )}
            />
          </Box>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <StyledTypography>Deadline:</StyledTypography>
            <Controller
              name="deadline"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} type="date" required />
              )}
            />
          </Box>
          <Box className="form-group" sx={{ marginBottom: "15px" }}>
            <StyledTypography>Technologies:</StyledTypography>
            <Controller
              name="technologies"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormGroup>
                  {TechnologiesList.map((tech) => {
                    const StyledLabel = styled(Typography)(({ theme }) => ({
                      color:
                        theme.palette.mode === "dark" ? "white" : "inherit",
                    }));

                    return (
                      <FormControlLabel
                        key={tech.id}
                        control={
                          <Checkbox
                            checked={field.value.includes(tech.id)}
                            onChange={(_, checked) => {
                              if (checked) {
                                field.value.push(tech.id);
                              } else {
                                field.value = field.value.filter(
                                  (value) => value !== tech.id
                                );
                              }
                              field.onChange(field.value);
                            }}
                          />
                        }
                        label={<StyledLabel>{tech.name}</StyledLabel>}
                      />
                    );
                  })}
                </FormGroup>
              )}
            />
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
              onClick={() => reset()}
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
