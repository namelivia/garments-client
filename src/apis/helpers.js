export const getImageUrl = (path, width) => {
  if (width === undefined) {
    return `${import.meta.env.VITE_APP_API_ENDPOINT}${path}`
  }
  return `${import.meta.env.VITE_APP_API_ENDPOINT}${path}?width=${width}`
}
