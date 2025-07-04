export default eventHandler(async (event) => {
  const { title, categorie, rate } = await readBody(event)
  const { user } = await requireUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to add a competence.',
    })
  }
  
  const competences = await useDrizzle().insert(tables.competences).values({
    title,
    categorie,
    rate,
  }).returning().get()

  return competences
})
