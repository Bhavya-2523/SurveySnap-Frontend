import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#141414" }}>
      {/* Navbar with accent border */}
      <AppBar position="static" sx={{ bgcolor: "#1A1A2E", boxShadow: 3, borderBottom: "3px solid #FF7700" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ 
            flexGrow: 1, 
            fontWeight: 800, 
            letterSpacing: 2,
            background: "linear-gradient(45deg, #FF7700 30%, #FFAA00 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            SurveySnap
          </Typography>
          <Button color="inherit" sx={{ mx: 2, fontWeight: 600, "&:hover": { color: "#FF7700" } }}>
            Create Survey
          </Button>
          <Button color="inherit" sx={{ mx: 2, fontWeight: 600, "&:hover": { color: "#FF7700" } }}>
            Browse Surveys
          </Button>
          <Button 
            variant="outlined" 
            sx={{ 
              mx: 2, 
              color: "#FF7700", 
              borderColor: "#FF7700",
              "&:hover": { 
                borderColor: "#FFAA00", 
                backgroundColor: "rgba(255,119,0,0.1)" 
              }
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section with gradient background */}
      <Container maxWidth="md" sx={{ py: 8, flexGrow: 1 }}>
        <Box
          sx={{
            bgcolor: "#282828",
            borderRadius: 4,
            p: 6,
            boxShadow: "0 8px 32px rgba(255,119,0,0.1)",
            transition: "transform 0.3s",
            "&:hover": { transform: "translateY(-4px)" }
          }}
        >
          <Typography variant="h2" sx={{ 
            fontWeight: 900, 
            mb: 3, 
            color: "#FF7700",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}>
            Errorless Survey Creation
          </Typography>
          <Typography variant="h5" sx={{ 
            mb: 4, 
            color: "#E0E0E0", 
            lineHeight: 1.6,
            fontStyle: "italic"
          }}>
            Transform feedback into actionable insights with our intelligent platform
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: "#FF7700",
              borderRadius: 3,
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              "&:hover": { 
                bgcolor: "#CC5500",
                boxShadow: "0 4px 16px rgba(255,119,0,0.4)"
              }
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>

      {/* Modern Footer */}
      <Box sx={{ 
        bgcolor: "#1A1A2E", 
        color: "#FFFFFF", 
        py: 4,
        borderTop: "3px solid #FF7700",
        mt: "auto"
      }}>
        <Container maxWidth="md">
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center"
          }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 500,
              letterSpacing: 1.1
            }}>
              © 2025 SurveySnap
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button 
                color="inherit" 
                sx={{ 
                  "&:hover": { 
                    color: "#FF7700", 
                    transform: "translateY(-2px)" 
                  },
                  transition: "all 0.3s"
                }}
              >
                Privacy Policy
              </Button>
              <Button 
                color="inherit" 
                sx={{ 
                  "&:hover": { 
                    color: "#FF7700", 
                    transform: "translateY(-2px)" 
                  },
                  transition: "all 0.3s"
                }}
              >
                Terms of Service
              </Button>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ 
            textAlign: "center", 
            mt: 2, 
            opacity: 0.8,
            color: "#A0A0A0"
          }}>
            Empowering data-driven decisions worldwide
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;