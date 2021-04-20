export const addTokenToLocalStorage = (tokens) => {
  const tokenPair = {
    aToken: tokens.access.token,
    rToken: tokens.refresh.token
  }
  localStorage.setItem('tokenPair', JSON.stringify(tokenPair))
}

export const getTokenFromLocalStorage = () => {
  const tokenPair = localStorage.getItem('tokenPair')
  if (tokenPair) {
    const {aToken, rToken} = JSON.parse(tokenPair);
    return {aToken, rToken}
  }
  return null
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('tokenPair');
}