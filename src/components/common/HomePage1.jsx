import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, IconButton } from "@mui/material";
import { AddCircleOutline, Assessment, Drafts, History, ExitToApp } from "@mui/icons-material";
import "./HomePage.css";

const Dashboard = () => {
  return (
    <Box className="dashboard-container" sx={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      bgcolor: "#141414",
      overflow: "hidden"
    }}>
      {/* Dashboard Navbar */}
      <AppBar position="static" sx={{ 
        bgcolor: "#1A1A2E", 
        borderBottom: "3px solid #FF7700",
        boxShadow: "0 4px 20px rgba(255, 119, 0, 0.1)"
      }}>
        <Toolbar>
          <Typography variant="h5" sx={{ 
            flexGrow: 1, 
            fontWeight: 800,
            background: "linear-gradient(45deg, #FF7700 30%, #FFAA00 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientShift 6s ease infinite"
          }}>
            SurveySnap Pro
          </Typography>
          
          <Button 
            startIcon={<AddCircleOutline className="pulse-icon" />}
            sx={{ 
              mx: 2, 
              color: "#FF7700",
              "&:hover": { 
                backgroundColor: "rgba(255,119,0,0.1)",
                transform: "scale(1.05)"
              },
              transition: "all 0.3s ease"
            }}
          >
            New Survey
          </Button>
          
          <IconButton sx={{ 
            color: "#FF7700",
            "&:hover": { backgroundColor: "rgba(255,119,0,0.1)" }
          }}>
            <Assessment />
          </IconButton>
          
          <IconButton sx={{ 
            color: "#FF7700", 
            mx: 2,
            "&:hover": { backgroundColor: "rgba(255,119,0,0.1)" }
          }}>
            <Drafts />
          </IconButton>
          
          <Button 
            variant="outlined" 
            startIcon={<ExitToApp />}
            sx={{ 
              color: "#FF7700", 
              borderColor: "#FF7700",
              "&:hover": { 
                borderColor: "#FFAA00",
                transform: "scale(1.05)"
              },
              transition: "all 0.3s ease"
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Dashboard Content */}
      <Container maxWidth="xl" sx={{ 
        py: 4, 
        flexGrow: 1,
        overflowY: "auto",
        height: "calc(100vh - 128px)"
      }}>
        <Grid container spacing={4}>
          {/* Welcome Card */}
          <Grid item xs={12} className="animated-card">
            <div className="gradient-border">
              <Card sx={{ bgcolor: "#282828" }}>
                <CardContent>
                  <Typography variant="h4" sx={{ 
                    color: "#FF7700", 
                    mb: 1,
                    animation: "fadeInUp 0.6s ease-out"
                  }}>
                    Welcome back, Alex!
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#E0E0E0" }}>
                    You have 3 ongoing surveys and 2 new responses
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4} className="animated-card" style={{ animationDelay: "0.2s" }}>
            <Card sx={{ 
              bgcolor: "#1A1A2E", 
              borderRadius: 2,
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #FF7700, #FFAA00)"
              }
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#FF7700", mb: 2 }}>
                  Quick Actions
                </Typography>
                {['Create New Survey', 'View Templates', 'Analyze Results'].map((action, index) => (
                  <Button
                    key={index}
                    fullWidth
                    variant={index === 0 ? "contained" : "outlined"}
                    sx={{
                      mb: 2,
                      bgcolor: index === 0 ? "#FF7700" : "transparent",
                      color: index === 0 ? "white" : "#FF7700",
                      borderColor: "#FF7700",
                      "&:hover": { 
                        bgcolor: index === 0 ? "#CC5500" : "rgba(255,119,0,0.1)",
                        transform: "scale(1.02)"
                      },
                      transition: "all 0.3s ease"
                    }}
                  >
                    {action}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Surveys */}
          <Grid item xs={12} md={8} className="animated-card" style={{ animationDelay: "0.4s" }}>
            <Card sx={{ 
              bgcolor: "#1A1A2E", 
              borderRadius: 2,
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #FF7700, #FFAA00)"
              }
            }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#FF7700" }}>
                    Recent Surveys
                  </Typography>
                  <Button 
                    size="small" 
                    sx={{ 
                      color: "#FF7700",
                      "&:hover": { backgroundColor: "rgba(255,119,0,0.1)" }
                    }}
                    startIcon={<History />}
                  >
                    View All
                  </Button>
                </Box>

                {/* Survey List */}
                <Box sx={{ 
                  bgcolor: "#282828", 
                  borderRadius: 2, 
                  p: 2 
                }}>
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Box 
                      key={item} 
                      className="survey-item"
                      sx={{ 
                        display: "flex", 
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        mb: 1,
                        borderRadius: 1,
                      }}
                    >
                      <Typography sx={{ color: "#E0E0E0" }}>
                        Customer Satisfaction Survey #{item}
                      </Typography>
                      <Button 
                        size="small" 
                        sx={{ 
                          color: "#FF7700",
                          "&:hover": { backgroundColor: "rgba(255,119,0,0.1)" }
                        }}
                      >
                        View Results
                      </Button>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Statistics Card */}
          <Grid item xs={12} className="animated-card" style={{ animationDelay: "0.6s" }}>
            <Card sx={{ 
              bgcolor: "#1A1A2E", 
              borderRadius: 2,
              position: "relative",
              overflow: "hidden",
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: "linear-gradient(90deg, #FF7700, #FFAA00)"
              }
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#FF7700", mb: 3 }}>
                  Monthly Statistics
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { title: "Total Surveys", value: "15", color: "#FF7700" },
                    { title: "Responses", value: "1.2k", color: "#00FF88" },
                    { title: "Completion Rate", value: "82%", color: "#00B4FF" },
                    { title: "Drafts", value: "3", color: "#FFAA00" }
                  ].map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} className="stats-item">
                      <Box sx={{ 
                        bgcolor: "#282828",
                        borderRadius: 2,
                        p: 2,
                        borderLeft: `4px solid ${stat.color}`,
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                          "&:after": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(45deg, ${stat.color} 10%, transparent 90%)`,
                            opacity: 0.1
                          }
                        }
                      }}>
                        <Typography variant="body2" sx={{ color: "#E0E0E0" }}>
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" sx={{ color: stat.color }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Dashboard Footer */}
      <Box sx={{ 
        bgcolor: "#1A1A2E", 
        color: "#FFFFFF", 
        py: 2,
        borderTop: "3px solid #FF7700",
        boxShadow: "0 -4px 20px rgba(255, 119, 0, 0.1)"
      }}>
        <Container maxWidth="xl">
          <Typography variant="body2" sx={{ 
            textAlign: "center", 
            opacity: 0.8,
            color: "#A0A0A0",
            animation: "fadeInUp 0.6s ease-out"
          }}>
            © 2025 SurveySnap Pro | Last login: 2 hours ago
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;