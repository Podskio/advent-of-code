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

  popBack(): T | undefined {
    return this.queue.pop();
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
      yield v;
    }
  }

  private _sort() {
    this.queue.sort((a, b) => a[1] - b[1]);
  }

  front(): [T, number] {
    return this.queue[0];
  }

  back(): [T, number] {
    return this.queue[this.queue.length - 1];
  }

  get(value: T): [T, number] | undefined {
    return this.queue.find((v) => v[0] === value);
  }

  push(value: T, priority: number) {
    this.queue.push([value, priority]);
    this._sort();
  }

  set(value: T, priority: number) {
    const index = this.queue.findIndex((v) => v[0] === value);
    if (index !== -1) this.queue[index][1] = priority;
    this._sort();
  }

  pop(): [T, number] | undefined {
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
