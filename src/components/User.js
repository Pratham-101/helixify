import React from "react";
import { Box, Typography } from "@mui/material";

export default function User() {
  return (
    <Box sx={{ mt: 10, ml: { xs: 18, sm: 22, md: 30 } }}>
      <Typography variant="h6">My Email: {localStorage.getItem("emailData")}</Typography>
    </Box>
  );
}
