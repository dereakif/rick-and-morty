const initialState = {
  data: [],
  isLoading: false,
};
export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOCATION_REQUEST":
      return { ...state, isLoading: true };
    case "GET_LOCATION_SUCCESS":
      return { ...state, data: action.payload.results, isLoading: false };
    case "GET_LOCATION_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
