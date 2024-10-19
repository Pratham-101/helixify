import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeRemedies from "./HomeRemedies";
import HealthCharts from "./HealthCharts";

export default function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 10,
        ml: { xs: 18, sm: 18, md: 22, lg: 30 },
        textAlign: "center",
      }}
    >
      {["Welcome to the", "User Dashboard Panel", "Have a Good Day!"].map((text, idx) => (
        <Typography
          key={idx}
          variant={idx === 2 ? "h5" : "h4"}
          sx={{ fontSize: { xs: 18, sm: 22, md: 26 } }}
          gutterBottom
        >
          {text}
        </Typography>
      ))}

      <Box sx={{ mt: 10 }} /> {/* Spacing */}

      <HomeRemedies />
      <HealthCharts />
    </Box>
  );
}
