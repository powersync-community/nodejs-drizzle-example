import "dotenv/config";
import { PowerSyncDatabase } from "@powersync/node";
import {
  wrapPowerSyncWithDrizzle,
  DrizzleAppSchema
} from "@powersync/drizzle-driver";
import { Connector } from "./connector.js";
import { drizzleSchema } from "./schema.js";

// Generate PowerSync schema from Drizzle
const schema = new DrizzleAppSchema(drizzleSchema);

// ============================================
// Initialize PowerSync + Drizzle
// ============================================
const powerSync = new PowerSyncDatabase({
  schema,
  database: { dbFilename: "drizzle-test.sqlite" },
  logger: console
});

// Wrap PowerSync with Drizzle
const db = wrapPowerSyncWithDrizzle(powerSync, {
  schema: drizzleSchema,
});

// ============================================
// Connect and sync
// ============================================
await powerSync.connect(new Connector());
await powerSync.init();
await powerSync.waitForFirstSync();

// ============================================
// Query with Drizzle syntax
// ============================================

// Select all lists
const allLists = await db.select().from(lists);
console.log("All lists:", allLists);

// Select all todos
const allTodos = await db.select().from(todos);
console.log("All todos:", allTodos);

// Select with a where clause
const incompleteTodos = await db
  .select()
  .from(todos)
  .where(eq(todos.completed, false));
console.log("Incomplete todos:", incompleteTodos);

// Relational query (requires relations defined)
const listsWithTodos = await db.query.lists.findMany({
  with: {
    todos: true,
  },
});
console.log("Lists with todos:", JSON.stringify(listsWithTodos, null, 2));

// ============================================
// 6. Cleanup
// ============================================
await powerSync.disconnectAndClear();
console.log("Done!");

process.exit(0);