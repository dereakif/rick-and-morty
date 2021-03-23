import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCharacter } from "../store/actions/action";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  margin: 20px auto 50px auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Characters = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacter(pageNumber));
  }, [pageNumber]);
  const characters = useSelector((state) => state.characterReducer.data);
  const isLoading = useSelector((state) => state.characterReducer.isLoading);
  //console.log(characters, isLoading);
  const handleClick = (url) => {};
  const handlePrevious = () => {
    pageNumber <= 1 ? setPageNumber(1) : setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    pageNumber >= 34 ? setPageNumber(34) : setPageNumber(pageNumber + 1);
  };
  return (
    <div>
      <button onClick={handlePrevious}>Go Previous page</button>
      <button onClick={handleNext}>Go next page</button>
      <Main>
        {characters.length > 0 &&
          characters.map((character, i) => (
            <>
              <Link to={{ pathname: "/characterdetails", state: character }}>
                <img
                  key={i}
                  src={character && character.image}
                  alt="character-img"
                ></img>
              </Link>
            </>
          ))}
      </Main>
    </div>
  );
};
export default Characters;
