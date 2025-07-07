export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const deletedCompetence = await useDrizzle().delete(tables.competences).where(and(
    eq(tables.competences.id, Number(id))
  )).returning().get()

  if (!deletedCompetence) {
    throw createError({
      statusCode: 404,
      message: 'Competence not found'
    })
  }
  return deletedCompetence
})
