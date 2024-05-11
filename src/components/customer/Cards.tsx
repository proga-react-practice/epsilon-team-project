import React from "react";
import { Typography, Box, Card, CardContent, IconButton } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
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

const CardsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
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
}> = ({ projects, deleteProject }) => {
  return (
    <CardsContainer>
      <Typography
        variant="h2"
        sx={{
          fontSize: 40,
          fontWeight: 600,
          fontFamily: "Montserrat",
          marginBottom: "18px",
          color: "primary.main",
        }}
      >
        Project Orders:
      </Typography>
      {projects.map((project) => (
        <StyledCard key={project.id}>
          <CardContent sx={{ p: 2, display: "flex" }}>
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
              <Typography sx={{ mt: "12px", fontFamily: "Montserrat" }}>
                <Box component="span" sx={{ fontWeight: 600 }}>
                  Description:
                </Box>{" "}
                {project.description}
              </Typography>
              <Typography sx={{ mt: "12px", fontFamily: "Montserrat" }}>
                <Box component="span" sx={{ fontWeight: 600 }}>
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
                <Box component="span" sx={{ fontWeight: 600 }}>
                  Technologies:
                </Box>{" "}
                {project.technologies.join(", ")}
              </Typography>
            </Box>
            <Box>
              <IconButton
                onClick={() => deleteProject(project.id)}
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </StyledCard>
      ))}
    </CardsContainer>
  );
};

export default Cards;
