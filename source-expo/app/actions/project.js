import { pagingProjectRequest } from "@/apis/projectApi";


export const pagingProject = (page, pageSize, searchTerm, userId, isAdmin) => async (dispatch) => {
  try {
    dispatch({ type: 'PROJECT_PAGING_REQUEST' });
    const data = await pagingProjectRequest(page, pageSize, searchTerm, userId, isAdmin);
    data.data.page = page;
    data.data.pageSize = pageSize;

    dispatch({ type: 'PROJECT_PAGING_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'PROJECT_PAGING_FAIL', payload: error.response?.data?.message || error.message });
  }
};