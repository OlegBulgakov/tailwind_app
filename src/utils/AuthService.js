import {api} from './API';
import {addTokenToLocalStorage, getTokenFromLocalStorage, removeTokenFromLocalStorage} from "./LocalStorageService";
import {checkAuth, isAliveToken} from "./InterceptorService";
import {customHistory} from "../index";

export const register = (name, email, password, addToast) =>
  api.post('/auth/register', {name, email, password})
    .then(({data}) => {
      const {name} = data.user
      addToast(
        `User ${name} registered successfully`,
        {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 3000
        }
      );
      customHistory.push('/auth/login')
    })
    .catch(err => {
      addToast(
        err.response.data.message,
        {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 3000
        }
      );
      console.error(err)
    })

export const login = (email, password, addToast) =>
  api.post('/auth/login', {email, password})
    .then(({data}) => {
      const userData = data.user;
      const tokenPair = data.tokens;
      addTokenToLocalStorage(tokenPair)
      customHistory.push('/admin')
      return userData
    })
    .catch(err => {
      addToast(
        err.response.data.message,
        {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 3000
        }
      );
      console.error(err)
    })

export const refreshToken = (refreshToken) =>
  api.post('/auth/refresh-tokens', {refreshToken})
    .then(({data}) => {
      addTokenToLocalStorage(data)
      return true
    })
    .catch(err => {
      console.error(err)
    })

export const logout = () => {
  const tokens = getTokenFromLocalStorage()
  api.post('/auth/logout', {refreshToken: tokens.rToken})
    .then(() => {
      removeTokenFromLocalStorage()
      customHistory.push('/auth/login')
    })
    .catch(err => {
      console.error(err)
    })
}

export const isAuthUser = async () => {
  const tokens = getTokenFromLocalStorage()
  if (isAliveToken(tokens.aToken)) {
    return true
  } else {
    return await refreshToken(tokens.rToken)
  }
}
