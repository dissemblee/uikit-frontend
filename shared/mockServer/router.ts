import { mockDb } from "./mockDb";

export function crud(table: string, method: string, id?: string, body?: any) {
  const data = mockDb.table(table);

  switch (method) {
    case "GET":
      if (id) return data.find((e) => e.id === id);
      return data;

    case "POST":
      const created = { id: crypto.randomUUID(), ...body };
      data.unshift(created);
      mockDb.save();
      return created;

    case "PATCH":
      const index = data.findIndex((e) => e.id === id);
      if (index === -1) return null;

      data[index] = { ...data[index], ...body };
      mockDb.save();
      return data[index];

    case "DELETE":
      mockDb.table(table).splice(
        data.findIndex((e) => e.id === id),
        1
      );
      mockDb.save();
      return { success: true };
  }
}
