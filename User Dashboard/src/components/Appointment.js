import React from "react";
import { ListItemIcon, ListItemText, Button, Card, Box, Typography } from "@mui/material";
import { TbCalendarEvent } from "react-icons/tb";
import { motion } from "framer-motion"; // For animation

export default function Appointment() {
  // Function to handle button click
  const handleBookAppointment = () => {
    window.location.href = "http://localhost/helixify/client/src/components/crud/form.php";
  };

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      elevation={4}
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        cursor: "pointer",
        mt: 2,
      }}
      onClick={handleBookAppointment}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ListItemIcon>
          <TbCalendarEvent size={24} style={{ color: "#1976d2" }} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h6" sx={{ fontWeight: 500, color: "#1976d2" }}>
            Book Appointment
          </Typography>
        </ListItemText>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          textTransform: "none",
          px: 3,
        }}
      >
        Book Now
      </Button>
    </Card>
  );
}
