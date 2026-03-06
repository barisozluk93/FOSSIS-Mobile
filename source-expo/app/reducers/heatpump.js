const initialState = {
  heatpumps: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function HeatpumpReducer(state = initialState, action) {
  switch (action.type) {

    case 'HEATPUMP_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'HEATPUMP_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        heatpumps: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'HEATPUMP_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'HEATPUMP_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'HEATPUMP_INIT':
      return initialState;

    default:
      return state;
  }
}