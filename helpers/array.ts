export const cartesian = (a: any[][]) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));
