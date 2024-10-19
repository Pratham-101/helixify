import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Pagination,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion'; // Animation library

const diseases = [
  { name: 'Flu', remedy: 'Drink plenty of fluids and rest.' },
  { name: 'Common Cold', remedy: 'Stay hydrated and use a humidifier.' },
  { name: 'Allergies', remedy: 'Avoid allergens and use antihistamines.' },
  { name: 'Headache', remedy: 'Rest and drink water, use pain relievers.' },
  { name: 'Asthma', remedy: 'Use prescribed inhalers, avoid triggers.' },
  { name: 'Diabetes', remedy: 'Manage blood sugar with diet, exercise, and medications.' },
  { name: 'Hypertension', remedy: 'Reduce salt intake, exercise regularly.' },
  { name: 'Migraine', remedy: 'Rest in a dark room, use migraine-specific medications.' },
  { name: 'Cold Sores', remedy: 'Apply antiviral creams and avoid stress.' },
  { name: 'Indigestion', remedy: 'Avoid trigger foods, eat smaller meals.' },
  { name: 'Constipation', remedy: 'Increase fiber intake and drink plenty of water.' },
  { name: 'Back Pain', remedy: 'Rest, use heating pads, and gentle stretching.' },
  { name: 'Acne', remedy: 'Keep skin clean, use over-the-counter treatments.' },
  { name: 'Sinusitis', remedy: 'Use decongestants and saline nasal sprays.' },
  { name: 'Bronchitis', remedy: 'Rest, drink fluids, and use inhalers if needed.' },
  { name: 'Eczema', remedy: 'Moisturize skin and avoid irritants.' },
  { name: 'Insomnia', remedy: 'Establish a regular sleep routine and avoid caffeine.' },
  { name: 'Nausea', remedy: 'Drink ginger tea, eat small meals.' },
  { name: 'Sore Throat', remedy: 'Gargle saltwater and stay hydrated.' },
  { name: 'Diarrhea', remedy: 'Stay hydrated and avoid solid foods temporarily.' }
];

const HomeRemedies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedDiseases = filteredDiseases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handlePageChange = (_, value) => setCurrentPage(value);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ textAlign: 'center', mt: 4 }}
    >
      <Typography
        variant="h5"
        gutterBottom
        component={motion.div}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Common Diseases and Home Remedies
      </Typography>

      <TextField
        label="Search Disease"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}
      />

      {displayedDiseases.map((disease, index) => (
        <Accordion
          key={index}
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{disease.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{disease.remedy}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Pagination
        count={Math.ceil(filteredDiseases.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3 }}
      />
    </Box>
  );
};

export default HomeRemedies;
