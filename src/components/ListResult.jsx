import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";

export const ListResult = ({ data }) => {
  const content =
    data.length === 0 ? (
      <Skeleton variant="rectangular" width="100%" height={60} />
    ) : (
      <Table>
        <TableBody>
          <TableRow>
            {data.map((cell, indexCell) => (
              <TableCell key={`cell-result-list-${indexCell}`}>{cell}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    );
  return <Box>{content}</Box>;
};
