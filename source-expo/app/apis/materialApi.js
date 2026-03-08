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


export const allPanelsRequest = async () => {
    const response = await authApi.get("Panel/All");

    return response.data;
};