import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const symptomsList = [
  "Chest pain", "Pain in arm or jaw", "Shortness of breath", "Wheezing", 
  "Coughing", "Excessive thirst", "Frequent urination", "Fatigue", 
  "Weight loss", "Loss of appetite", "Dizziness", "Confusion", 
  "Disorientation", "Vision problems", "Blurred vision", "Severe headache", 
  "Nausea", "Slow healing of wounds", "Dry cough", "Skin dimpling", 
  "Nipple discharge", "Breast pain", "Lump in the breast", "Hoarseness", 
  "Tremors"
];

export default function Symptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [drink, setDrink] = useState('');
  const [smoke, setSmoke] = useState('');
  const [diet, setDiet] = useState('');
  const [sleepDuration, setSleepDuration] = useState('');
  const [exerciseHours, setExerciseHours] = useState('');

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((symptom) => symptom !== value));
    }
  };

  const handleSubmit = () => {
    if (!cityError && city) {
      alert(`Selected Symptoms: ${selectedSymptoms.join(", ")}
City: ${city}
Drink: ${drink}
Smoke: ${smoke}
Diet/Nutrition: ${diet}
Sleep Duration: ${sleepDuration} hours
Exercise: ${exerciseHours} hours per week`);
    } else {
      alert("Please enter a valid city.");
    }
  };

  const handleCityChange = (event) => {
    const enteredCity = event.target.value;
    setCity(enteredCity);

    // Simple validation: check if city name contains only letters and spaces
    const cityRegex = /^[a-zA-Z\s]+$/;
    if (cityRegex.test(enteredCity)) {
      setCityError(false);  // No error, valid city
    } else {
      setCityError(true);  // Error, invalid city
    }
  };

  return (
    <Box sx={{ mt: 10, ml: 30, mr: 5 }}>
      <Typography variant="h5" gutterBottom>
        Select Symptoms
      </Typography>

      {/* Accordion for Symptoms List */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="symptoms-content"
          id="symptoms-header"
        >
          <Typography>Select Symptoms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {symptomsList.map((symptom, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox value={symptom} onChange={handleCheckboxChange} />}
                label={symptom}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Location Input */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Enter Your City
        </Typography>
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          value={city}
          onChange={handleCityChange}
          error={cityError}
          helperText={cityError ? "Please enter a valid city name (letters and spaces only)" : ""}
        />
      </Box>

      {/* Drink, Smoke, Diet/Nutrition */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Lifestyle Questions
        </Typography>

        {/* Drink Question */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Drink</InputLabel>
          <Select value={drink} onChange={(e) => setDrink(e.target.value)} label="Drink">
            <MenuItem value="Never">Never</MenuItem>
            <MenuItem value="Occasional">Occasional</MenuItem>
            <MenuItem value="Frequently">Frequently</MenuItem>
          </Select>
        </FormControl>

        {/* Smoke Question */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Smoke</InputLabel>
          <Select value={smoke} onChange={(e) => setSmoke(e.target.value)} label="Smoke">
            <MenuItem value="Never">Never</MenuItem>
            <MenuItem value="Occasional">Occasional</MenuItem>
            <MenuItem value="Frequently">Frequently</MenuItem>
          </Select>
        </FormControl>

        {/* Diet/Nutrition Question */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Diet/Nutrition</InputLabel>
          <Select value={diet} onChange={(e) => setDiet(e.target.value)} label="Diet/Nutrition">
            <MenuItem value="Never">healthy</MenuItem>
            <MenuItem value="Occasional">balanced</MenuItem>
            <MenuItem value="Frequently">junk</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Sleep Duration and Exercise */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Sleep and Exercise
        </Typography>

        {/* Sleep Duration Input */}
        <TextField
          label="Sleep Duration (hours per night)"
          variant="outlined"
          fullWidth
          value={sleepDuration}
          onChange={(e) => setSleepDuration(e.target.value)}
          type="number"
          inputProps={{ min: 0 }}
          sx={{ mb: 3 }}
        />

        {/* Exercise Hours Input */}
        <TextField
          label="Exercise (hours per week)"
          variant="outlined"
          fullWidth
          value={exerciseHours}
          onChange={(e) => setExerciseHours(e.target.value)}
          type="number"
          inputProps={{ min: 0 }}
        />
      </Box>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
