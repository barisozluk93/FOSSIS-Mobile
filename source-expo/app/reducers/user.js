const initialState = {
  user: null,
  users: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function UserReducer(state = initialState, action) {
  switch (action.type) {

    case 'USER_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'USER_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'USER_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'USER_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'USER_GET_REQUEST':
      return { ...state, loading: true, error: null };


    case 'USER_GET_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case 'USER_GET_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'USER_LIST_INIT':
      return {
        ...state,
        users: null,
        searchTerm: null,
        page: null,
        pageSize: null,
        totalPages: null,
        totalCounts: null,
        loading: false,
        error: null
      };

    case 'USER_INIT':
      return initialState;

    default:
      return state;
  }
}