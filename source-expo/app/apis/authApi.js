import authApi from './axiosClient';

export const loginRequest = async (username, password) => {
  try{
    const response = await authApi.post("Auth/Login", 
                        {
                          username: username,
                          password: password
                        });
    return response.data;
  }catch(error) {
console.log("ERROR MESSAGE:", error.message);
  console.log("ERROR CODE:", error.code);
  console.log("ERROR CONFIG:", error.config);

  if (error.response) {
    console.log("STATUS:", error.response.status);
    console.log("DATA:", error.response.data);
    console.log("HEADERS:", error.response.headers);
  } else if (error.request) {
    console.log("REQUEST:", error.request);
  }

  console.log("FULL ERROR:", JSON.stringify(error, null, 2));
    throw error;  }
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