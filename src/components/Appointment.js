import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";  // Use ListItemButton instead of ListItem
import { TbCalendarEvent } from "react-icons/tb";

export default function Appointment() {
  // Function to handle button click
  const handleBookAppointment = () => {
    window.location.href = "http://localhost/helixify/client/src/components/crud/form.php";
  };

  return (
    <ListItemButton onClick={handleBookAppointment}>
      <ListItemIcon>
        <TbCalendarEvent size={20} />
      </ListItemIcon>
      <ListItemText primary="Book Appointment" />
    </ListItemButton>
  );
}
