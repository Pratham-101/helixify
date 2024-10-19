import React, { useState } from "react";
import { Box, TextField, Typography, Button, Card, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion"; // Animation library

export default function About() {
  const theme = useTheme();

  // State to store user information
  const [userInfo, setUserInfo] = useState({
    name: "Pratham",
    phone: "72086**630",
    email: "xyz@gmail.com",
    age: "20",
    weight: "63",
    height: "175",
    allergies: "no",
    pastIllnesses: "no",
    currentMedication: "no",
  });

  // State to manage form visibility (edit mode)
  const [isEditing, setIsEditing] = useState(true);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Save user data and switch to view mode
  const handleSave = () => {
    setIsEditing(false);
  };

  // Enable editing mode when clicking the Edit button
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        mt: 10,
        ml: 30,
        mr: 5,
        [theme.breakpoints.down("md")]: {
          ml: 22,
        },
        [theme.breakpoints.down("sm")]: {
          ml: 18,
        },
      }}
    >
      <Typography
        component={motion.div}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 600, color: theme.palette.primary.main }}
      >
        About Me
      </Typography>

      <Card
        elevation={4}
        component={motion.div}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          padding: "2rem",
          backgroundColor: "#f5f5f5", // Neutral background color
          borderRadius: "10px",
        }}
      >
        {isEditing ? (
          // If in edit mode, show the form
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { mb: 2, width: "100%" },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email ID"
                  variant="outlined"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Age"
                  variant="outlined"
                  name="age"
                  value={userInfo.age}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Weight (kg)"
                  variant="outlined"
                  name="weight"
                  value={userInfo.weight}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Height (cm)"
                  variant="outlined"
                  name="height"
                  value={userInfo.height}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Allergies"
                  variant="outlined"
                  name="allergies"
                  value={userInfo.allergies}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Past Illnesses"
                  variant="outlined"
                  name="pastIllnesses"
                  value={userInfo.pastIllnesses}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Current Medication"
                  variant="outlined"
                  name="currentMedication"
                  value={userInfo.currentMedication}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    mt: 2,
                  }}
                  onClick={handleSave}
                  fullWidth
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          // If not editing, show the saved information
          <Box>
            <Paper
              elevation={2}
              sx={{
                padding: "1.5rem",
                background: theme.palette.background.default,
                mb: 2,
              }}
            >
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {userInfo.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {userInfo.phone}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {userInfo.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Age:</strong> {userInfo.age}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Weight:</strong> {userInfo.weight} kg
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Height:</strong> {userInfo.height} cm
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Allergies:</strong> {userInfo.allergies}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Past Illnesses:</strong> {userInfo.pastIllnesses}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Current Medication:</strong> {userInfo.currentMedication}
              </Typography>
            </Paper>
            <Button
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "#fff",
              }}
              onClick={handleEdit}
              fullWidth
            >
              Edit
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
}
