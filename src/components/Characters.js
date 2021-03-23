import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCharacter } from "../store/actions/action";
import { Link, useHistory } from "react-router-dom";
import PopUp from "./styledComponents/PopUp/PopUp";
import PopUpContent from "./styledComponents/PopUp/PopUpContent";
import PopUpHeader from "./styledComponents/PopUp/PopUpHeader";
import PopUpCloseBtn from "./styledComponents/PopUp/PopUpCloseBtn";
import PopUpHeaderTitle from "./styledComponents/PopUp/PopUpHeaderTitle";
import PopUpBody from "./styledComponents/PopUp/PopUpBody";
import $ from "jquery";
import styled from "styled-components";

const Main = styled.div`
  margin: 20px auto 50px auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const FavBtn = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
  position: relative;

  right: 30px;
  cursor: pointer;
  border-radius: 1rem;
`;
const SeeFavBtn = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const CharImg = styled.img`
  border-radius: 1rem;
  height: 200px;
  width: auto;
`;
const Characters = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [favoritesList, setFavoritesList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacter(pageNumber));
  }, [pageNumber]);

  const characters = useSelector((state) => state.characterReducer.data);

  const closePopUp = () => {
    $(".popUp").css("display", "none");
    $(".fav-btn").css("z-index", "1");
  };
  $(".popUp").click((event) => {
    $.inArray("popUp", event.target.classList) > -1 && closePopUp();
  });

  $(".closeBtn").click(() => closePopUp());

  const handlePopUp = () => {
    $(".popUp").css("display", "unset");
    $(".fav-btn").css("z-index", "-1");
  };

  const handlePrevious = () => {
    pageNumber <= 1 ? setPageNumber(1) : setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    pageNumber >= 34 ? setPageNumber(34) : setPageNumber(pageNumber + 1);
  };

  const handleFav = (obj) => {
    //selected buttons stays black!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (!favoritesList.includes(obj)) {
      setFavoritesList([...favoritesList, obj]);
      $(`#${"charId" + obj.id}`).css("background-color", "black");
    } else {
      setFavoritesList(favoritesList.map((char) => char.id != obj.id && char));
      $(`#${"charId" + obj.id}`).css("background-color", "red");
    }
    console.log(obj);
  };

  return (
    <div className="characters">
      <PopUp className="popUp">
        <PopUpContent>
          <PopUpHeader>
            <PopUpHeaderTitle>Favorite Characters</PopUpHeaderTitle>

            <PopUpCloseBtn className="closeBtn">&times;</PopUpCloseBtn>
          </PopUpHeader>
          <PopUpBody>
            <ul>
              {favoritesList && favoritesList.map((item) => <p>{item.name}</p>)}
            </ul>
          </PopUpBody>
        </PopUpContent>
      </PopUp>
      <button onClick={handlePrevious}>Go Previous page</button>
      <SeeFavBtn onClick={handlePopUp}>fav list</SeeFavBtn>
      <button onClick={handleNext}>Go next page</button>
      <Main>
        {characters.length > 0 &&
          characters.map((character, i) => (
            <>
              <Link to={{ pathname: "/characterdetails", state: character }}>
                <CharImg
                  key={i}
                  src={character && character.image}
                  alt="character-img"
                ></CharImg>
              </Link>
              <FavBtn
                id={"charId" + character.id}
                className="fav-btn"
                onClick={() => handleFav(character)}
              ></FavBtn>
            </>
          ))}
      </Main>
    </div>
  );
};
export default Characters;
