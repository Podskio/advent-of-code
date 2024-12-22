export class Counter<T> {
  private counts: Map<T, number>;

  constructor() {
    this.counts = new Map();
  }

  [Symbol.iterator]() {
    return this.counts[Symbol.iterator]();
  }

  increment(key: T, amount = 1) {
    if (this.counts.has(key))
      this.counts.set(key, this.counts.get(key)! + amount);
    else this.counts.set(key, amount);
  }

  get(key: T): number {
    return this.counts.get(key) ?? 0;
  }

  set(key: T, value: number) {
    this.counts.set(key, value);
  }

  total(): number {
    return Array.from(this.counts.values()).reduce((acc, cur) => acc + cur, 0);
  }

  highest(): [T, number] {
    let highest: [T, number] = [this.counts.keys().next().value as T, 0];
    for (const [key, value] of this.counts)
      if (value > highest[1]) highest = [key, value];
    return highest;
  }

  lowest(): [T, number] {
    let lowest: [T, number] = [this.counts.keys().next().value as T, Infinity];
    for (const [key, value] of this.counts)
      if (value < lowest[1]) lowest = [key, value];
    return lowest;
  }
}
