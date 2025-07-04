export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const deletedCompetence = await useDrizzle().delete(tables.competences).where(and(
    eq(tables.competences.id, Number(id))
  )).returning().get()

  if (!deletedCompetence) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found'
    })
  }
  return deletedCompetence
})
