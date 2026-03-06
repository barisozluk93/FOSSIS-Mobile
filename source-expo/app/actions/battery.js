import { pagingBatteryRequest } from "@/apis/materialApi";


export const pagingBattery = (page, pageSize, searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: 'BATTERY_PAGING_REQUEST' });
    const data = await pagingBatteryRequest(page, pageSize, searchTerm);
    data.data.page = page;
    data.data.pageSize = pageSize;

    dispatch({ type: 'BATTERY_PAGING_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'BATTERY_PAGING_FAIL', payload: error.response?.data?.message || error.message });
  }
};