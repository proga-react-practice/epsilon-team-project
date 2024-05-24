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
  padding: "20px",
  maxWidth: "1800px",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {},
}));

const CenteredFormContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  paddingTop: "30px",
});

interface AddOrderFormProps {
  addProject: (newProject: Project) => void;
  onSuccess?: () => void;
}

const AddOrderForm: React.FC<AddOrderFormProps> = ({
  addProject,
  onSuccess,
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
    if (onSuccess) {
      onSuccess();
    }
    reset();
  };

  return (
    <CenteredFormContainer>
      <StyledTypography
        variant="h2"
        sx={{
          marginBottom: "20px",
          color: (theme) =>
            theme.palette.mode === "dark" ? "#62D682" : "#646BD9",
        }}
      >
        Project Order Form
      </StyledTypography>
      <StyledFormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Box sx={{ mb: "2%", width: "100%" }}>
              <StyledTypography sx={{ fontFamily: "Montserrat" }}>
                Project Name:
              </StyledTypography>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Project Name is required",
                  minLength: {
                    value: 6,
                    message: "Project Name must be at least 6 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Project Name must not exceed 30 characters",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{
                      width: "100%",
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ mb: "2%", width: "100%" }}>
              <StyledTypography sx={{ fontFamily: "Montserrat" }}>
                Project Description:
              </StyledTypography>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Project Description is required",
                  minLength: {
                    value: 21,
                    message:
                      "Project Description must be at least 21 characters",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={4}
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{
                      width: "100%",
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: "2%", width: "100%" }}>
              <StyledTypography sx={{ fontFamily: "Montserrat" }}>
                Deadline:
              </StyledTypography>
              <Controller
                name="deadline"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    const currentDate = new Date();
                    const selectedDate = new Date(value);
                    return (
                      selectedDate > currentDate ||
                      "Deadline must be a future date"
                    );
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="date"
                    required
                    error={!!error}
                    helperText={error ? error.message : null}
                    sx={{
                      width: "100%",
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: "2%", width: "100%" }}>
              <StyledTypography sx={{ fontFamily: "Montserrat" }}>
                Technologies:
              </StyledTypography>
              <Controller
                name="technologies"
                control={control}
                rules={{
                  required: "Select at least one technology",
                  validate: (value) =>
                    value.length > 0 || "Select at least one technology",
                }}
                render={({ field, fieldState: { error } }) => (
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
                                let newValue;
                                if (checked) {
                                  if (field.value.length < 3) {
                                    newValue = [...field.value, tech.id];
                                  } else {
                                    newValue = field.value;
                                  }
                                } else {
                                  newValue = field.value.filter(
                                    (value) => value !== tech.id
                                  );
                                }
                                field.onChange(newValue);
                              }}
                            />
                          }
                          label={<StyledLabel>{tech.name}</StyledLabel>}
                        />
                      );
                    })}
                    {error && (
                      <Typography variant="caption" color="error">
                        {error.message}
                      </Typography>
                    )}
                  </FormGroup>
                )}
              />
            </Box>
            <Box sx={{ mb: "2%", width: "100%" }}>
              <Button
                sx={{
                  mt: "8%",
                  width: "100%",
                  height: "48px",
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <Button
                sx={{
                  mt: "3%",
                  width: "100%",
                  height: "48px",
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "Montserrat",
                }}
                type="button"
                onClick={() => {
                  reset({
                    name: "",
                    description: "",
                    deadline: "",
                    technologies: [],
                  });
                }}
                variant="contained"
                color="primary"
              >
                Clear Form
              </Button>
            </Box>
          </FormGroup>
        </form>
      </StyledFormWrapper>
    </CenteredFormContainer>
  );
};

export default AddOrderForm;
