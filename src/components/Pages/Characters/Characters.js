import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCharacter } from "../../../store/actions/action";
import { Link, useHistory } from "react-router-dom";
import PopUpContainer from "./PopUpContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faChevronLeft,
  faChevronRight,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import $, { event } from "jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const slickSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3500,
  cssEase: "linear",
};
const Main = styled.div`
  margin: auto;
  padding:0 100px
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const FavBtn = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  bottom: 278px;
  left: 270px;
  cursor: pointer;
`;
const SeeFavBtn = styled.div`
  border: 2px solid white;
  border-radius: 1rem;
  padding: 2px 10px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  :hover {
    color: black;
    background-color: white;
  }
`;
const CharImg = styled.img`
  border-radius: 1rem;
  height: auto;
  width: max-content;
  margin: 10px;
`;
const CharName = styled.div`
  position: absolute;
  text-align: center;
  border-radius: 1rem;
  color: white;
  line-height: 1.6;
  font-size: 24px;
  bottom: 0px;
  width: 100%;
   {
    background-image: linear-gradient(
      to right,
      #3ca55c 0%,
      #b5ac49 51%,
      #3ca55c 100%
    );
  }

  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;

  border-radius: 10px;
  display: block;
  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;
const Card = styled.div`
  position: relative;
  margin: 10px;
  transition: all 0.3s ease;
  :hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
`;
const SliderCard = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const PageButton = styled.button`
  background-color: transparent;
  outline: none;
  color: white;
  border: 2px solid white;
  border-radius: 1rem;
  font-size: 1.5rem;
  line-height: 1.6;
  :hover {
    color: black;
    background-color: white;
  }
`;
const Characters = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [favoritesList, setFavoritesList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacter(pageNumber));

    console.log(favoritesList, "useefetct");

    // resetFavBtn();
    // isFavedBtn();
  }, [pageNumber, favoritesList.length]);

  const characters = useSelector((state) => state.characterReducer.data);

  const resetFavBtn = () => {
    $(".fav-btn").attr("style", "");
  };
  const isFavedBtn = () => {
    favoritesList.map((item) =>
      $(`#${"charId" + item.id}`).css("background-color", "black")
    );
  };
  $(function () {
    $(".fav-btn").hover(
      function () {
        $(this).css("color", "#fa1e0e");
      },
      function () {
        $(this).css("color", "#e40017");
      }
    );
  });
  $(".fav-btn").click(function () {
    $(this).css("color", "#72A917");
  });
  const handlePopUp = () => {
    $(".popUp").css("display", "unset");
    $(".fav-btn").css("z-index", "-1");
    $(".char-card").css("z-index", "-1");
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
  //scroll top btn
  const ScrollToTop = styled.div`
    cursor: pointer;
    width: 50px;
    height: 50px;
    float: right;
    margin: 30px 50px;
    background-color: transparent;
    outline: none;
    color: white;

    font-size: 1.5rem;
    line-height: 1.6;
    :hover {
      color: black;
    }
  `;
  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleFav = (obj) => {
    if (!favoritesList.some((item) => item.id === obj.id)) {
      console.log(obj);
      setFavoritesList([...favoritesList, obj]);
      console.log(favoritesList, "handfav ici");
    } else {
      setFavoritesList(
        favoritesList
          .map((item) => item.id !== obj.id && item)
          .filter((item) => typeof item !== "boolean")
      );
      favoritesList.length === 0 && setFavoritesList([]);
    }
  };

  return (
    <div className="characters">
      <PopUpContainer
        favoritesList={favoritesList}
        setFavoritesList={setFavoritesList}
      ></PopUpContainer>
      <ButtonContainer>
        <PageButton onClick={handlePrevious}>
          <FontAwesomeIcon icon={faChevronLeft} /> Previous page
        </PageButton>
        <SeeFavBtn onClick={handlePopUp}>My Fav List</SeeFavBtn>
        <PageButton onClick={handleNext}>
          Next page <FontAwesomeIcon icon={faChevronRight} />
        </PageButton>
      </ButtonContainer>
      <Main>
        {characters.length > 0 &&
          characters.map((character, i) => (
            <Card className="char-card">
              <Link
                className="char-name"
                to={{ pathname: "/characterdetails", state: character }}
              >
                <CharImg
                  key={i}
                  src={character && character.image}
                  alt="character-img"
                ></CharImg>
              </Link>
              <CharName className="quick-view">{character.name}</CharName>
              <FavBtn>
                <FontAwesomeIcon
                  color="#fa1e0e"
                  size="2x"
                  icon={faHeart}
                  className="fav-btn"
                  onClick={() => handleFav(character, event)}
                />
              </FavBtn>
              {/* <FavBtn
                className="fav-btn"
                onClick={() => handleFav(character, event)}
              ></FavBtn> */}
            </Card>
          ))}
      </Main>
      <ScrollToTop onClick={scrollToTop}>
        <FontAwesomeIcon icon={faChevronCircleUp} size="2x"></FontAwesomeIcon>
      </ScrollToTop>
    </div>
  );
};
export default Characters;
