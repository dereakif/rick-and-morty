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
import PopUpImg from "./styledComponents/PopUp/PopUpImg";
import $ from "jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const slickSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
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
const CharName = styled.div`
  position: relative;
  right: 30px;
`;
const Characters = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [favoritesList, setFavoritesList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacter(pageNumber));

    console.log(favoritesList, "useefetct");

    // resetFavBtn();
    // isFavedBtn();
  }, [pageNumber, favoritesList.length]);

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

  const resetFavBtn = () => {
    $(".fav-btn").attr("style", "");
  };
  const isFavedBtn = () => {
    favoritesList.map((item) =>
      $(`#${"charId" + item.id}`).css("background-color", "black")
    );
  };
  const handlePrevious = () => {
    pageNumber <= 1 ? setPageNumber(1) : setPageNumber(pageNumber - 1);
    //resetFavBtn();
    //isFavedBtn();
  };

  const handleNext = () => {
    pageNumber >= 34 ? setPageNumber(34) : setPageNumber(pageNumber + 1);
    //resetFavBtn();
    // isFavedBtn();
  };

  const handleFav = (obj) => {
    //selected buttons stays black!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (!favoritesList.includes(obj)) {
      console.log(obj);
      setFavoritesList([...favoritesList, obj]);
      console.log(favoritesList, "handfav ici");
    } else {
      setFavoritesList(
        favoritesList
          .map((item) => item != obj && item)
          .filter((item) => typeof item !== "boolean")
      );
      favoritesList.length == 0 && setFavoritesList([]);
    }
    /* if (!favoritesList.includes(obj)) {
      setFavoritesList([...favoritesList, obj]);
    } else {
      setFavoritesList((favoritesList) => {
        favoritesList.map((char) => char.id != obj.id && char);
      });
    } */
  };

  //favoritesList.map((item)=>)
  return (
    <div className="characters">
      <PopUp className="popUp">
        <PopUpContent>
          <PopUpHeader>
            <PopUpHeaderTitle>Favorite Characters</PopUpHeaderTitle>

            <PopUpCloseBtn className="closeBtn">&times;</PopUpCloseBtn>
          </PopUpHeader>
          <PopUpBody>
            <Slider {...slickSettings}>
              {favoritesList &&
                favoritesList.map((item) => (
                  <>
                    <PopUpImg src={item.image}></PopUpImg>
                    {item.name}
                  </>
                ))}
            </Slider>
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
              <CharName>{character.name}</CharName>
              <FavBtn
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
