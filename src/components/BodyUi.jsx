import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { MatrixResult } from "./MatrixResult";
import RouteIcon from '@mui/icons-material/Route';
import MatrixData from "./MatrixData";
import React from "react";
import Tree from "react-d3-tree";
import useBodyUi from "./use-bodyUi";
import Parameter from "./Parameter";

const BodyUi = (props) => {
  const {
    data,
    tree,
    result,
    alert,
    source,
    handleChangeSource,
    handleAlertClose,
    handleResult,
    handleChangeMatrixValue,
    handleMatrixAdd,
    handleMatrixRemove,
  } = useBodyUi({
    init: {
      data: [
        [0, 4, 0, 0, 0, 0, 0, 8, 0],
        [4, 0, 8, 0, 0, 0, 0, 11, 0],
        [0, 8, 0, 7, 0, 4, 0, 0, 2],
        [0, 0, 7, 0, 9, 14, 0, 0, 0],
        [0, 0, 0, 9, 0, 10, 0, 0, 0],
        [0, 0, 4, 14, 10, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 1, 6],
        [8, 11, 0, 0, 0, 0, 1, 0, 7],
        [0, 0, 2, 0, 0, 0, 6, 7, 0]
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
        <Parameter source={source} onChange={handleChangeSource} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          endIcon={<RouteIcon />}
          onClick={handleResult}
        >
          Get minimal single path
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <MatrixResult
          data={result}
          columns={["Destiny", "Path", "cost"]}
          title={`Dijkstra's algorithm - Single path from '${source}'`}
        />
      </Box>
      {/* <Box sx={{ height: "100%" }} minHeight="100%">
        <Tree
          data={tree}
          orientation="vertical"
          nodeSize={{ x: 200, y: 200 }}
        />
      </Box> */}
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
