// src/components/DataTable.jsx
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";

import { useMemo, useState } from "react";
import TableToolbar from "./TableToolbar";
import { rows } from "../data/rows";
import { headCells } from "../data/headCells";
import { getComparator } from "../utils/sorting";

export default function DataTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows.map((row) => row.name));
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const visibleRows = useMemo(() => {
    return [...rows]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage]);

  return (
    <Box className="app-container">
      <Paper className="table-paper">
        <TableToolbar selectedCount={selected.length} />

        <TableContainer>
          <Table size={dense ? "small" : "medium"}>
            <TableHead>
              <TableRow className="table-header">
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>

                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    {headCell.sortable ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={() => handleRequestSort(headCell.id)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = selected.includes(row.name);

                return (
                  <TableRow
                    key={row.name}
                    className={`table-row ${isItemSelected ? "selected-row" : ""}`}
                    onClick={() => handleClick(row.name)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell>{row.fat}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{row.protein}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="bottom-controls">
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />

          <FormControlLabel
            control={
              <Switch
                checked={dense}
                onChange={(e) => setDense(e.target.checked)}
              />
            }
            label="Dense padding"
          />
        </div>
      </Paper>
    </Box>
  );
}
