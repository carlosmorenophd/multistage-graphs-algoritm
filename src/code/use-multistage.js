import dataTree from "data-tree";
import { uid } from "uid";

const useMultistage = ({ init }) => {
  const parent = init.parent;
  let tree = [];
  const MAX_NUMBER = 1000;

  const algorithm = (graphMatrix) => {
    const result = algorithmImplementation({ graph: graphMatrix });
    return result;
  };

  const algorithmImplementation = ({ graph }) => {
    const graphMatrix = graph.map((row) =>
      row.map((cell) => (cell === 0 ? MAX_NUMBER : cell))
    );
    let dist = [];
    const N = graphMatrix.length;
    dist[N - 1] = 0;
    for (let i = N - 2; i >= 0; i--) {
      dist[i] = MAX_NUMBER;
      for (let j = i; j < N; j++) {
        if (graphMatrix[i][j] === MAX_NUMBER) continue;
        dist[i] = Math.min(dist[i], graph[i][j] + dist[j]);
      }
    }
    return dist[0];
  };

  const getTree = () => {
    if (tree.length === 0) {
      throw new Error(
        "The merge sort function must be called before get tree function!"
      );
    } else {
      return getTreeImplementation({ toParent, toChild }).export((data) => {
        return createExport(data);
      });
    }
  };

  const createExport = (data) => {
    return {
      name: `${data.values.name}`,
      attributes: {
        tag: `[${data.values.path}] = ${data.values.cost}`,
      },
    };
  };

  const toParent = (child) => {
    return {
      id: child.id,
      type: "Parent",
      name: `${child.source}`,
      path: `${child.source}-${child.destiny}`,
      cost: `${child.cost}`,
    };
  };

  const toChild = (child) => {
    return {
      id: child.id,
      type: "Child",
      name: `${child.source}`,
      path: `${child.source}-${child.destiny}`,
      cost: `${child.cost}`,
    };
  };

  const getTreeImplementation = ({ toParent, toChild }) => {
    let nowParent = parent;
    const oldParent = parent;
    let continueTree = true;
    let panicButton = 0;
    let dataTreeResult = dataTree.create();
    let finishAllLeaf = 1;
    let parentCollectors = [];
    while (continueTree) {
      const nowParentConst = nowParent;
      const children = tree.filter((t) => t.parent === nowParentConst);
      children.forEach((child) => {
        parentCollectors.push(child.id);
        if (child.parent === oldParent) {
          dataTreeResult.insert({
            key: child.id,
            values: toParent(child),
          });
        } else {
          dataTreeResult.insertTo((data) => data.key === nowParentConst, {
            key: child.id,
            values: toChild(child),
          });
        }
      });
      finishAllLeaf = finishAllLeaf + children.length;
      nowParent = parentCollectors.pop();
      if (finishAllLeaf === 0) continueTree = false;
      finishAllLeaf--;

      // Panic button to prevent infinite loop only on dev mode
      if (process.env.NODE_ENV === "development") {
        if (panicButton > 100) {
          console.warn("Panic button activate");
          continueTree = false;
        } else {
          panicButton++;
        }
      }
    }
    return dataTreeResult;
  };

  return {
    algorithm,
    getTree,
  };
};

export { useMultistage };
