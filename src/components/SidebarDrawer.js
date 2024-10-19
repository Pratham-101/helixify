import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { SiBlogger } from "react-icons/si";
import { TbCalendarEvent, TbClipboardCheck } from "react-icons/tb";
import { MdConnectWithoutContact } from "react-icons/md";  // Icon for Connect Doctors
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import './SidebarDrawer.css';  // Custom CSS for enhanced styles

export default function SidebarDrawer() {
  const theme = useTheme();

  // Function to handle the button click and navigate to the form
  const handleBookAppointment = () => {
    window.location.href = "http://localhost/helixify/client/src/components/crud/form.php";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 220,  // Increase the width to give more space for icons and text
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 220,
            boxSizing: "border-box",
            backgroundColor: "#2E8B8C",  // Teal green background color
            color: "#F1F1F1",  // Light color for text
            [theme.breakpoints.down("md")]: {
              width: 180,
            },
            [theme.breakpoints.down("sm")]: {
              width: 150,
            },
          },
        }}
      >
        <Box sx={{ overflow: "auto", mt: 8 }}>
          <List>
            {/* Personal Information Link */}
            <Link to="/about" className="custom-link">
              <ListItem disablePadding>
                <ListItemButton className="list-item aqua-hover">
                  <ListItemIcon className="icon">
                    <BsFillInfoSquareFill />
                  </ListItemIcon>
                  <ListItemText primary="Personal" />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* Book Appointment Button */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleBookAppointment} className="list-item aqua-hover">
                <ListItemIcon className="icon">
                  <TbCalendarEvent />
                </ListItemIcon>
                <ListItemText primary="Book Appointment" />
              </ListItemButton>
            </ListItem>

            {/* Predictive Diagnosis */}
            <Link to="/symptoms" className="custom-link">
              <ListItem disablePadding>
                <ListItemButton className="list-item aqua-hover">
                  <ListItemIcon className="icon">
                    <TbClipboardCheck />
                  </ListItemIcon>
                  <ListItemText primary="Predictive diagnosis" />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* Chat bot */}
            <Link to="/Chat bot" className="custom-link">
              <ListItem disablePadding>
                <ListItemButton className="list-item aqua-hover">
                  <ListItemIcon className="icon">
                    <SiBlogger />
                  </ListItemIcon>
                  <ListItemText primary="Chat bot" />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* Connect Doctors */}
            <Link to="/connect-doctors" className="custom-link">
              <ListItem disablePadding>
                <ListItemButton className="list-item aqua-hover">
                  <ListItemIcon className="icon">
                    <MdConnectWithoutContact />
                  </ListItemIcon>
                  <ListItemText primary="Connect Doctors" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
