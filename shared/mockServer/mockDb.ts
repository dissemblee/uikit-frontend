"use client"
import { getEntities } from "./schema";
import { generateEntity } from "./factory";

const STORAGE_KEY = "mock.db";

type Tables = Record<string, any[]>;
export const isBrowser =
  typeof window !== "undefined";

let db: Tables = {};

function load(): Tables {
  if (!isBrowser) return {};

  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function save() {
 if (!isBrowser) return {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

/* ---------- AUTO SEED ---------- */

export function initDb() {
  const entities = getEntities();

  for (const schema of entities) {
    if (!db[schema.name]) {
      db[schema.name] = [];

      const count = schema.seedCount ?? 10;

      for (let i = 0; i < count; i++) {
        db[schema.name].push(generateEntity(schema));
      }
    }
  }

  save();
}

export const mockDb = {
  table(name: string) {
    if (!db[name]) db[name] = [];
    return db[name];
  },

  save,
};
