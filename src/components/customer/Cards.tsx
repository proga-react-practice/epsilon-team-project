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
  backgroundColor: theme.palette.background.default,
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
  color: theme.palette.text.primary,
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: theme.spacing(2),
  width: "100%",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
  },
}));

const Cards: React.FC<{
  projects: Project[];
  deleteProject: (id: number) => void;
  darkMode: boolean;
}> = ({ projects, deleteProject }) => {
  return (
    <CardsContainer>
      <Typography variant="h2" sx={{ fontSize: 25, fontWeight: "bold" }}>
        Project Orders:
      </Typography>
      {projects.map((project) => (
        <StyledCard key={project.id}>
          <StyledCardContent>
            <Typography variant="h3">{project.name}</Typography>
            <Typography>
              <Technology>Description:</Technology> {project.description}
            </Typography>
            <Typography>
              <Technology>Deadline:</Technology> {project.deadline}
            </Typography>
            <Typography>
              <Technology>Technologies:</Technology>{" "}
              {project.technologies.join(", ")}
            </Typography>
          </StyledCardContent>
          <CardActions>
            <Button
              onClick={() => deleteProject(project.id)}
              variant="contained"
              color="primary"
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
