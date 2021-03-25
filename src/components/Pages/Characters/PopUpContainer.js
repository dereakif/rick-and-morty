import PopUpContent from "../../styledComponents/PopUp/PopUpContent";
import PopUpHeader from "../../styledComponents/PopUp/PopUpHeader";
import PopUpHeaderTitle from "../../styledComponents/PopUp/PopUpHeaderTitle";
import PopUpCloseBtn from "../../styledComponents/PopUp/PopUpCloseBtn";
import PopUpBody from "../../styledComponents/PopUp/PopUpBody";
import PopUpImg from "../../styledComponents/PopUp/PopUpImg";
import PopUpCharInfo from "../../styledComponents/PopUp/PopUpCharInfo";
import PopUpInfoRow from "../../styledComponents/PopUp/PopUpInfoRow";
import $ from "jquery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopUp from "../../styledComponents/PopUp/PopUp";

const PopUpContainer = ({ favoritesList, setFavoritesList }) => {
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
  const closePopUp = () => {
    $(".popUp").css("display", "none");
    $(".fav-btn").css("z-index", "1");
    $(".char-card").css("z-index", "1");
  };
  $(".popUp").click((event) => {
    $.inArray("popUp", event.target.classList) > -1 && closePopUp();
  });

  $(".closeBtn").click(() => closePopUp());

  const handleReset = () => {
    setFavoritesList([]);
  };
  const handleRemove = (charId) => {
    setFavoritesList(
      favoritesList.map((item) => item.id !== charId && item).filter(Boolean)
    );
  };
  return (
    <PopUp className="popUp">
      <PopUpContent>
        <PopUpHeader>
          <PopUpHeaderTitle>My Favorite Characters</PopUpHeaderTitle>
          <PopUpHeaderTitle>Total: {favoritesList.length}</PopUpHeaderTitle>
          <PopUpCloseBtn className="closeBtn">&times;</PopUpCloseBtn>
        </PopUpHeader>
        <PopUpBody>
          <Slider {...slickSettings}>
            {favoritesList &&
              favoritesList.map((item) => (
                <div>
                  <PopUpImg src={item.image} />
                  <PopUpCharInfo>
                    <>
                      <PopUpInfoRow style={{ fontWeight: "700" }}>
                        {item.name}
                      </PopUpInfoRow>
                      <PopUpInfoRow style={{ fontSize: "18px" }}>
                        {item.species}
                        {" - "}
                        {item.status}
                      </PopUpInfoRow>
                      <PopUpInfoRow style={{ fontSize: "18px" }}>
                        Origin - {item.origin.name}
                      </PopUpInfoRow>
                      <button onClick={() => handleRemove(item.id)}>
                        remove char
                      </button>
                      <button onClick={handleReset}>reset fav list</button>
                    </>
                  </PopUpCharInfo>
                </div>
              ))}
          </Slider>
        </PopUpBody>
      </PopUpContent>
    </PopUp>
  );
};
export default PopUpContainer;
