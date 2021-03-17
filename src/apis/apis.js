import axios from "axios";
export const getPlaces = async () => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/places`
  );
  return response.data;
};

export const postPlace = async (data) => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/places`,
    data
  );
  return response.data;
};

export const getGarmentTypes = async () => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/garment_types`
  );
  return response.data;
};

export const postGarmentType = async (data) => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/garment_types`,
    data
  );
  return response.data;
};

export const getGarment = async (garmentId) => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/garments/${garmentId}`
  );
  return response.data;
};

export const getRandomGarment = async (selectedPlace, selectedType) => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/garments/random?place=${selectedPlace}&garment_type=${selectedType}`
  );
  return response.data;
};

export const getGarments = async (selectedPlace, selectedType) => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/garments?place=${selectedPlace}&garment_type=${selectedType}`
  );
  return response.data;
};

export const putGarment = async (garmentId, data) => {
  const response = await axios.put(
    `${process.env.VUE_APP_API_ENDPOINT}/garments/${garmentId}`,
    data
  );
  return response.data;
};

export const postGarment = async (data) => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/garments`,
    data
  );
  return response.data;
};

export const deleteGarment = async (garmentId) => {
  const response = await axios.delete(
    `${process.env.VUE_APP_API_ENDPOINT}/garments/${garmentId}`
  );
  return response.data;
};

export const postImage = async (image) => {
  let formData = new FormData();
  formData.append("media", image);
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.location;
};

export const getJournal = async (garmentId) => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/garments/${garmentId}/journal`
  );
  return response.data;
};

export const postJournalEntry = async (garmentId, data) => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/garments/${garmentId}/journal`,
    data
  );
  return response.data;
};

export const wearGarment = async (garmentId) => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/garments/${garmentId}/wear`
  );
  return response.data;
};

export const washGarment = async (garmentId) => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/garments/${garmentId}/wash`
  );
  return response.data;
};
