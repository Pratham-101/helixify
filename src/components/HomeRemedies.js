import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';

const HomeRemedies = () => {
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
        { name: 'Diarrhea', remedy: 'Stay hydrated and avoid solid foods temporarily.' },
        // Add more diseases and remedies up to 50 (This is a shortened example list)
    ];

    // State for search and pagination
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Show 10 diseases at a time

    // Filter diseases based on search term
    const filteredDiseases = diseases.filter(disease =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get the diseases to display based on pagination
    const displayedDiseases = filteredDiseases.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="home-remedies">
            <Typography variant="h5" gutterBottom>
                Common Diseases and Home Remedies
            </Typography>

            {/* Search bar for filtering diseases */}
            <TextField
                label="Search Disease"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 3 }}
            />

            {/* Accordion for displaying diseases and remedies */}
            {displayedDiseases.map((disease, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography>{disease.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{disease.remedy}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Pagination */}
            <Pagination
                count={Math.ceil(filteredDiseases.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ mt: 3 }}
            />
        </div>
    );
};

export default HomeRemedies;
