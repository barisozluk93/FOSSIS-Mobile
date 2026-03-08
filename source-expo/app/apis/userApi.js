import authApi from './axiosClient';

export const pagingUserRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("User/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const pagingRoleRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("Role/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const pagingPermissionRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("Permission/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const getById = async (userId) => {
  const response = await authApi.get(`User/${userId}`);

  return response.data;
};


export const profileEdit = async (id, email, fileId, name, surname, username, phone, country, city, district, address, roles, password) => {
  const response = await authApi.post("User/UserProfileEdit", {
    id: id,
    fileId: fileId,
    email: email,
    name: name,
    surname: surname,
    username: username,
    phone: phone,
    country: country,
    city: city,
    district: district,
    address: address,
    roles: roles,
    password: password
  });

  return response.data;
}