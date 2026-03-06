import { pagingConstructionRequest } from "@/apis/materialApi";


export const pagingConstruction = (page, pageSize, searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: 'CONSTRUCTION_PAGING_REQUEST' });
    const data = await pagingConstructionRequest(page, pageSize, searchTerm);
    data.data.page = page;
    data.data.pageSize = pageSize;

    dispatch({ type: 'CONSTRUCTION_PAGING_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'CONSTRUCTION_PAGING_FAIL', payload: error.response?.data?.message || error.message });
  }
};