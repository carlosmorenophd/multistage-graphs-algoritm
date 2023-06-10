import { Alert, Box, Button, List, Snackbar, Typography } from "@mui/material";
import { MatrixResult } from "./MatrixResult";
import RouteIcon from "@mui/icons-material/Route";
import MatrixData from "./MatrixData";
import React from "react";
import Tree from "react-d3-tree";
import useBodyUi from "./use-bodyUi";
import { ListResult } from "./ListResult";

const BodyUi = (props) => {
  const {
    data,
    tree,
    result,
    alert,
    handleAlertClose,
    handleResult,
    handleChangeMatrixValue,
    handleMatrixAdd,
    handleMatrixRemove,
  } = useBodyUi({
    init: {
      data: [
        [0, 9, 7, 3, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 4, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 11, 8, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 6, 5, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      result: [],
    },
  });
  return (
    <Box sx={{ m: 1, p: 2, height: "100%" }} minHeight="100%">
      <Typography variant="body1" component="div">
        Data:
      </Typography>
      <Box>
        <MatrixData
          matrix={data}
          onChangeValue={handleChangeMatrixValue}
          onAdd={handleMatrixAdd}
          onRemove={handleMatrixRemove}
          readOnlyMode="mainDiagonal"
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          endIcon={<RouteIcon />}
          onClick={handleResult}
        >
          Get low cost path
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <ListResult
          data={result}
          title={`Multistage result: `}
        />
      </Box>
      <Box sx={{ height: "100%" }} minHeight="100%">
        <Tree
          data={tree}
          orientation="vertical"
          nodeSize={{ x: 250, y: 100 }}
        />
      </Box>
      <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          The size of matrix must be 2 or more!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BodyUi;
