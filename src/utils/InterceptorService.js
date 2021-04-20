import {addTokenToLocalStorage, getTokenFromLocalStorage} from "./LocalStorageService";
import {refreshToken} from "./AuthService";
import {customHistory} from "../index";

export const checkAuth = () => {
  const tokens = getTokenFromLocalStorage()
  if (tokens && tokens.rToken && isAliveToken(tokens.rToken)) {
    refreshToken(tokens.rToken)
      .then(({data}) => {
        const tokenPair = {
          aToken: data.access,
          rToken: data.refresh
        }
        addTokenToLocalStorage(tokenPair)
      })
      .catch(err => {
        customHistory.push('/auth');
        console.error(err)
      })
  } else {
    customHistory.push('/auth');
  }
}

export const isAliveToken = (token) => {
  const {exp} = JSON.parse(atob(token.split('.')[1]))
  const localUnixTime = Math.round(new Date().getTime() / 1000)
  return exp > localUnixTime
}