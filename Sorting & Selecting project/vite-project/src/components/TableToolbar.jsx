// src/components/TableToolbar.jsx
import { Toolbar, Typography } from "@mui/material";

export default function TableToolbar({ selectedCount }) {
  return (
    <Toolbar className="toolbar">
      <Typography variant="h6">Nutrition</Typography>
      <Typography className="selected-count">
        Selected: {selectedCount}
      </Typography>
    </Toolbar>
  );
}
