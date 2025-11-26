import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// ============================================
// Define Drizzle schema
// ============================================
export const lists = sqliteTable("lists", {
	id: integer("id").primaryKey().notNull(),
	name: text("name"),
	created_at: text("created_at"),
	owner_id: text("owner_id"),
});
  
export const todos = sqliteTable("todos", {
	id: text("id").primaryKey().notNull(),
	description: text("description"),
	list_id: text("list_id"),
	// SQLite does not have a boolean type, so we use an integer with a value of 0 or 1
	completed: integer("completed", { mode: "boolean" }),
});
  
// Optional: Define relations for Drizzle relational queries
export const listsRelations = relations(lists, ({ many }) => ({
	todos: many(todos),
}));
  
export const todosRelations = relations(todos, ({ one }) => ({
	list: one(lists, { 
		fields: [todos.list_id],
		references: [lists.id], 
	}),
}));
  
export const drizzleSchema = {
	lists,
	todos,
	listsRelations,
	todosRelations,
};