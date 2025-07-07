export default eventHandler(async (event) => {
  const { title, category, imgSrc, imgAlt, repo, link, description } = await readBody(event)
  const { user } = await requireUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to add a competence.',
    })
  }
  
  const works = await useDrizzle().insert(tables.works).values({
    title,
    category,
    imgSrc,
    imgAlt,
    repo,
    link,
    description
  }).returning().get()

  return works
})
