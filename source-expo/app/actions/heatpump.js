import { pagingHeatpumpRequest } from "@/apis/materialApi";


export const pagingHeatpump = (page, pageSize, searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: 'HEATPUMP_PAGING_REQUEST' });
    const data = await pagingHeatpumpRequest(page, pageSize, searchTerm);
    data.data.page = page;
    data.data.pageSize = pageSize;

    dispatch({ type: 'HEATPUMP_PAGING_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'HEATPUMP_PAGING_FAIL', payload: error.response?.data?.message || error.message });
  }
};