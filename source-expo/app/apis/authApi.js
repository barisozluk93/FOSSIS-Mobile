import authApi from './axiosClient';

export const loginRequest = async (username, password) => {
  const response = await authApi.post("Auth/Login",
    {
      username: username,
      password: password
    });
  return response.data;
};

export const refreshTokenRequest = async (accessToken, refreshToken) => {
  const response = await authApi.post("Auth/RefreshToken",
    {
      accessToken: accessToken,
      refreshToken: refreshToken
    });

  return response.data;
};

export const changePasswordRequest = async (id, currentPassword, newPassword) => {
  const response = await authApi.post("Auth/ChangePassword",
    {
      id: id,
      currentPassword: currentPassword,
      password: newPassword
    });

  return response.data;
};

export const resetPasswordRequest = async (email) => {
  const response = await authApi.post("Auth/ForgotPassword",
    {
      email: email
    });

  return response.data;
};

export const registerRequest = async (user) => {
  const response = await authApi.post("Auth/Register", user);

  return response.data;
};