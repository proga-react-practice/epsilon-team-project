import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
const cardSlideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;
import { useCustomerContext } from "../context/CustomerContext";
const StyledCard = styled(Card)(({ theme }) => ({
  width: "500px",
  height: "auto",
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  animation: `${cardSlideIn} 0.5s ease-out`,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "auto",
  },
}));

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

export interface Project {
  id: number;
  name: string;
  description: string;
  deadline: string;
  technologies: string[];
}

const Cards: React.FC = () => {
  const { projects, deleteProject, updateProject, setProjects } =
    useCustomerContext(); // Отримуємо значення з контексту
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const { control, handleSubmit, setValue } = useForm<Project>({
    defaultValues: {
      name: "",
      description: "",
      deadline: "",
      technologies: [],
    },
  });

  const handleEditProject = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setEditingProject(projectId);
      setValue("name", project.name);
      setValue("description", project.description);
      setValue("deadline", project.deadline);
      setValue("technologies", project.technologies);
    }
  };

  const handleUpdateProject = (data: Project) => {
    const updatedProject: Project = {
      ...data,
      id: editingProject || 0,
    };
    updateProject(updatedProject.id, updatedProject);
    setEditingProject(null);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedProjects = [...projects];
    const [movedProject] = reorderedProjects.splice(result.source.index, 1);
    reorderedProjects.splice(result.destination.index, 0, movedProject);
    setProjects(reorderedProjects);
  };

  return (
    <Grid container>
      <Box sx={{ width: "100%" }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="projectCards">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ maxHeight: "900px", overflow: "auto" }}
              >
                {projects.map((project, index) => (
                  <Draggable
                    key={project.id}
                    draggableId={`${project.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <StyledCard
                        key={project.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CardContent sx={{ p: 2, display: "flex" }}>
                          {editingProject === project.id ? (
                            <Box sx={{ flex: 1 }}>
                              <form
                                onSubmit={handleSubmit(handleUpdateProject)}
                              >
                                <Controller
                                  name="name"
                                  control={control}
                                  rules={{
                                    required: "Project Name is required",
                                    minLength: {
                                      value: 6,
                                      message:
                                        "Project Name must be at least 6 characters",
                                    },
                                    maxLength: {
                                      value: 30,
                                      message:
                                        "Project Name must not exceed 30 characters",
                                    },
                                  }}
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <TextField
                                      {...field}
                                      label="Name"
                                      required
                                      error={!!error}
                                      helperText={error ? error.message : null}
                                      sx={{
                                        width: "350px",
                                        marginBottom: "15px",
                                      }}
                                    />
                                  )}
                                />

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
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <TextField
                                      {...field}
                                      label="Description"
                                      multiline
                                      rows={4}
                                      required
                                      error={!!error}
                                      helperText={error ? error.message : null}
                                      sx={{
                                        width: "350px",
                                        marginBottom: "15px",
                                      }}
                                    />
                                  )}
                                />

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
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <TextField
                                      {...field}
                                      label="Deadline"
                                      type="date"
                                      required
                                      error={!!error}
                                      helperText={error ? error.message : null}
                                      sx={{
                                        width: "350px",
                                        marginBottom: "15px",
                                      }}
                                    />
                                  )}
                                />

                                <Controller
                                  name="technologies"
                                  control={control}
                                  rules={{
                                    required: "Select at least one technology",
                                    validate: (value) =>
                                      value.length > 0 ||
                                      "Select at least one technology",
                                  }}
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <FormGroup>
                                      <Typography
                                        variant="body1"
                                        sx={{ marginBottom: "8px" }}
                                      >
                                        Technologies:
                                      </Typography>
                                      {TechnologiesList.map((tech) => {
                                        return (
                                          <FormControlLabel
                                            key={tech.id}
                                            control={
                                              <Checkbox
                                                checked={field.value.includes(
                                                  tech.id
                                                )}
                                                onChange={(_, checked) => {
                                                  let newValue;
                                                  if (checked) {
                                                    if (
                                                      field.value.length < 3
                                                    ) {
                                                      newValue = [
                                                        ...field.value,
                                                        tech.id,
                                                      ];
                                                    } else {
                                                      newValue = field.value;
                                                    }
                                                  } else {
                                                    newValue =
                                                      field.value.filter(
                                                        (value) =>
                                                          value !== tech.id
                                                      );
                                                  }
                                                  field.onChange(newValue);
                                                }}
                                              />
                                            }
                                            label={tech.name}
                                          />
                                        );
                                      })}
                                      {error && (
                                        <Typography
                                          variant="caption"
                                          color="error"
                                        >
                                          {error.message}
                                        </Typography>
                                      )}
                                    </FormGroup>
                                  )}
                                />

                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  sx={{
                                    marginTop: "15px",
                                  }}
                                >
                                  Save
                                </Button>
                              </form>
                            </Box>
                          ) : (
                            <>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="h5"
                                  sx={{
                                    mb: 1,
                                    fontFamily: "Montserrat",
                                    fontWeight: 600,
                                  }}
                                >
                                  {project.name}
                                </Typography>
                                <Typography
                                  sx={{ mt: "12px", fontFamily: "Montserrat" }}
                                >
                                  <Box
                                    component="span"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    Description:
                                  </Box>{" "}
                                  {project.description}
                                </Typography>
                                <Typography
                                  sx={{ mt: "12px", fontFamily: "Montserrat" }}
                                >
                                  <Box
                                    component="span"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    Deadline:
                                  </Box>{" "}
                                  {project.deadline}
                                </Typography>
                                <Typography
                                  sx={{
                                    mt: "12px",
                                    fontFamily: "Montserrat",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <Box
                                    component="span"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    Technologies:
                                  </Box>{" "}
                                  {project.technologies.join(", ")}
                                </Typography>
                              </Box>
                              <Box>
                                <IconButton
                                  onClick={() => handleEditProject(project.id)}
                                  color="primary"
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() => deleteProject(project.id)}
                                  color="primary"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </>
                          )}
                        </CardContent>
                      </StyledCard>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Grid>
  );
};
export default Cards;
