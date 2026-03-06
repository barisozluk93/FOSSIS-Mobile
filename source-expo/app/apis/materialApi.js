import authApi from './axiosClient';

export const pagingPanelRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("Panel/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const pagingInverterRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("Inverter/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const pagingBatteryRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("Battery/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const pagingHeatpumpRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("HeatPump/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const pagingConstructionRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("Construction/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const pagingCableRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("Cable/Paginate", {
      params: {
        PageNumber: page,
        PageSize: pageSize,
        FilterText: searchTerm ? searchTerm : '',
      },
    });

    return response.data;
};

export const pagingChargingstationRequest = async (page, pageSize, searchTerm) => {
    const response = await authApi.get("ChargingStation/Paginate", {
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


export const getUserAddressesRequest = async (userId) => {
  const response = await authApi.get(`User/UserAddressList/${userId}`);

  return response.data;
};

export const saveUserAddressRequest = async (data) => {
  const response = await authApi.post(`User/UserAddressSave`, data);

  return response.data;
};


export const updateUserAddressRequest = async (data) => {
  const response = await authApi.post(`User/UserAddressUpdate`, data);

  return response.data;
};

export const deleteUserAddressRequest = async (id) => {
  const response = await authApi.delete(`User/UserAddressDelete/${id}`);

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

export const addGiftRequest = async (fullname, cardNo, expiryDate, cvv, userId, senderEmail, receiverEmail, message, planId, price) => {
  let data = {
    receiverEmail: receiverEmail,
    senderEmail: senderEmail,
    fullname: fullname,
    cardNo: cardNo,
    expiryDate: expiryDate,
    message: message,
    cvv: cvv,
    userId: userId,
    planId: planId,
    price: price
  }

  console.log(data.price)

  const response = await authApi.post(`User/BuyGiftPackage`, data);

  return response.data;
};

export const buyPackageRequest = async (userId, planId, memoryId) => {
  const response = await authApi.get(`User/BuyPackage/${userId}/${planId}/${memoryId}`);

  return response.data;
};

export const payRequest = async (userId) => {
  const response = await authApi.get(`User/Pay/${userId}`);

  return response.data;
};

export const voucherControlRequest = async (voucher) => {
  const response = await authApi.get(`User/VoucherControl/${voucher}`);

  return response.data;
}