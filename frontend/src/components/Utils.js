export const isoDateConverter = (dateValue) => {
  const newDate = new Date(dateValue)
  return newDate.toISOString()
}

export const utcDateConverter = (dateValue) => {
  const newDate = new Date(dateValue)
  return newDate.toUTCString()
}
