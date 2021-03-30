import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCharacter } from "../../../store/actions/action";
import { Link } from "react-router-dom";
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
import Modal from "react-modal";
const customStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto%",
    bottom: "auto",
    padding: "0 3vw ",
    marginRight: "-50%",
    border: "none",
    backgroundColor: "transparent",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const Characters = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [favoritesList, setFavoritesList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacter(pageNumber));
  }, [pageNumber, dispatch]);
  const characters = useSelector((state) => state.characterReducer.data);

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
      setFavoritesList([...favoritesList, obj]);
    } else {
      setFavoritesList(
        favoritesList
          .map((item) => item.id !== obj.id && item)
          .filter((item) => typeof item !== "boolean")
      );
      favoritesList.length === 0 && setFavoritesList([]);
    }
  };
  const handleReset = () => {
    setFavoritesList([]);
  };
  const isInit = (character) => {
    let result = favoritesList.some((item) => item.id === character.id);
    return result;
  };
  //modal
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <PopUpContainer
          favoritesList={favoritesList}
          setFavoritesList={setFavoritesList}
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
        ></PopUpContainer>
      </Modal>
      <ButtonContainer>
        <PageButton onClick={handlePrevious}>
          <FontAwesomeIcon icon={faChevronLeft} /> Previous page
        </PageButton>
        <MyFavList onClick={openModal}>
          My Fav List{" "}
          <FontAwesomeIcon
            color={favoritesList.length > 0 ? "#e84545" : "#903749"}
            style={{ transition: "all 0.5s ease" }}
            icon={faHeart}
            className="fav-btn"
          />
        </MyFavList>
        <MyFavList onClick={handleReset}>Reset</MyFavList>
        <PageButton
          style={{
            color: "white",
            backgroundColor: "#53354a",
            border: "none",
          }}
        >
          Page: {pageNumber} / 34
        </PageButton>
        <PageButton onClick={handleNext}>
          Next page <FontAwesomeIcon icon={faChevronRight} />
        </PageButton>
      </ButtonContainer>

      <CardContainer>
        {characters.length > 0 &&
          characters.map((character, i) => (
            <Card key={i} className="char-card">
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
                  color={isInit(character) ? "#e84545" : "#f9f3f3"}
                  style={{ transition: "all 0.5s ease" }}
                  icon={faHeart}
                  className="fav-btn"
                  onClick={() => handleFav(character)}
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
