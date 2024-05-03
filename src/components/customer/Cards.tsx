import React from "react";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { Project } from "./Utils";

const cardSlideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  height: 500,
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  backgroundColor: (props) =>
    props.darkMode ? theme.palette.grey[700] : theme.palette.background.paper,
  animation: `${cardSlideIn} 0.5s ease-out`,

  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "auto",
  },
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const Technology = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontStyle: "italic",
  color: (props) =>
    props.darkMode ? theme.palette.grey[300] : theme.palette.grey[700],
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: theme.spacing(2),
  width: "100%",
  backgroundColor: (props) =>
    props.darkMode ? theme.palette.grey[800] : theme.palette.grey[200],

  // Медіа-запит для малих екранів
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
  },
}));

const Cards: React.FC<{
  projects: Project[];
  deleteProject: (id: number) => void;
  darkMode: boolean;
}> = ({ projects, deleteProject, darkMode }) => {
  return (
    <CardsContainer darkMode={darkMode}>
      <Typography variant="h2" sx={{ fontSize: 25, fontWeight: "bold" }}>
        Project Orders:
      </Typography>
      {projects.map((project) => (
        <StyledCard key={project.id} darkMode={darkMode}>
          <StyledCardContent>
            <Typography variant="h3">{project.name}</Typography>
            <Typography>
              <Technology darkMode={darkMode}>Description:</Technology>{" "}
              {project.description}
            </Typography>
            <Typography>
              <Technology darkMode={darkMode}>Deadline:</Technology>{" "}
              {project.deadline}
            </Typography>
            <Typography>
              <Technology darkMode={darkMode}>Technologies:</Technology>{" "}
              {project.technologies.join(", ")}
            </Typography>
          </StyledCardContent>
          <CardActions>
            <Button
              onClick={() => deleteProject(project.id)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </CardActions>
        </StyledCard>
      ))}
    </CardsContainer>
  );
};

export default Cards;
