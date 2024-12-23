import { Coords, Grid } from "./grid.ts";

import { PriorityQueue } from "./queue.ts";

export class Graph<T> {
  readonly nodes: Set<T>;
  private adjacencyList: Map<T, Map<T, number>>;

  constructor() {
    this.nodes = new Set();
    this.adjacencyList = new Map();
  }

  static fromGrid(grid: Grid<string>, exclusions: string[]): Graph<string> {
    const graph = new Graph<string>();

    for (const [x, y, value] of grid) {
      if (exclusions.includes(value)) continue;

      const neighbors = grid
        .neighbors([x, y])
        .filter(([, , value]) => !exclusions.includes(value));

      const from = Coords.toString([x, y]);
      for (const [nx, ny] of neighbors) {
        const to = Coords.toString([nx, ny]);
        graph.addEdges([[from, to]]);
      }
    }

    return graph;
  }

  addEdges(edges: [T, T, number?][], directed = true) {
    for (const [a, b, weight = 1] of edges) {
      this.nodes.add(a);
      this.nodes.add(b);

      if (!this.adjacencyList.has(a)) this.adjacencyList.set(a, new Map());
      this.adjacencyList.get(a)!.set(b, weight);

      if (!directed) {
        if (!this.adjacencyList.has(b)) this.adjacencyList.set(b, new Map());
        this.adjacencyList.get(b)!.set(a, weight);
      }
    }
  }

  neighbors(node: T): Map<T, number> {
    return this.adjacencyList.get(node) ?? new Map<T, number>();
  }

  dijkstra(start: T, end: T[]): T[] | undefined {
    const queue = new PriorityQueue<T>();
    const backtrack = new Map<T, T>();

    for (const node of this.nodes)
      queue.push(node, node === start ? 0 : Infinity);

    while (!queue.empty()) {
      const [node, weight] = queue.pop()!;

      if (weight === Infinity) break;

      if (end.includes(node)) {
        const path = [];
        let current = node;

        while (current) {
          path.push(current);
          current = backtrack.get(current)!;
        }

        return path.reverse();
      }

      for (const [neighbor, nWeight] of this.neighbors(node)) {
        const nPriority = queue.get(neighbor)?.[1];

        if (nPriority && nPriority > weight + nWeight) {
          queue.set(neighbor, weight + nWeight);
          backtrack.set(neighbor, node);
        }
      }
    }

    return undefined;
  }
}
