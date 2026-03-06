import api from "./axiosClient";

export const uploadRequest = async (formData) => {

  const response = await api.post("File/Save", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  return response.data;
};

export const deleteFileRequest = async (fileId) => {
  const response = await api.delete(`File/Delete/${fileId}`);

  return response.data;
};



