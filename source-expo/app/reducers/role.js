const initialState = {
  roles: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function RoleReducer(state = initialState, action) {
  switch (action.type) {

    case 'ROLE_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'ROLE_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        roles: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'ROLE_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'ROLE_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'ROLE_INIT':
      return initialState;

    default:
      return state;
  }
}