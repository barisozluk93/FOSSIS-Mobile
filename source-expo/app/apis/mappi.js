import api from "./axiosClient";

export const getBuildingsRequest = async (formData) => {

  const response = await api.get("Map/GetBuildings")
  return response.data;
};

export const deleteFileRequest = async (fileId) => {
  const response = await api.delete(`File/Delete/${fileId}`);

  return response.data;
};



