const initialState = {
  constructions: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function ConstructionReducer(state = initialState, action) {
  switch (action.type) {

    case 'CONSTRUCTION_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'CONSTRUCTION_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        constructions: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'CONSTRUCTION_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'CONSTRUCTION_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'CONSTRUCTION_INIT':
      return initialState;

    default:
      return state;
  }
}