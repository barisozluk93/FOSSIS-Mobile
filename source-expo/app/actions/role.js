import { pagingRoleRequest } from "@/apis/userApi";


export const pagingRole = (page, pageSize, searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: 'ROLE_PAGING_REQUEST' });
    const data = await pagingRoleRequest(page, pageSize, searchTerm);
    data.data.page = page;
    data.data.pageSize = pageSize;
    dispatch({ type: 'ROLE_PAGING_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'ROLE_PAGING_FAIL', payload: error.response?.data?.message || error.message });
  }
};