import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function Navbar() {
  const getEmail = localStorage.getItem("emailData");
  const getPassword = localStorage.getItem("passwordData");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setIsLoggedIn(!!getEmail && !!getPassword);
  }, [getEmail, getPassword]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#00695f", // Adjusting the background color to fit the theme
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
        }}
      >
        {/* Left Side: Logo / Dashboard Title */}
        <Box>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  color: "#b2dfdb", // Subtle hover effect
                },
                transition: "color 0.3s ease",
                fontSize: { xs: "16px", sm: "20px", md: "22px" },
              }}
            >
              Helixify Dashboard
            </Typography>
          </Link>
        </Box>

        {/* Right Side: User Icon and Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link to="/user">
            <IconButton title="User Profile">
              <AccountCircleIcon
                sx={{
                  color: "#e6f0ff",
                  fontSize: { xs: 30, sm: 35, md: 40 },
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#b2dfdb",
                  },
                }}
              />
            </IconButton>
          </Link>
          {isLoggedIn ? (
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#00796b",
                "&:hover": {
                  backgroundColor: "#004d40",
                },
                px: 3,
                py: 1,
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                fontWeight: 500,
                transition: "background-color 0.3s ease",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "#00796b",
                  "&:hover": {
                    backgroundColor: "#004d40",
                  },
                  px: 3,
                  py: 1,
                  fontSize: { xs: "10px", sm: "12px", md: "14px" },
                  fontWeight: 500,
                  transition: "background-color 0.3s ease",
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
