import dataTree from "data-tree";
import { uid } from "uid";

const useMultistage = () => {
  let parent;
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
    parent = N - 1;
    tree.push({ parent: -1, id: N - 1, cost: -1, to: -1 });
    let newParent = parent;
    let newParentToParent = "";
    for (let i = N - 2; i >= 0; i--) {
      dist[i] = MAX_NUMBER;
      for (let j = i; j < N; j++) {
        if (graphMatrix[i][j] === MAX_NUMBER) continue;
        if (graph[i][j] + dist[j] < dist[i]) {
          newParentToParent = `${i}-${j}`;
        }
        dist[i] = Math.min(dist[i], graph[i][j] + dist[j]);
        tree.push({
          parent: newParent,
          id: `${i}-${j}`,
          cost: graph[i][j],
          to: j,
        });
      }
      tree.push({ parent: newParentToParent, id: i, cost: dist[i], to: -1 });
      newParent = i;
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
        tag: `[${data.values.tag}]`,
      },
    };
  };

  const toParent = (child) => {
    return {
      id: child.id,
      type: "Parent",
      name: child.id,
      tag: `Parent - cost: ${child.cost}`,
    };
  };

  const toChild = (child) => {
    return {
      id: child.id,
      type: "Child",
      name: child.id,
      tag:
        String(child.id).split("-").length > 1
          ? `Child to: ${child.to} - cost: ${child.cost}`
          : `Parent to: ${child.to} - cost: ${child.cost}`,
    };
  };

  const getTreeImplementation = ({ toParent, toChild }) => {
    let nowParent = parent;
    // const oldParent = parent;
    let continueTree = true;
    let panicButton = 0;
    let dataTreeResult = dataTree.create();
    let finishAllLeaf = 1;
    let parentCollectors = [];

    const children = tree.filter((t) => t.id === parent);
    children.forEach((child) => {
      dataTreeResult.insert({
        key: child.id,
        values: toParent(child),
      });
    });
    while (continueTree) {
      const nowParentConst = nowParent;
      const children = tree.filter((t) => t.parent === nowParentConst);
      children.forEach((child) => {
        parentCollectors.push(child.id);
        dataTreeResult.insertTo((data) => data.key === nowParentConst, {
          key: child.id,
          values: toChild(child),
        });
        //   if (child.parent === oldParent) {
        //     dataTreeResult.insert({
        //       key: child.id,
        //       values: toParent(child),
        //     });
        //   } else {
        //     dataTreeResult.insertTo((data) => data.key === nowParentConst, {
        //       key: child.id,
        //       values: toChild(child),
        //     });
        //   }
      });
      finishAllLeaf = finishAllLeaf + children.length;
      nowParent = parentCollectors.pop();
      if (finishAllLeaf === 0) continueTree = false;
      finishAllLeaf--;

      // Panic button to prevent infinite loop only on dev mode
      if (process.env.NODE_ENV === "development") {
        if (panicButton > 10000) {
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
