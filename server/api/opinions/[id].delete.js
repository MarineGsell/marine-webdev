export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const deletedOpinion = await useDrizzle().delete(tables.opinions).where(
    eq(tables.opinions.id, Number(id)
  )).returning().get()

  if (!deletedOpinion) {
    throw createError({
      statusCode: 404,
      message: 'Opinion not found'
    })
  }
  return deletedOpinion
})
