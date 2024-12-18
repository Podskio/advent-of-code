import { PriorityQueue } from "./queue.ts";

export class Graph<T> {
  private nodes: Set<T>;
  private adjacencyList: Map<T, Map<T, number>>;

  constructor() {
    this.nodes = new Set();
    this.adjacencyList = new Map();
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

  neighbors(node: T): Map<T, number> | undefined {
    return this.adjacencyList.get(node);
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

      const neighbors = this.neighbors(node)!;
      if (!neighbors) continue;

      for (const [neighbor, nWeight] of neighbors) {
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
