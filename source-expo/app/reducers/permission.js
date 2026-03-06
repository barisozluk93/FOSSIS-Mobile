const initialState = {
  permissions: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function PermissionReducer(state = initialState, action) {
  switch (action.type) {

    case 'PERMISSION_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'PERMISSION_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        permissions: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'PERMISSION_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'PERMISSION_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'PERMISSION_INIT':
      return initialState;

    default:
      return state;
  }
}