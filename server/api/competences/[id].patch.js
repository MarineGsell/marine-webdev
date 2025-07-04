export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { title, categorie, rate } = await readBody(event)

  const competences = await useDrizzle().update(tables.competences).set({
    title,
    categorie,
    rate
  }).where(eq(tables.competences.id, Number(id))).returning().get()

  return competences
})
