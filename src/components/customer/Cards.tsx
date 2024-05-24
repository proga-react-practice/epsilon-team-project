import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewResponsesIcon from "@mui/icons-material/ViewList";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useCustomerContext } from "../context/CustomerContext";
import RegistrationForm from "../freelancer/form";
import { Freelancer } from "../freelancer/utils/Freelancer";

const cardSlideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

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
    useCustomerContext();
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const { control, handleSubmit, setValue } = useForm<Project>({
    defaultValues: {
      name: "",
      description: "",
      deadline: "",
      technologies: [],
    },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectResponses, setProjectResponses] = useState<{
    [key: number]: Freelancer[];
  }>({});
  const [openResponsesDialog, setOpenResponsesDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const storedResponses = localStorage.getItem("projectResponses");
    if (storedResponses) {
      setProjectResponses(JSON.parse(storedResponses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projectResponses", JSON.stringify(projectResponses));
  }, [projectResponses]);

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

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleOpenRegistrationDialog = (project: Project) => {
    setSelectedProject(project);
    setOpenRegistrationDialog(true);
  };

  const handleCloseRegistrationDialog = () => {
    setOpenRegistrationDialog(false);
    setSelectedProject(null);
  };

  const handleOpenResponsesDialog = (projectId: number) => {
    setSelectedProjectId(projectId);
    setOpenResponsesDialog(true);
  };

  const handleCloseResponsesDialog = () => {
    setOpenResponsesDialog(false);
    setSelectedProjectId(null);
  };

  return (
    <Grid container>
      <Box sx={{ width: "100%" }}>
        <TextField
          label="Search projects by technologies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "90%", mb: 2 }}
        />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="projectCards">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ maxHeight: "900px", overflow: "auto" }}
              >
                {filteredProjects.map((project, index) => (
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
                                  sx={{
                                    mt: "12px",
                                    fontFamily: "Montserrat",
                                    maxWidth: "350px",
                                    overflow: "hidden",
                                  }}
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
                                <IconButton
                                  onClick={() =>
                                    handleOpenRegistrationDialog(project)
                                  }
                                  color="primary"
                                >
                                  <ReplyIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleOpenResponsesDialog(project.id)
                                  }
                                  color="primary"
                                >
                                  <ViewResponsesIcon />
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
      <Dialog
        open={openRegistrationDialog}
        onClose={handleCloseRegistrationDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Respond to Project</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <RegistrationForm
              initialValues={{
                id: "",
                firstName: "",
                lastName: "",
                age: 0,
                skills: [],
              }}
              onSubmit={(data) => {
                setProjectResponses((prevResponses) => {
                  const newResponses = { ...prevResponses };
                  if (newResponses[selectedProject!.id]) {
                    newResponses[selectedProject!.id] = [
                      ...newResponses[selectedProject!.id],
                      data,
                    ];
                  } else {
                    newResponses[selectedProject!.id] = [data];
                  }
                  return newResponses;
                });
                handleCloseRegistrationDialog();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={openResponsesDialog}
        onClose={handleCloseResponsesDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Responses for Project {selectedProjectId}</DialogTitle>
        <DialogContent>
          {projectResponses[selectedProjectId!]?.map((response, index) => (
            <div key={index}>
              <Typography>
                {response.firstName} {response.lastName}
              </Typography>
              <Typography>Age: {response.age}</Typography>
              <Typography>Skills: {response.skills.join(", ")}</Typography>
              <Divider />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
export default Cards;
