import api from './axiosClient';

export const pagingProjectRequest = async (page, pageSize, searchTerm, userId) => {
    const response = await api.get(`Project/Paginate/${userId}`, {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : ''
      },
    });

    return response.data;
};

export const getByIdRequest = async (id) => {
    const response = await api.get(`Project/${id}`);

    return response.data;
};

export const saveRequest = async (data) => {
    const response = await api.post(`Project/Save`, data);

    return response.data;
};

export const editRequest = async (data) => {
    const response = await api.post(`Project/Update`, data);

    return response.data;
};

export const deleteRequest = async (id) => {
    const response = await api.delete(`Project/Delete/${id}`);

    return response.data;
};

export const getPvCalcRequest = async (params) => {
  const filteredParams = {};

  for (const key in params) {
    if (
      Object.prototype.hasOwnProperty.call(params, key) &&
      params[key] !== undefined
    ) {
      filteredParams[key] = params[key];
    }
  }

  const response = await api.get(`Project/Pvcalc`, {
    params: filteredParams,
  });

  return response.data;
};

export const getSeriesCalcRequest = async (params) => {
  const filteredParams = {};

  for (const key in params) {
    if (
      Object.prototype.hasOwnProperty.call(params, key) &&
      params[key] !== undefined
    ) {
      filteredParams[key] = params[key];
    }
  }

  const response = await api.get(`Project/Seriescalc`, {
    params: filteredParams,
  });

  return response.data;
};