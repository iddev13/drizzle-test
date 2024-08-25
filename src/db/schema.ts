import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';


export const users = pgTable("users",{
	id: text("id").primaryKey(),
	name:text('name').notNull(),
	email:text('email').unique().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(notes),
}));

export const notes = pgTable("notes", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertNotesSchema = createInsertSchema(notes);

export type User = typeof users.$inferSelect;
export type Note = typeof notes.$inferSelect;