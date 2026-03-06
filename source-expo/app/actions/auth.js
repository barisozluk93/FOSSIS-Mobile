import { loginRequest } from '@/apis/authApi';
import { getById } from '@/apis/userApi';
import { saveToken, removeToken, loadToken } from '@/utils/storage';

export const login = (username, password) => async (dispatch) => {
  try {

    dispatch({ type: 'AUTH_LOGIN_REQUEST' });
    const response = await loginRequest(username, password);
    await saveToken(response.data);


    dispatch({ type: 'AUTH_LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'AUTH_LOGIN_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const logout = () => async (dispatch) => {
  await removeToken();
  dispatch({ type: 'AUTH_LOGOUT' });
};

export const getUserByToken = () => async (dispatch) => {
  try {
    dispatch({ type: 'USER_GET_REQUEST' });
    var accessToken = await loadToken();

    const user = JSON.parse(atob(accessToken.split('.')[1]));
    const response = await getById(user.id)

    dispatch({ type: 'USER_GET_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'USER_GET_FAIL', payload: error.response?.data?.message || error.message });
  }
}

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_GET_REQUEST' });
    const response = await getById(id)

    dispatch({ type: 'USER_GET_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'USER_GET_FAIL', payload: error.response?.data?.message || error.message });
  }
}