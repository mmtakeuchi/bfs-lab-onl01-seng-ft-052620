const bfs = (rootNode, vertices, edges) => {
  rootNode.distance = 0;
  let discovered = [rootNode];
  let discoverOrder = [rootNode];
  while (discovered.length != 0) {
    let currentNode = discovered.shift();
    let adjacentNodes = findAdjacent(currentNode.name, vertices, edges);
    discoverOrder = discoverOrder.concat(adjacentNodes);
    markDistanceAndPredecessor(currentNode, adjacentNodes);
    discovered = discovered.concat(adjacentNodes);
  }
  return discoverOrder;
};

const findAdjacent = (nodeName, vertices, edges) => {
  return edges
    .filter((edge) => {
      return edge.includes(nodeName);
    })
    .map((edge) => {
      return edge.filter((node) => {
        return node != nodeName;
      })[0];
    })
    .map((name) => {
      return findNode(name, vertices);
    })
    .filter((node) => {
      return node.distance == null;
    });
};

const markDistanceAndPredecessor = (predecessor, adjacentNodes) => {
  adjacentNodes.map((node) => {
    node.distance = predecessor.distance + 1;
    node.predecessor = predecessor;
  });
};

const findNode = (nodeName, vertices) => {
  return vertices.find((vertex) => {
    return vertex.name == nodeName;
  });
};
