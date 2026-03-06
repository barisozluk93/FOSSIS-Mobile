const initialState = {
  token: null,
  loading: false,
  error: null,
  initialized: false,
  isPaymentRequired: false
};


export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_INIT':
      return { ...state, initialized: true, token: action.payload };


    case 'AUTH_LOGIN_REQUEST':
      return { ...state, loading: true, error: null };


    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        token: action.payload.accessToken,
        isPaymentRequired: action.payload.isPaymentRequired
      };


    case 'AUTH_LOGIN_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'AUTH_REFRESH_TOKEN_REQUEST':
      return {
        ...state, loading: false, token: action.payload.access_token,
      };

    case 'AUTH_LOGOUT':
      return initialState;

    default:
      return state;
  }
}