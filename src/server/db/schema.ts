import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `test-task_${name}`);

export const users = createTable("users", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userIdentifier: text("user_identifier", { mode: "text" }),
  cratedAt: int("crated_at", { mode: "timestamp" }).defaultNow(),
});

export const qna = createTable("qna", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  question: text("question", { mode: "text" }),
  sessionId: text("session_id", { mode: "text" }),
  answer: text("answer", { mode: "text" }),
  userId: int("user_id").references(() => users.id),
  cratedAt: int("crated_at", { mode: "timestamp" }).defaultNow(),
});
