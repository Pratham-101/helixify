import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion"; // Animation library

// CircularProgressWithLabel: Wraps the CircularProgress with a label inside it
export default function CircularProgressWithLabel(props) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      position="relative"
      display="inline-flex"
    >
      {/* Circular progress with styled color */}
      <CircularProgress
        variant="determinate"
        {...props}
        size={80} // Custom size
        sx={{
          color: props.value >= 100 ? "green" : "primary.main", // Dynamic color
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Label inside the circular progress */}
        <Typography
          variant="caption"
          component="div"
          color={props.value >= 100 ? "green" : "textSecondary"}
          sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
