import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const competences = sqliteTable('competences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  categorie: text('categorie').notNull(),
  rate: integer('rate').notNull(),
})

export const opinions = sqliteTable('opinions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  job: text('job').notNull(),
  imgSrc: text('imgSrc').notNull(),
  imgAlt: text('imgAlt').notNull(),
  link: text('link').notNull(),
  opinion: text('opinion').notNull()
})

export const works = sqliteTable('works', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  imgSrc: text('imgSrc').notNull(),
  imgAlt: text('imgAlt').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  repo: text('repo').notNull(),
  link: text('link').notNull()
})





