const initialState = {
  chargingstations: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function ChargingstationReducer(state = initialState, action) {
  switch (action.type) {

    case 'CHARGINGSTATION_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'CHARGINGSTATION_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        chargingstations: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'CHARGINGSTATION_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'CHARGINGSTATION_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'CHARGINGSTATION_INIT':
      return initialState;

    default:
      return state;
  }
}