import PopUpContent from "../../styledComponents/PopUp/PopUpContent";
import PopUpHeader from "../../styledComponents/PopUp/PopUpHeader";
import PopUpHeaderTitle from "../../styledComponents/PopUp/PopUpHeaderTitle";
import PopUpCloseBtn from "../../styledComponents/PopUp/PopUpCloseBtn";
import PopUpBody from "../../styledComponents/PopUp/PopUpBody";
import PopUpImg from "../../styledComponents/PopUp/PopUpImg";
import PopUpCharInfo from "../../styledComponents/PopUp/PopUpCharInfo";
import PopUpInfoRow from "../../styledComponents/PopUp/PopUpInfoRow";
import ButtonContainer from "../../styledComponents/Characters/Buttons/ButtonContainer";
import PopUpRemove from "../../styledComponents/Characters/Buttons/PopUpRemove";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopUpContainer = ({ favoritesList, setFavoritesList, setIsOpen }) => {
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

  const handleRemove = (char) => {
    setFavoritesList(
      favoritesList.map((item) => item.id !== char.id && item).filter(Boolean)
    );
    console.log(
      favoritesList.map((item) => item.id !== char.id && item).filter(Boolean)
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
              favoritesList.map((item, i) => (
                <div key={i}>
                  <PopUpImg src={item.image} />
                  <PopUpCharInfo>
                    <>
                      <PopUpInfoRow
                        style={{
                          fontWeight: "700",
                          fontSize: "1.1rem",
                          letterSpacing: "1px",
                        }}
                      >
                        {item.name}
                      </PopUpInfoRow>
                      <PopUpInfoRow style={{ fontSize: ".8rem" }}>
                        {item.species}
                        {" - "}
                        {item.status}
                      </PopUpInfoRow>
                      <PopUpInfoRow style={{ fontSize: ".8rem" }}>
                        Origin - {item.origin.name}
                      </PopUpInfoRow>

                      <ButtonContainer
                        style={{
                          fontWeight: "700",
                          marginTop: "0",
                        }}
                      >
                        <PopUpRemove onClick={() => handleRemove(item)}>
                          Remove
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
