import { userConstants } from "../actions/constants";

const initState = {
  address: [],
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      break;
    case userConstants.GET_USER_ADDRESS_SUCCESS:
      state = {
        ...initState,
        address: action.payload.address,
        loading: false
      };
      break;
    case userConstants.GET_USER_ADDRESS_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
        loading: false
      };
      break;

    default:
      break;
  }

  return state;
};
