export default eventHandler(async (event) => {
  const { title, categorie, rate } = await readBody(event)

  const competences = await useDrizzle().insert(tables.competences).values({
    title,
    categorie,
    rate,
  }).returning().get()

  return competences
})
