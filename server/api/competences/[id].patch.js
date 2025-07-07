export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { title, categorie, rate } = await readBody(event)
  const { user } = await requireUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to update a competence.',
    })
  }
  const competences = await useDrizzle().update(tables.competences).set({
    title,
    categorie,
    rate
  }).where(eq(tables.competences.id, Number(id))).returning().get()

  return competences
})
