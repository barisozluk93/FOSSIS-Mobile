const initialState = {
  cables: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function CableReducer(state = initialState, action) {
  switch (action.type) {

    case 'CABLE_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'CABLE_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        cables: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'CABLE_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'CABLE_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'CABLE_INIT':
      return initialState;

    default:
      return state;
  }
}