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
