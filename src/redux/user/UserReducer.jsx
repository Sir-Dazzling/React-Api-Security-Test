import { userConstants } from '../user/UserTypes';

export function users(state = {}, action) 
{
  switch (action.type) 
  {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        data: action.data
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.GETCONTENTMANAGER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETCONTENTMANAGER_SUCCESS:
      return{
        data: action.data
      }
    case userConstants.GETCONTENTMANAGER_FAILURE:
      return{
        error: action.error
      } 
    default:
      return state
  }
}