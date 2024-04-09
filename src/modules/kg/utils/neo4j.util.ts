export function buildQuery(cypher: string) {
  return { cypher: cypher };
}

export function recordsToObjects(records: any[]) {
  return records.map((record) => record.toObject());
}
