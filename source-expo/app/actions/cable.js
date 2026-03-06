import { pagingCableRequest } from "@/apis/materialApi";


export const pagingCable = (page, pageSize, searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: 'CABLE_PAGING_REQUEST' });
    const data = await pagingCableRequest(page, pageSize, searchTerm);
    data.data.page = page;
    data.data.pageSize = pageSize;

    dispatch({ type: 'CABLE_PAGING_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'CABLE_PAGING_FAIL', payload: error.response?.data?.message || error.message });
  }
};