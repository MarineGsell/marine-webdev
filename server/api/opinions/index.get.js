import { eq } from "drizzle-orm"
import { tables, useDrizzle } from "../../utils/drizzle"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    if (query.isValidated === 'true') {
        const opinion = await useDrizzle().select().from(tables.opinions).where(eq(tables.opinions.isValidated, true)).all()
        return opinion
    } else if (query.isValidated === 'false') {
        const opinion = await useDrizzle().select().from(tables.opinions).where(eq(tables.opinions.isValidated, false)).all()
        return opinion
    }
})