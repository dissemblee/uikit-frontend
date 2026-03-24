import { defineEntity } from "./schema";

/* Repository */
defineEntity({
  name: "repository",
  seedCount: 15,
  fields: {
    name: "string",
    description: "string",
    ownerId: "number",
    updatedAt: "date",
    meta: "record",
  },
});

/* Component */
defineEntity({
  name: "component",
  seedCount: 15,
  fields: {
    name: "string",
    type: "string",
    version: "number",
    description: "string",
    meta: "record",
    updatedAt: "date",
  },
});

/* User */
defineEntity({
  name: "user",
  seedCount: 15,
  fields: {
    username: "string",
    email: "string",
  },
});

/* Build */
defineEntity({
  name: "build",
  seedCount: 20,
  fields: {
    status: { enum: ["Ожидание", "В процессе", "Завершено", "Ошибка"] },
    startedAt: "date",
    completedAt: "date",
    component: "record",
  },
});
