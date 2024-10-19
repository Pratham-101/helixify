import React, { useState } from "react";
import { Box, TextField, Card, CardContent, Button, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion"; // For animations

// Sample data for doctors (unchanged)
const doctorsData = [
  { id: 1, name: "Dr. Smith", specialty: "Coronary Artery Disease" },
  { id: 2, name: "Dr. Johnson", specialty: "Ischemic Stroke" },
  { id: 3, name: "Dr. Williams", specialty: "Type 1 Diabetes" },
  { id: 4, name: "Dr. Brown", specialty: "Type 2 Diabetes" },
  { id: 5, name: "Dr. Jones", specialty: "Pulmonary Fibrosis" },
  { id: 6, name: "Dr. Garcia", specialty: "Asthma" },
  { id: 7, name: "Dr. Martinez", specialty: "Breast Cancer" },
  { id: 8, name: "Dr. Davis", specialty: "Lung Cancer" },
  { id: 9, name: "Dr. Rodriguez", specialty: "Parkinson's Disease" },
  { id: 10, name: "Dr. Wilson", specialty: "Alzheimer's Disease" },
];

const ConnectDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDoctors = doctorsData.filter((doctor) =>
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (doctorName) => {
    alert(`Appointment booked with ${doctorName}`);
    // Add logic to redirect or save appointment booking
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 3 },
        marginLeft: { xs: 0, md: "240px" }, // Adjust based on your sidebar width
        marginTop: "64px", // Adjust based on your top header height
        width: { xs: "100%", md: "calc(100% - 240px)" }, // Adjust based on your sidebar width
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, fontWeight: "bold", color: "primary.main" }}
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Connect with Doctors
      </Typography>

      <TextField
        label="Search by Disease"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 3 }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      <Grid container spacing={2}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Grid item xs={12} md={6} lg={4} key={doctor.id}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                sx={{
                  borderRadius: "12px",
                  boxShadow: 3,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginBottom: 1 }}
                    color="primary"
                  >
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                    Specialty: {doctor.specialty}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookAppointment(doctor.name)}
                    sx={{ width: "100%" }}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{ padding: 3, textAlign: "center", boxShadow: 3 }}
            >
              <Typography variant="body1" color="textSecondary">
                No doctors found for your search.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ConnectDoctors;
