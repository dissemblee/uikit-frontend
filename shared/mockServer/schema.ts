export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "record"
  | { enum: string[] };

export type EntitySchema = {
  name: string;
  fields: Record<string, FieldType>;
  seedCount?: number;
};

const registry = new Map<string, EntitySchema>();

export function defineEntity(schema: EntitySchema) {
  registry.set(schema.name, schema);
}

export function getEntity(name: string) {
  return registry.get(name);
}

export function getEntities() {
  return Array.from(registry.values());
}