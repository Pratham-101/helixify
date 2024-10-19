import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useRouteError, Link } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from "@mui/material/styles";

export default function Error() {
  const err = useRouteError();
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#e6f0ff",
        pl: { md: 0, sm: 2 },
      }}
    >
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: { md: 55, sm: 45 } }}
      >
        <ErrorIcon
          sx={{ fontSize: { md: 55, sm: 45 }, color: "#ff4d4d" }}
        />{" "}
        Error {err.status}
      </Typography>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { md: 25, sm: 20 } }}>
        {err.data}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Link to="/">
          <Button
            sx={{
              color: "black",
              textTransform: "none",
              bgcolor: "#80ff80",
              "&:hover": { bgcolor: "#e6e6e6" },
            }}
          >
            Back to Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
