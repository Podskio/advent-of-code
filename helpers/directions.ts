import { Coords } from "./grid.ts";

export type DirectionType = [-1 | 0 | 1, -1 | 0 | 1];

const directionChars = [
  "^", ">", "v", "<",
  "n", "e", "s", "w",
  "u", "r", "d", "l",
] as const;
export type DirectionChar = (typeof directionChars)[number];

export const cardDirections: DirectionType[] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

export class Direction {
  static left(direction: DirectionType): DirectionType {
    const index = cardDirections.indexOf(direction);
    const newIndex = (index + 3) % cardDirections.length;
    return cardDirections[newIndex];
  }

  static right(direction: DirectionType): DirectionType {
    const index = cardDirections.indexOf(direction);
    const newIndex = (index + 1) % cardDirections.length;
    return cardDirections[newIndex];
  }

  static opposite(direction: DirectionType): DirectionType {
    const index = cardDirections.indexOf(direction);
    const newIndex = (index + 2) % cardDirections.length;
    return cardDirections[newIndex];  
  }

  static fromChar(arrow: DirectionChar): DirectionType {
    switch (arrow.toLowerCase()) {
      case "^":
      case "n":
      case "u":
        return cardDirections[0];
      case ">":
      case "e":
      case "r":
        return cardDirections[1];
      case "v":
      case "s":
      case "d":
        return cardDirections[2];
      case "<":
      case "w":
      case "l":
        return cardDirections[3];
      default:
        throw new Error(`Invalid char: ${arrow}`);
    }
  }

  static toArrow(direction: DirectionType): DirectionChar {
    const index = cardDirections.findIndex((d) => Coords.equals(d, direction));
    switch (index) {
      case 0:
        return "^";
      case 1:
        return ">";
      case 2:
        return "v";
      case 3:
        return "<";
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  }
}
