import type { EntitySchema, FieldType } from "./schema";

function randomString() {
  return Math.random().toString(36).slice(8, 15);
}

function generateValue(type: FieldType) {
  if (typeof type === "object" && "enum" in type) {
    return type.enum[Math.floor(Math.random() * type.enum.length)];
  }

  switch (type) {
    case "string":
      return randomString();

    case "number":
      return Math.floor(Math.random() * 100);

    case "boolean":
      return Math.random() > 0.5;

    case "date":
      const start = new Date(2020, 0, 1);
      const end = new Date();
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      ).toISOString();

    case "record":
      return generateRecord();

    default:
      return null;
  }
}

export function generateEntity(schema: EntitySchema) {
  const entity: Record<string, unknown> = {
    id: crypto.randomUUID(),
  };

  for (const [key, type] of Object.entries(schema.fields)) {
    entity[key] = generateValue(type);
  }

  return entity;
}

function generateRecord() {
  const size = Math.floor(Math.random() * 3) + 1;
  const obj: Record<string, string> = {};
  for (let i = 0; i < size; i++) {
    obj[randomString()] = randomString();
  }
  return obj;
}
