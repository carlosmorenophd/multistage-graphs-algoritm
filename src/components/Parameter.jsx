import { Box, TextField } from "@mui/material";
import React from "react";

const Parameter = ({ source, onChange }) => {
  return (
    <Box>
      <TextField
        type="number"
        name="source"
        id="source"
        value={source}
        onChange={onChange}
      />
    </Box>
  );
};

export default Parameter;
