export const getCharacter = (pageNumber) => {
  return (dispatch) => {
    dispatch({ type: "GET_CHARACTER_REQUEST" });
    fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "GET_CHARACTER_SUCCESS", payload: data })
      )
      .catch((error) =>
        dispatch({ type: "GET_CHARACTER_ERROR", payload: error })
      );
  };
};
