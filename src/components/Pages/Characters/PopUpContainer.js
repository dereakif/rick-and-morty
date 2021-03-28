import PopUpContent from "../../styledComponents/PopUp/PopUpContent";
import PopUpHeader from "../../styledComponents/PopUp/PopUpHeader";
import PopUpHeaderTitle from "../../styledComponents/PopUp/PopUpHeaderTitle";
import PopUpCloseBtn from "../../styledComponents/PopUp/PopUpCloseBtn";
import PopUpBody from "../../styledComponents/PopUp/PopUpBody";
import PopUpImg from "../../styledComponents/PopUp/PopUpImg";
import PopUpCharInfo from "../../styledComponents/PopUp/PopUpCharInfo";
import PopUpInfoRow from "../../styledComponents/PopUp/PopUpInfoRow";
import PopUpRemove from "../../styledComponents/Characters/Buttons/PopUpRemove";
import $ from "jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopUp from "../../styledComponents/PopUp/PopUp";
import ButtonContainer from "../../styledComponents/Characters/Buttons/ButtonContainer";

const PopUpContainer = ({
  favoritesList,
  setFavoritesList,
  modalIsOpen,
  setIsOpen,
}) => {
  const slickSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3500,
    fade: true,
    cssEase: "linear",
  };

  const handleReset = () => {
    setFavoritesList([]);
  };
  const handleRemove = (charId) => {
    setFavoritesList(
      favoritesList.map((item) => item.id !== charId && item).filter(Boolean)
    );
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <PopUpContent>
        <PopUpHeader>
          <PopUpHeaderTitle>My Favorite Characters</PopUpHeaderTitle>
          <PopUpHeaderTitle>Total: {favoritesList.length}</PopUpHeaderTitle>
          <PopUpCloseBtn onClick={closeModal}>&times;</PopUpCloseBtn>
        </PopUpHeader>
        <PopUpBody>
          <Slider {...slickSettings}>
            {favoritesList &&
              favoritesList.map((item) => (
                <div>
                  <PopUpImg src={item.image} />
                  <PopUpCharInfo>
                    <>
                      <PopUpInfoRow
                        style={{ fontWeight: "700", fontSize: "1vw" }}
                      >
                        {item.name}
                      </PopUpInfoRow>
                      <PopUpInfoRow style={{ fontSize: ".7vw" }}>
                        {item.species}
                        {" - "}
                        {item.status}
                      </PopUpInfoRow>
                      <PopUpInfoRow style={{ fontSize: ".7vw" }}>
                        Origin - {item.origin.name}
                      </PopUpInfoRow>
                      <ButtonContainer
                        style={{
                          fontWeight: "700",
                          marginTop: "0",
                        }}
                      >
                        <PopUpRemove
                          style={{ fontSize: ".9vw" }}
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </PopUpRemove>
                        <PopUpRemove
                          style={{ fontSize: ".9vw" }}
                          onClick={handleReset}
                        >
                          Reset
                        </PopUpRemove>
                      </ButtonContainer>
                    </>
                  </PopUpCharInfo>
                </div>
              ))}
          </Slider>
        </PopUpBody>
      </PopUpContent>
    </>
  );
};
export default PopUpContainer;
