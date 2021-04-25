export const getImageUrl = (path, width) => {
  if (width === undefined) {
    return `${process.env.VUE_APP_API_ENDPOINT}${path}`
  }
  return `${process.env.VUE_APP_API_ENDPOINT}${path}?width=${width}`
}
