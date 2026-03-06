const initialState = {
  panels: null,
  searchTerm: null,
  page: null,
  pageSize: null,
  totalPages: null,
  totalCounts: null,
  loading: false,
  error: null,
};


export default function PanelReducer(state = initialState, action) {
  switch (action.type) {

    case 'PANEL_PAGING_REQUEST':
      return { ...state, loading: true, error: null };


    case 'PANEL_PAGING_SUCCESS':
      return {
        ...state,
        loading: false,
        panels: action.payload.data.items,
        page: action.payload.data.page,
        pageSize: action.payload.data.pageSize,
        totalCounts: action.payload.data.totalCount,
        totalPages: action.payload.data.totalPages,
      };

    case 'PANEL_PAGING_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    case 'PANEL_SET_FILTER':
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };

    case 'PANEL_INIT':
      return initialState;

    default:
      return state;
  }
}