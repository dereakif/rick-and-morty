const initialState = {
  data: [],
  isLoading: true,
};
export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CHARACTER_REQUEST":
      return { ...state, isLoading: true };
    case "GET_CHARACTER_SUCCESS":
      return { ...state, data: action.payload.results, isLoading: false };
    case "GET_CHARACTER_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
