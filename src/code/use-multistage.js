import dataTree from "data-tree";
import { uid } from "uid";

const useMultistage = ({ init }) => {
  const parent = init.parent;
  let tree = [];

  const algorithm = (graph, source) => {
    const { distances, previous } = algorithmImplementation({graph, source});
    let result = [];
    for (let vertex = 0; vertex < graph.length; vertex++) {
      const path = reconstructPath(previous, vertex);
      result.push([vertex, `${path.join(' -> ')}`, distances[vertex]])
      // console.log(`Shortest path from ${source} to ${vertex}: ${path.join(' -> ')}`);
      // console.log(`Distance: ${distances[vertex]}`);
    }
    return result;
  };

  const algorithmImplementation = ({graph, source}) => {
    const numVertices = graph.length;
    const distances = Array(numVertices).fill(Infinity);
    const visited = Array(numVertices).fill(false);
    const previous = Array(numVertices).fill(null);
  
    distances[source] = 0;
  
    for (let i = 0; i < numVertices - 1; i++) {
      const minDistanceVertex = getMinDistanceVertex(distances, visited);
      visited[minDistanceVertex] = true;
      // console.log("Visited:",visited);
  
      for (let v = 0; v < numVertices; v++) {
        if (!visited[v] && graph[minDistanceVertex][v] !== 0 && distances[minDistanceVertex] !== Infinity) {
          const newDistance = distances[minDistanceVertex] + graph[minDistanceVertex][v];
          if (newDistance < distances[v]) {
            distances[v] = newDistance;
            previous[v] = minDistanceVertex;
          }
        }
      }
    }
  
    return { distances, previous };
  };

  const reconstructPath = (previous, vertex) => {
    const path = [];
    while (vertex !== null) {
      path.unshift(vertex);
      vertex = previous[vertex];
    }
    return path;
  };

  const getMinDistanceVertex = (distances, visited) => {
    let minDistance = Infinity;
    let minDistanceVertex = -1;
  
    for (let v = 0; v < distances.length; v++) {
      if (!visited[v] && distances[v] < minDistance) {
        minDistance = distances[v];
        minDistanceVertex = v;
      }
    }
  
    return minDistanceVertex;
  }

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
    reconstructPath,
    getTree,
  };
};

export { useMultistage };
