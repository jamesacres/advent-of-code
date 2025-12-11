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
  // BFS
  const queue: { currentNode: string; vistedNodes: string[] }[] = [
    { currentNode: from, vistedNodes: [] },
  ];

  while (queue.length > 0) {
    const { currentNode, vistedNodes } = queue.shift()!;

    if (currentNode === to) {
      paths.push(vistedNodes);
    } else {
      for (const nextNode of graph[currentNode]) {
        if (!vistedNodes.includes(nextNode)) {
          queue.push({
            currentNode: nextNode,
            vistedNodes: [...vistedNodes, nextNode],
          });
        }
      }
    }
  }

  return paths;
};

/**
 * Counts the number of distinct paths from 'from' to 'to' in a DAG
 * that pass through ALL specified 'via' nodes.
 *
 * How it works:
 * The key insight is that paths passing through all via nodes can be decomposed into segments. If you need paths `A → X → Y → B` (where X and Y are via nodes), then:
 * total paths = paths(A→X) × paths(X→Y) × paths(Y→B)
 *
 * Uses Kahn's algorithm for topological sorting combined with dynamic programming.
 *
 * Time complexity: O(V + E) where V = vertices, E = edges
 * Space complexity: O(V)
 */
export const countPaths = (
  graph: Graph,
  from: string,
  to: string,
  via: string[] = [],
): number => {
  // If no via nodes, count all paths directly
  if (via.length === 0) {
    return countDirectPaths(graph, from, to);
  }

  // Step 1: Get topological order of via nodes
  // We need to count paths: from → via[0] → via[1] → ... → via[n] → to
  const orderedVia = getTopologicalOrder(graph, via);

  // Step 2: Build the chain of waypoints
  // e.g., [from, via1, via2, to]
  const waypoints = [from, ...orderedVia, to];

  // Step 3: Multiply path counts between consecutive waypoints
  // Paths through all via nodes = paths(from→via1) × paths(via1→via2) × ... × paths(viaN→to)
  let totalPaths = 1;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const segmentPaths = countDirectPaths(
      graph,
      waypoints[i],
      waypoints[i + 1],
    );

    // If any segment has no paths, the total is 0
    if (segmentPaths === 0) {
      return 0;
    }

    totalPaths *= segmentPaths;
  }

  return totalPaths;
};

/**
 * Returns the via nodes sorted in topological order.
 * This ensures we count paths in the correct direction.
 */
const getTopologicalOrder = (graph: Graph, via: string[]): string[] => {
  const viaSet = new Set(via);
  const ordered: string[] = [];

  // Run Kahn's algorithm on full graph, but only collect via nodes
  const nodes = collectAllNodes(graph);
  const inDegree = calculateInDegrees(graph, nodes);

  const queue: string[] = [];
  for (const node of nodes) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }

  while (queue.length > 0) {
    const node = queue.shift()!;

    // Only add to result if it's a via node
    if (viaSet.has(node)) {
      ordered.push(node);
    }

    for (const neighbor of graph[node] ?? []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return ordered;
};

/**
 * Counts all paths from 'from' to 'to' without any via constraint.
 */
const countDirectPaths = (graph: Graph, from: string, to: string): number => {
  const nodes = collectAllNodes(graph);
  const inDegree = calculateInDegrees(graph, nodes);

  // Initialize queue with nodes that have no incoming edges
  const queue: string[] = [];
  for (const node of nodes) {
    if (inDegree[node] === 0) {
      queue.push(node);
    }
  }

  // Initialize path counts - only source starts with 1
  const pathCount: Record<string, number> = {};
  for (const node of nodes) {
    pathCount[node] = 0;
  }
  pathCount[from] = 1;

  // Process in topological order
  while (queue.length > 0) {
    const node = queue.shift()!;

    for (const neighbor of graph[node] ?? []) {
      pathCount[neighbor] += pathCount[node];
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return pathCount[to];
};

/**
 * Collects all nodes in the graph (both keys and neighbors).
 */
const collectAllNodes = (graph: Graph): string[] => {
  const nodeSet = new Set<string>();
  for (const node of Object.keys(graph)) {
    nodeSet.add(node);
    for (const neighbor of graph[node] ?? []) {
      nodeSet.add(neighbor);
    }
  }
  return Array.from(nodeSet);
};

/**
 * Calculates in-degrees for all nodes.
 */
const calculateInDegrees = (
  graph: Graph,
  nodes: string[],
): Record<string, number> => {
  const inDegree: Record<string, number> = {};

  for (const node of nodes) {
    inDegree[node] = 0;
  }

  for (const node of Object.keys(graph)) {
    for (const neighbor of graph[node] ?? []) {
      inDegree[neighbor]++;
    }
  }

  return inDegree;
};
