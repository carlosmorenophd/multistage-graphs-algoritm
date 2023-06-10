import { useState } from "react";
import { useMultistage } from "../code/use-multistage";

const useBodyUi = ({ init }) => {
  const { algorithm, getTree } = useMultistage();
  const [data, setData] = useState(init.data);
  const [alert, setAlert] = useState(false);
  const [result, setResult] = useState(init.result);
  const [tree, setTree] = useState({
    name: "Tree expansion",
    attributes: {
      tag: "Parent",
    },
    children: [],
  });

  const handleAlertClose = () => {
    setAlert(false);
  };

  const handleMatrixAdd = () => {
    setData((prev) => {
      let newMatrix = prev;
      newMatrix = newMatrix.map((row) => {
        row.push(0);
        return row;
      });
      newMatrix.push(Array(prev.length + 1).fill(0));
      return newMatrix;
    });
  };

  const handleMatrixRemove = () => {
    if (data.length === 2) {
      setAlert(true);
    } else {
      setData((prev) => {
        let newMatrix = prev;
        newMatrix = newMatrix.map((row) => {
          row.pop();
          return row;
        });
        newMatrix.pop();
        return newMatrix;
      });
    }
  };

  const handleChangeMatrixValue = (event) => {
    const ids = event.target.id.split("-");
    setData((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex === parseInt(ids[1])
          ? row.map((cell, cellIndex) =>
              cellIndex === parseInt(ids[2]) ? event.target.valueAsNumber : cell
            )
          : row
      )
    );
  };

  const handleChangeListValue = (event) => {
    console.log(event.target.name, event.target.valueAsNumber);
    setData((prev) =>
      prev.map((cell, cellIndex) =>
        cellIndex === parseInt(event.target.name)
          ? event.target.valueAsNumber
          : cell
      )
    );
  };

  const handleListAdd = () => {
    setData((prev) => {
      let newData = prev;
      newData.push(0);
      return newData.map((d) => d);
    });
  };

  const handleListRemove = () => {
    setData((prev) => {
      let newData = prev;
      newData.pop();
      return newData.map((d) => d);
    });
  };

  //Functionality when user click en basic button
  const handleResult = () => {
    setResult([`Minimal path ${algorithm(data)}`]);
    setTree(getTree());
  };

  return {
    alert,
    data,
    result,
    tree,

    handleAlertClose,
    handleChangeListValue,
    handleChangeMatrixValue,
    handleListAdd,
    handleListRemove,
    handleMatrixAdd,
    handleMatrixRemove,
    handleResult,
    setData,
    setResult,
    setTree,
  };
};

export default useBodyUi;
