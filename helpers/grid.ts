import { cardDirections } from "./directions.ts";

export type CoordsType = [number, number];

export class Coords {
  static add(a: CoordsType, b: CoordsType): CoordsType {
    return [a[0] + b[0], a[1] + b[1]];
  }

  static subtract(a: CoordsType, b: CoordsType): CoordsType {
    return [a[0] - b[0], a[1] - b[1]];
  }

  static equals(a: CoordsType, b: CoordsType): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }

  static distance(a: CoordsType, b: CoordsType): number {
    const [dx, dy] = Coords.subtract(a, b);
    return Math.sqrt(dx * dx + dy * dy);
  }

  static manhattanDistance(a: CoordsType, b: CoordsType): number {
    const [dx, dy] = Coords.subtract(a, b);
    return Math.abs(dx) + Math.abs(dy);
  }

  static toString(coords: CoordsType): string {
    return coords.toString();
  }

  static fromString(str: string): CoordsType {
    return str.split(",").map(Number) as CoordsType;
  }
}

export class Grid<T> {
  private data: T[][];
  readonly rows: number;
  readonly cols: number;

  constructor(grid: T[][]) {
    this.data = grid;
    this.rows = grid.length;
    this.cols = grid[0]?.length || 0;
  }

  static fromString(str: string): Grid<string> {
    return new Grid(str.split("\n").map((row) => row.split("")));
  }

  *[Symbol.iterator]() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        yield [x, y, this.data[y][x]] as [number, number, T];
      }
    }
  }

  at(coords: CoordsType): T {
    return this.data[coords[1]][coords[0]];
  }

  set(coords: CoordsType, value: T) {
    this.data[coords[1]][coords[0]] = value;
  }

  every(predicate: (value: T, coords: CoordsType) => boolean): boolean {
    for (const [x, y, value] of this) {
      if (!predicate(value, [x, y])) {
        return false;
      }
    }
    return true;
  }

  find(predicate: (value: T, coords: CoordsType) => boolean): T | undefined {
    for (const [x, y, value] of this) {
      if (predicate(value, [x, y])) {
        return value;
      }
    }
  }

  findAll(predicate: (value: T, coords: CoordsType) => boolean): T[] {
    const matches = [];

    for (const [x, y, value] of this) {
      if (predicate(value, [x, y])) {
        matches.push(value);
      }
    }

    return matches;
  }

  findCoords(
    predicate: (value: T, coords: CoordsType) => boolean
  ): CoordsType | undefined {
    for (const [x, y, value] of this) {
      if (predicate(value, [x, y])) {
        return [x, y];
      }
    }
  }

  findAllCoords(
    predicate: (value: T, coords: CoordsType) => boolean
  ): CoordsType[] {
    const matches = [];

    for (const [x, y, value] of this) {
      if (predicate(value, [x, y])) {
        matches.push([x, y] as CoordsType);
      }
    }

    return matches;
  }

  findLastCoords(
    predicate: (value: T, coords: CoordsType) => boolean
  ): CoordsType | undefined {
    for (let y = this.rows - 1; y >= 0; y--) {
      for (let x = this.cols - 1; x >= 0; x--) {
        if (predicate(this.data[y][x], [x, y])) {
          return [x, y];
        }
      }
    }
  }

  includes(value: T): boolean {
    return !Coords.equals(this.coordsOf(value), [-1, -1]);
  }

  coordsOf(value: T): CoordsType {
    for (const [x, y, v] of this) {
      if (v === value) {
        return [x, y];
      }
    }
    return [-1, -1];
  }

  lastCoordsOf(value: T): CoordsType {
    for (let y = this.rows - 1; y >= 0; y--) {
      for (let x = this.cols - 1; x >= 0; x--) {
        if (this.data[y][x] === value) {
          return [x, y];
        }
      }
    }
    return [-1, -1];
  }

  map(callbackfn: (value: T, coords: CoordsType) => T): Grid<T> {
    return new Grid(
      this.data.map((row, y) =>
        row.map((value, x) => callbackfn(value, [x, y]))
      )
    );
  }

  some(predicate: (value: T, coords: CoordsType) => boolean): boolean {
    for (const [x, y, value] of this) {
      if (predicate(value, [x, y])) {
        return true;
      }
    }
    return false;
  }

  toString(): string {
    return this.data.map((row) => row.join("")).join("\n");
  }

  inBounds(coords: CoordsType): boolean {
    return (
      coords[0] >= 0 &&
      coords[0] < this.cols &&
      coords[1] >= 0 &&
      coords[1] < this.rows
    );
  }

  neighbors(coords: CoordsType): [...CoordsType, T][] {
    return cardDirections
      .map((dir) => Coords.add(coords, dir))
      .filter((coords) => this.inBounds(coords))
      .map((coords) => [...coords, this.at(coords)]);
  }
}

export class CoordsSet {
  private set: Set<string>;

  constructor(values?: CoordsType[]) {
    this.set = new Set<string>(values?.map(Coords.toString));
  }

  *[Symbol.iterator]() {
    for (const v of this.set) {
      yield Coords.fromString(v);
    }
  }

  add(coords: CoordsType) {
    this.set.add(Coords.toString(coords));
  }

  clear() {
    this.set.clear();
  }

  delete(coords: CoordsType) {
    this.set.delete(Coords.toString(coords));
  }

  difference(other: CoordsSet): CoordsSet {
    const newSet = new CoordsSet();
    newSet.set = this.set.difference(other.set);
    return newSet;
  }

  forEach(
    callbackfn: (value: CoordsType, value2: CoordsType, set: CoordsSet) => void
  ) {
    this.set.forEach((value) => {
      const coords = Coords.fromString(value);
      callbackfn(coords, coords, this);
    });
  }

  has(coords: CoordsType): boolean {
    return this.set.has(Coords.toString(coords));
  }

  intersection(other: CoordsSet): CoordsSet {
    const newSet = new CoordsSet();
    newSet.set = this.set.intersection(other.set);
    return newSet;
  }

  isDisjointFrom(other: CoordsSet): boolean {
    return this.set.isDisjointFrom(other.set);
  }

  isSubsetOf(other: CoordsSet): boolean {
    return this.set.isSubsetOf(other.set);
  }

  isSuperSetOf(other: CoordsSet): boolean {
    return this.set.isSupersetOf(other.set);
  }

  get size(): number {
    return this.set.size;
  }

  symmetricDifference(other: CoordsSet): CoordsSet {
    const newSet = new CoordsSet();
    newSet.set = this.set.symmetricDifference(other.set);
    return newSet;
  }

  toString(): string {
    return Array.from(this.set)
      .map((c) => `[${c}]`)
      .join(", ");
  }

  union(other: CoordsSet): CoordsSet {
    const newSet = new CoordsSet();
    newSet.set = this.set.union(other.set);
    return newSet;
  }

  values(): IteratorObject<CoordsType> {
    return this.set.values().map(Coords.fromString);
  }
}
