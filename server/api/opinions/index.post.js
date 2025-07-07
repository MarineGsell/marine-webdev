import { tables, useDrizzle } from "../../utils/drizzle"
export default eventHandler(async (event) => {
  const { firstName, lastName, job, company, imgSrc, link, opinion } = await readBody(event)
  
  const opinions = await useDrizzle().insert(tables.opinions).values({
    firstName,
    lastName,
    job,
    company,
    imgSrc,
    link,
    opinion,
    isValidated: false, // Default to false, can be updated later
  }).returning().get()

  return opinions
})
