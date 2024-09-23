import { type Config } from "drizzle-kit";

import { env } from "~/env";

console.log(`${env.DATABASE_URL}?authToken=${env.DATABASE_TOKEN}`);

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: `${env.DATABASE_URL}?authToken=${env.DATABASE_TOKEN}`,
  },
  tablesFilter: ["test-task_*"],
} satisfies Config;
