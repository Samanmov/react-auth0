import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid profile'
});

export const login = () => {
  auth.authorize();
}

export const handleAuthentication = () => {
  auth.parseHash((error, authResult) => {
    if (error) {
      console.log(error);
      console.log(`Error ${error.error} Occured`);
      return;
    }

    setSession(authResult);
  })
}

export const setSession = authResult => {
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  return accessToken;
}

export const getProfile = cb => {
  let accessToken = getAccessToken();
  auth.client.userInfo(accessToken, (error, data) => {
    if(error) {
      console.log('Error Occured', error);
      return;
    }

    const profile = {
      ...data,
      role: data[AUTH_CONFIG.roleUrl]
    }

    cb(profile)
  });
}

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
}

export const isAuthenticated = () => {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
}
