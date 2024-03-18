import axios from 'axios'
export const getPlaces = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/places`,
  )
  return response.data
}

export const postPlace = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/places`,
    data,
  )
  return response.data
}

export const getActivities = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/activities`,
  )
  return response.data
}

export const postActivity = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/activities`,
    data,
  )
  return response.data
}

export const getGarmentTypes = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garment_types`,
  )
  return response.data
}

export const postGarmentType = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garment_types`,
    data,
  )
  return response.data
}

export const getGarment = async (garmentId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/${garmentId}`,
  )
  return response.data
}

export const getRandomGarment = async (
  selectedPlace,
  selectedType,
  selectedActivity,
) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/random`,
    {
      params: {
        place: selectedPlace,
        garment_type: selectedType,
        activity: selectedActivity,
      },
    },
  )
  return response.data
}

export const getGarments = async (
  selectedPlace,
  selectedType,
  selectedActivity,
) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments`,
    {
      params: {
        place: selectedPlace,
        garment_type: selectedType,
        activity: selectedActivity,
      },
    },
  )
  return response.data
}

export const getWashingGarments = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/washing`,
  )
  return response.data
}

export const getThrownAwayGarments = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/thrown_away`,
  )
  return response.data
}

export const putGarment = async (garmentId, data) => {
  const response = await axios.put(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/${garmentId}`,
    data,
  )
  return response.data
}

export const postGarment = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments`,
    data,
  )
  return response.data
}

export const deleteGarment = async (garmentId) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/${garmentId}`,
  )
  return response.data
}

export const postImage = async (image) => {
  let formData = new FormData()
  formData.append('media', image)
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return response.data.location
}

export const getJournal = async (garmentId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/${garmentId}/journal`,
  )
  return response.data
}

export const postJournalEntry = async (garmentId, data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/${garmentId}/journal`,
    data,
  )
  return response.data
}

export const wearGarment = async (garmentId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/${garmentId}/wear`,
  )
  return response.data
}

export const washGarment = async (garmentId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/${garmentId}/wash`,
  )
  return response.data
}

export const sendToWashGarment = async (garmentId) => {
  const response = await axios.post(
    `${
      import.meta.env.VITE_APP_API_ENDPOINT
    }/garments/${garmentId}/send_to_wash`,
  )
  return response.data
}

export const throwAwayGarment = async (garmentId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/garments/${garmentId}/throw_away`,
  )
  return response.data
}

export const getOutfit = async (selectedPlace, selectedActivity) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/outfits/new`,
    {
      params: {
        place: selectedPlace,
        activity: selectedActivity,
      },
    },
  )
  return response.data
}

export const wearOutfit = async (outfitId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/outfits/${outfitId}/wear`,
  )
  return response.data
}

export const rejectOutfitGarment = async (outfitId, garmentId) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/outfits/${outfitId}/reject/${garmentId}`,
  )
  return response.data
}
