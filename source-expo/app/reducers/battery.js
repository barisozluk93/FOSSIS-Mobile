const initialState = {
  batteries: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function BatteryReducer(state = initialState, action) {
  switch (action.type) {

    case 'BATTERY_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'BATTERY_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        batteries: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'BATTERY_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'BATTERY_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'BATTERY_INIT':
      return initialState;

    default:
      return state;
  }
}