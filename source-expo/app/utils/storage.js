import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from "qs";


export const saveToken = async (authResponse) => {
  try {
    await AsyncStorage.setItem('authResponse', qs.stringify(authResponse));
  } catch (err) {
    console.error('Token kaydedilemedi', err);
  }
};


export const loadToken = async () => {
  try {
    var authResponseStr = await AsyncStorage.getItem('authResponse');
    var authResponse = qs.parse(authResponseStr)
    if(authResponse) {
      return authResponse.accessToken;
    }
    else{
      return undefined;
    }
  } catch (err) {
    console.error('Token okunamadı', err);
    return null;
  }
};


export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authResponse');
  } catch (err) {
    console.error('Token silinemedi', err);
  }
};

export const loadRefreshToken = async () => {
  try {
    var authResponseStr = await AsyncStorage.getItem('authResponse');
    var authResponse = qs.parse(authResponseStr)
    if(authResponse) {
      return authResponse.refreshToken;
    }
    else{
      return undefined;
    }
  } catch (err) {
    console.error('Refresh Token okunamadı', err);
    return null;
  }
};