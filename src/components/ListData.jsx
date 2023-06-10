import { Button, Card, CardActions, CardContent, Grid, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import React from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

export const ListData = ({ data, onChangeValue, onAdd, onRemove }) => {


  return (
    <Card>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              {data.map((cell, indexCell) => (
                <TableCell key={`cell-${indexCell}`}>
                  <TextField
                    type="number"
                    value={cell}
                    name={`${indexCell}`}
                    id={`${indexCell}`}
                    onChange={onChangeValue}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <Grid
          container
          component="div"
          direction="row"
          justifyContent="flex-end"
          alignItems="stretch"
        >
          <Grid item component="div">
            <Button variant="contained" color="primary" onClick={onAdd}>
              <AddSharpIcon />
            </Button>
          </Grid>
          <Grid item component="div">
            <Button
              variant="contained"
              color="secondary"
              onClick={onRemove}
            >
              <RemoveSharpIcon />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
