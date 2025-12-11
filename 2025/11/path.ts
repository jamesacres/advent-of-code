export interface Graph {
  [node: string]: string[];
}

export const parseInput = (input: string): Graph =>
  input.split("\n").reduce((result, line) => {
    const [node, connectionsString] = line.split(": ");
    const connections = connectionsString.split(" ");
    return { ...result, [node]: connections };
  }, {});

export const findPaths = (graph: Graph, from: string, to: string) => {
  const paths: string[][] = [];
  // BFS to find minimum button presses
  const queue: { currentNode: string; vistedNodes: string[] }[] = [
    { currentNode: from, vistedNodes: [] },
  ];
  // const visted = new Set<string>([from]);

  while (queue.length > 0) {
    const { currentNode, vistedNodes } = queue.shift()!;

    if (currentNode === to) {
      paths.push(vistedNodes);
    } else {
      for (const nextNode of graph[currentNode]) {
        // if (!visted.has(nextNode)) {
        //visted.add(nextNode);
        queue.push({
          currentNode: nextNode,
          vistedNodes: [...vistedNodes, nextNode],
        });
        //}
      }
    }
  }

  return paths;
};
