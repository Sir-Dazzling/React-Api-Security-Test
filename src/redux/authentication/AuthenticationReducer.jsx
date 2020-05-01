import { userConstants } from '../user/UserTypes';
import {authConstants} from '../authentication/AuthenticationTypes';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) 
{
  switch (action.type) 
  {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case authConstants.GET_CURRENT_USER:
      return {
        user: action.user
      };
    default:
      return state
  }
}