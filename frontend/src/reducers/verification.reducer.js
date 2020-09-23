import { verificationConstants } from '../constants';

export function verifications(state = {}, action) {
  switch (action.type) {

    case verificationConstants.GET_ALL_VERIFICATION_REQUEST:
      return { ...state, loading: true };
    case verificationConstants.GET_ALL_VERIFICATION_SUCCESS:
      return { ...state, verifications: action.verifications, loading: false };
    case verificationConstants.GET_ALL_VERIFICATION_FAILURE:
      return { ...state, error: action.error, loading: false };

    case verificationConstants.ADD_VERIFICATION_REQUEST:
      return { ...state,  loading: true };
    case verificationConstants.ADD_VERIFICATION_SUCCESS:
      return { ...state,  loading: false };
    case verificationConstants.ADD_VERIFICATION_FAILURE:
      return { ...state, error: action.error, loading: false };
      case verificationConstants.GET_BY_ID_REQUEST:
        return { ...state, selected_verification: null, loading: true };
      case verificationConstants.GET_BY_ID_SUCCESS:
        console.log('logging actionver:',action.Verification)
        return { ...state, selected_verification: action.Verification, loading: false };
      case verificationConstants.GET_BY_ID_FAILURE:
        return { ...state, error: action.error, loading: false };

        case verificationConstants.DELETE_VERIFICATION_REQUEST:
          return { ...state, loading: true };
        case verificationConstants.DELETE_VERIFICATION_SUCCESS:
          console.log("del users",action.id)
      const verification= state&&state.verifications.filter(verify=>{
           return verify._id!==action.id            
           })
           return { ...state,verifications:verification, loading: false };
        case verificationConstants.DELETE_VERIFICATION_FAILURE:
          return { ...state, loading: false };

    default:
     return state;
  }
}