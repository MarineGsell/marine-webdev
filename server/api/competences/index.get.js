import { tables, useDrizzle } from "../../utils/drizzle"

export default defineEventHandler(async (event) => {
    const competences = await useDrizzle().select().from(tables.competences).all()
    return competences
})