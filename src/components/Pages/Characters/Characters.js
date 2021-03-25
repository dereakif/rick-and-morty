import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCharacter } from "../../../store/actions/action";
import { Link, useHistory } from "react-router-dom";
import PopUpContainer from "./PopUpContainer";
import ScrollToTop from "../../styledComponents/Characters/Buttons/ScrollToTop";
import CardContainer from "../../styledComponents/Characters/Card/CardContainer";
import FavBtn from "../../styledComponents/Characters/Buttons/FavBtn";
import MyFavList from "../../styledComponents/Characters/Buttons/MyFavList";
import CharImg from "../../styledComponents/Characters/Card/CharImg";
import CharName from "../../styledComponents/Characters/Card/CharName";
import Card from "../../styledComponents/Characters/Card/Card";
import ButtonContainer from "../../styledComponents/Characters/Buttons/ButtonContainer";
import PageButton from "../../styledComponents/Characters/Buttons/PageButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faChevronLeft,
  faChevronRight,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import $, { event } from "jquery";

const Characters = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [favoritesList, setFavoritesList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCharacter(pageNumber));
    console.log(favoritesList, "useefetct");
  }, [pageNumber, favoritesList.length]);

  const characters = useSelector((state) => state.characterReducer.data);

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
  };

  const handleNext = () => {
    pageNumber >= 34 ? setPageNumber(34) : setPageNumber(pageNumber + 1);
  };

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
    <>
      <PopUpContainer
        favoritesList={favoritesList}
        setFavoritesList={setFavoritesList}
      ></PopUpContainer>
      <ButtonContainer>
        <PageButton onClick={handlePrevious}>
          <FontAwesomeIcon icon={faChevronLeft} /> Previous page
        </PageButton>
        <MyFavList onClick={handlePopUp}>My Fav List</MyFavList>
        <PageButton onClick={handleNext}>
          Next page <FontAwesomeIcon icon={faChevronRight} />
        </PageButton>
      </ButtonContainer>
      <CardContainer>
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
            </Card>
          ))}
      </CardContainer>
      <ScrollToTop onClick={scrollToTop}>
        <FontAwesomeIcon icon={faChevronCircleUp} size="2x"></FontAwesomeIcon>
      </ScrollToTop>
    </>
  );
};
export default Characters;
