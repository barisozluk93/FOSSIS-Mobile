const initialState = {
  projects: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function ProjectReducer(state = initialState, action) {
  switch (action.type) {

    case 'PROJECT_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'PROJECT_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        projects: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'PROJECT_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'PROJECT_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'PROJECT_INIT':
      return initialState;

    default:
      return state;
  }
}