import { LOGOUT, SIGN_IN } from "../types/authTypes";
import Cookies from "js-cookie";
const initialState = {
  token: Cookies.get('token'),
  user: null,
  isAuth: !!Cookies.get('token'),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
  const isSeller = action.user.role === 'seller'; 
  return {
    ...state,
    user: isSeller ? { ...action.user, isSeller } : action.user,
    token: action.token,
    isAuth: !!action.token
  }

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuth: false
      }
    default:
      return state
  }
}

export default reducer;
