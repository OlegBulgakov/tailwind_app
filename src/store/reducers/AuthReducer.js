function auth(state = {}, action) {
  switch (action.type) {
    case 'userData':
      return { ...state, value: action.payload.data }
    case 'deleteUserData':
      return { ...state, value: {} }
    default:
      return state
  }
}

export default auth;