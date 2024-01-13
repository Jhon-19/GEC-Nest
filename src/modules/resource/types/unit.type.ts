export function computeSize(level) {
  return Math.pow(1024, level);
}

export enum UnitType {
  'K' = computeSize(1),
  'M' = computeSize(2),
  'G' = computeSize(3),
}
