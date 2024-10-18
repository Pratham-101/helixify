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
          width: 190,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 190,
            boxSizing: "border-box",
            backgroundColor: "#f4f4f4",
            [theme.breakpoints.down("md")]: {
              width: 150,
            },
            [theme.breakpoints.down("sm")]: {
              width: 120,
            },
          },
        }}
      >
        <Box sx={{ overflow: "auto", mt: 8 }}>
          <List>
            {/* About Link */}
            <Link to="/about" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--main-bg-color)",
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <BsFillInfoSquareFill />
                  </ListItemIcon>
                  <ListItemText
                    primary="Personal"
                    sx={{ ml: -2, color: "inherit" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>

            {/* Book Appointment Button */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleBookAppointment}
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--main-bg-color)",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                  <TbCalendarEvent />
                </ListItemIcon>
                <ListItemText
                  primary="Book Appointment"
                  sx={{ ml: -2, color: "inherit" }}
                />
              </ListItemButton>
            </ListItem>

            {/* Symptoms Link */}
            <Link to="/symptoms" style={{ textDecoration: "none" }}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--main-bg-color)",
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                    <TbClipboardCheck />
                  </ListItemIcon>
                  <ListItemText
                                      primary="Predictive diagnosis"
                                      sx={{ ml: -2, color: "inherit" }}
                                    />
                                  </ListItemButton>
                                </ListItem>
                                </Link>
                    
                                {/* Blogs Link */}
                                { <Link to="/Chat bot" style={{ textDecoration: "none" }}>
                                  <ListItem disablePadding>
                                    <ListItemButton
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "var(--main-bg-color)",
                                          color: "#fff",
                                        },
                                      }}
                                    >
                                      <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                                        <SiBlogger />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="Chat bot"
                                        sx={{ ml: -2, color: "inherit" }}
                                      />
                                    </ListItemButton>
                                  </ListItem>
                                </Link> }
                    
                                {/* Connect Doctors Link */}
                                <Link to="/connect-doctors" style={{ textDecoration: "none" }}>
                                  <ListItem disablePadding>
                                    <ListItemButton
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "var(--main-bg-color)",
                                          color: "#fff",
                                        },
                                      }}
                                    >
                                      <ListItemIcon sx={{ color: "var(--main-bg-color)" }}>
                                        <MdConnectWithoutContact />  {/* Icon for Connect Doctors */}
                                      </ListItemIcon>
                                      <ListItemText
                                        primary="Connect Doctors"
                                        sx={{ ml: -2, color: "inherit" }}
                                      />
                                    </ListItemButton>
                                  </ListItem>
                                </Link>
                              </List>
                            </Box>
                          </Drawer>
                        </Box>
                      );
                    }
                    
