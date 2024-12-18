export class Queue<T> {
  private queue: T[];

  constructor(values?: T[]) {
    this.queue = values ?? [];
  }

  *[Symbol.iterator]() {
    for (const v of this.queue) {
      yield v;
    }
  }

  front(): T {
    return this.queue[0];
  }

  back(): T {
    return this.queue[this.queue.length - 1];
  }

  push(value: T) {
    this.queue.push(value);
  }

  pop(): T | undefined {
    return this.queue.shift();
  }

  get size(): number {
    return this.queue.length;
  }

  empty(): boolean {
    return this.queue.length === 0;
  }

  clear() {
    this.queue = [];
  }
}

export class PriorityQueue<T> {
  private queue: [T, number][];

  constructor(values?: [T, number][]) {
    this.queue = values ?? [];
    this.queue.sort((a, b) => a[1] - b[1]);
  }

  *[Symbol.iterator]() {
    for (const v of this.queue) {
      yield v[0];
    }
  }

  front(): T {
    return this.queue[0][0];
  }

  back(): T {
    return this.queue[this.queue.length - 1][0];
  }

  push(value: T, priority: number) {
    this.queue.push([value, priority]);
    this.queue.sort((a, b) => a[1] - b[1]);
  }

  pop(): T | undefined {
    return this.queue.shift()?.[0];
  }

  get size(): number {
    return this.queue.length;
  }

  empty(): boolean {
    return this.queue.length === 0;
  }

  clear() {
    this.queue = [];
  }
}
