import { pagingUserRequest } from "@/apis/userApi";


export const pagingUser = (page, pageSize, searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_PAGING_REQUEST' });
    const data = await pagingUserRequest(page, pageSize, searchTerm);
    data.data.page = page;
    data.data.pageSize = pageSize;

    dispatch({ type: 'USER_PAGING_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'USER_PAGING_FAIL', payload: error.response?.data?.message || error.message });
  }
};