export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { isValidated, firstName, lastName, job, company, imgSrc, link, opinion  } = await readBody(event)
  const { user } = await requireUserSession(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'You must be logged in to update an opinion.',
    })
  }
  const opinions = await useDrizzle().update(tables.opinions).set({
    isValidated: isValidated === 'false' ? false : true,
    firstName,
    lastName,
    job,
    company,
    imgSrc,
    link,
    opinion
  }).where(eq(tables.opinions.id, Number(id))).returning().get()

  return opinions
})
