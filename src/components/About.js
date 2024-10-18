import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

export default function About() {
  const theme = useTheme();

  // State to store user information
  const [userInfo, setUserInfo] = useState({
    name: 'Pratham',
    phone: '72086**630',
    email: 'xyz@gmail.com',
    age: '20',
    weight: '63',
    height: '175',
    allergies: 'no',
    pastIllnesses: 'no',
    currentMedication: 'no'
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
      <Typography variant="h5" gutterBottom>
        About Me
      </Typography>

      {isEditing ? (
        // If in edit mode, show the form
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mb: 2, width: '100%' },
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
          />
          <TextField
            label="Email ID"
            variant="outlined"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Age"
            variant="outlined"
            name="age"
            value={userInfo.age}
            onChange={handleInputChange}
          />
          <TextField
            label="Weight (kg)"
            variant="outlined"
            name="weight"
            value={userInfo.weight}
            onChange={handleInputChange}
          />
          <TextField
            label="Height (cm)"
            variant="outlined"
            name="height"
            value={userInfo.height}
            onChange={handleInputChange}
          />
          <TextField
            label="Allergies"
            variant="outlined"
            name="allergies"
            value={userInfo.allergies}
            onChange={handleInputChange}
          />
          <TextField
            label="Past Illnesses"
            variant="outlined"
            name="pastIllnesses"
            value={userInfo.pastIllnesses}
            onChange={handleInputChange}
          />
          <TextField
            label="Current Medication"
            variant="outlined"
            name="currentMedication"
            value={userInfo.currentMedication}
            onChange={handleInputChange}
          />

          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      ) : (
        // If not editing, show the saved information
        <Box>
          <Typography variant="body1" gutterBottom><strong>Name:</strong> {userInfo.name}</Typography>
          <Typography variant="body1" gutterBottom><strong>Phone:</strong> {userInfo.phone}</Typography>
          <Typography variant="body1" gutterBottom><strong>Email:</strong> {userInfo.email}</Typography>
          <Typography variant="body1" gutterBottom><strong>Age:</strong> {userInfo.age}</Typography>
          <Typography variant="body1" gutterBottom><strong>Weight:</strong> {userInfo.weight} kg</Typography>
          <Typography variant="body1" gutterBottom><strong>Height:</strong> {userInfo.height} cm</Typography>
          <Typography variant="body1" gutterBottom><strong>Allergies:</strong> {userInfo.allergies}</Typography>
          <Typography variant="body1" gutterBottom><strong>Past Illnesses:</strong> {userInfo.pastIllnesses}</Typography>
          <Typography variant="body1" gutterBottom><strong>Current Medication:</strong> {userInfo.currentMedication}</Typography>

          <Button variant="contained" color="secondary" onClick={handleEdit}>
            Edit
          </Button>
        </Box>
      )}
    </Box>
  );
}
