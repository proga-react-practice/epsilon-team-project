import { Typography, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        pl: {
          lg: "10%",
          xl: "10%",
        },
        height: "100%",
      }}
    >
      <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
        <Box sx={{ mt: { xs: "20%", md: "25%" } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: { xs: "24px", md: "48px" },
            }}
            color="primary"
          >
            Freelance Your Way to Success
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
            sx={{
              maxWidth: "100%",
              fontFamily: "Montserrat",
              fontSize: { xs: "16px", md: "24px" },
            }}
            color="primary"
          >
            Developers: Max, Vova - students of Computer Science, LNU
          </Typography>

          <Box sx={{ display: "flex", mt: "4%" }}>
            <Button
              onClick={() => navigate("/maks")}
              variant="contained"
              color="primary"
              sx={{
                height: { xs: "35px", md: "45px" },
                fontFamily: "Montserrat",
                mr: { xs: "6px", md: "12px" },
                fontSize: { xs: "12px", md: "16px" },
                padding: { xs: "12px", md: "24px" },
              }}
            >
              I offer a job
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/vova")}
              sx={{
                height: { xs: "35px", md: "45px" },
                fontFamily: "Montserrat",
                fontSize: { xs: "12px", md: "16px" },
                padding: { xs: "12px", md: "24px" },
              }}
            >
              I offer services
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
        <Box
          sx={{
            mt: { xs: "2%", md: "25%", lg: "15%", sm: "20%", xl: "15%" },
            ml: "12%",
            display: "flex",
            mr: "10%",
          }}
        >
          <img src={"home5.png"} alt="Home" style={{ maxWidth: "100%" }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
