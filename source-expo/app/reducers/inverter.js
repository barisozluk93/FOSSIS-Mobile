const initialState = {
  inverters: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function InverterReducer(state = initialState, action) {
  switch (action.type) {

    case 'INVERTER_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'INVERTER_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        inverters: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'INVERTER_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'INVERTER_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'INVERTER_INIT':
      return initialState;

    default:
      return state;
  }
}