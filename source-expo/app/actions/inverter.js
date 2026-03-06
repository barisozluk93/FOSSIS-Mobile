import { pagingInverterRequest } from "@/apis/materialApi";


export const pagingInverter = (page, pageSize, searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: 'INVERTER_PAGING_REQUEST' });
    const data = await pagingInverterRequest(page, pageSize, searchTerm);
    data.data.page = page;
    data.data.pageSize = pageSize;

    dispatch({ type: 'INVERTER_PAGING_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'INVERTER_PAGING_FAIL', payload: error.response?.data?.message || error.message });
  }
};