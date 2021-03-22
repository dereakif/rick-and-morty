const initialState = {
  data: [],
  isLoading: false,
};
export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CHARACTER_REQUEST":
      return { ...state, isLoading: true };
      break;
    case "GET_CHARACTER_SUCCESS":
      return { ...state, data: action.payload.results, isLoading: false };
      break;
    case "GET_CHARACTER_ERROR":
      return { ...state, error: action.payload, isLoading: false };
      break;
    default:
      return state;
      break;
  }
};
