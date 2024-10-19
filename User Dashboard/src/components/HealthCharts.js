import React, { useState } from 'react';
import {
    PieChart, Pie, Cell, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { Box, Typography, TextField, Grid } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const HealthCharts = () => {
    // Initial state values for the metrics
    const [calorieData, setCalorieData] = useState([
        { name: 'Breakfast', value: 500 },
        { name: 'Lunch', value: 700 },
        { name: 'Dinner', value: 600 },
        { name: 'Snacks', value: 300 },
    ]);

    const [stepsData, setStepsData] = useState([
        { name: 'Monday', steps: 5000 },
        { name: 'Tuesday', steps: 8000 },
        { name: 'Wednesday', steps: 7500 },
        { name: 'Thursday', steps: 6000 },
        { name: 'Friday', steps: 9000 },
    ]);

    const [sleepData, setSleepData] = useState([
        { name: 'Monday', hours: 7 },
        { name: 'Tuesday', hours: 6 },
        { name: 'Wednesday', hours: 8 },
        { name: 'Thursday', hours: 7.5 },
        { name: 'Friday', hours: 6.5 },
    ]);

    const [waterIntakeData, setWaterIntakeData] = useState([
        { name: 'Monday', liters: 2 },
        { name: 'Tuesday', liters: 1.8 },
        { name: 'Wednesday', liters: 2.2 },
        { name: 'Thursday', liters: 2 },
        { name: 'Friday', liters: 1.5 },
    ]);

    // Function to update the chart data based on user inputs
    const handleUpdate = () => {
        setCalorieData([...calorieData]);
        setStepsData([...stepsData]);
        setSleepData([...sleepData]);
        setWaterIntakeData([...waterIntakeData]);
    };

    return (
        <Box sx={{ mt: 5, textAlign: 'center', px: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 5, fontWeight: 600 }}>
                Health Metrics Dashboard
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {/* Pie Chart for Calories Distribution with Input Fields */}
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                        <Typography variant="h6" gutterBottom>Calories Distribution</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={calorieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {calorieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            {calorieData.map((item, index) => (
                                <TextField
                                    key={index}
                                    label={item.name}
                                    value={item.value}
                                    onChange={(e) => {
                                        const newData = [...calorieData];
                                        newData[index].value = parseInt(e.target.value) || 0;
                                        setCalorieData(newData);
                                    }}
                                    type="number"
                                    size="small"
                                    sx={{ width: '48%' }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Grid>

                {/* Bar Chart for Steps Walked with Input Fields */}
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                        <Typography variant="h6" gutterBottom>Steps Walked</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={stepsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="steps" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            {stepsData.map((item, index) => (
                                <TextField
                                    key={index}
                                    label={item.name}
                                    value={item.steps}
                                    onChange={(e) => {
                                        const newData = [...stepsData];
                                        newData[index].steps = parseInt(e.target.value) || 0;
                                        setStepsData(newData);
                                    }}
                                    type="number"
                                    size="small"
                                    sx={{ width: '48%' }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Grid>

                {/* Line Chart for Water Intake with Input Fields */}
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                        <Typography variant="h6" gutterBottom>Water Intake (Liters)</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={waterIntakeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="liters" stroke="#8884d8" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            {waterIntakeData.map((item, index) => (
                                <TextField
                                    key={index}
                                    label={item.name}
                                    value={item.liters}
                                    onChange={(e) => {
                                        const newData = [...waterIntakeData];
                                        newData[index].liters = parseFloat(e.target.value) || 0;
                                        setWaterIntakeData(newData);
                                    }}
                                    type="number"
                                    size="small"
                                    sx={{ width: '48%' }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Grid>

                {/* Bar Chart for Sleep Hours with Input Fields */}
                <Grid item xs={12} md={6} lg={3}>
                    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                        <Typography variant="h6" gutterBottom>Sleep Hours</Typography>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={sleepData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="hours" fill="#42a5f5" />
                            </BarChart>
                        </ResponsiveContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            {sleepData.map((item, index) => (
                                <TextField
                                    key={index}
                                    label={item.name}
                                    value={item.hours}
                                    onChange={(e) => {
                                        const newData = [...sleepData];
                                        newData[index].hours = parseFloat(e.target.value) || 0;
                                        setSleepData(newData);
                                    }}
                                    type="number"
                                    size="small"
                                    sx={{ width: '48%' }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HealthCharts;
