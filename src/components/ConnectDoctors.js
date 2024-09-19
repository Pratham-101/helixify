import React, { useState } from "react";
import { Box, TextField, Card, CardContent, Button, Typography } from "@mui/material";

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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Connect with Doctors
      </Typography>
      
      <TextField
        label="Search by Disease"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Card key={doctor.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{doctor.name}</Typography>
                <Typography variant="body2">Specialty: {doctor.specialty}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBookAppointment(doctor.name)}
                  sx={{ marginTop: 1 }}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No doctors found for your search.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ConnectDoctors;