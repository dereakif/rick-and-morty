import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../../store/actions/action";
import EpisodeAir from "../../styledComponents/CharacterDetails/EpisodeAir";
import EpisodeCard from "../../styledComponents/CharacterDetails/EpisodeCard";
import EpisodeContent from "../../styledComponents/CharacterDetails/EpisodeContent";
import EpisodeName from "../../styledComponents/CharacterDetails/EpisodeName";
import EpisodeNumber from "../../styledComponents/CharacterDetails/EpisodeNumber";
import EpisodeTitle from "../../styledComponents/CharacterDetails/EpisodeTitle";
import ButtonContainer from "../../styledComponents/Characters/Buttons/ButtonContainer";

import PageButton from "../../styledComponents/Characters/Buttons/PageButton";
import {
  faChevronLeft,
  faChevronRight,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "../../styledComponents/Characters/Buttons/ScrollToTop";
import { Link } from "react-router-dom";
const Locations = () => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getLocation(pageNumber));
  }, [pageNumber]);
  const locations = useSelector((state) => state.locationReducer.data);
  console.log(locations);
  const handlePrevious = () => {
    pageNumber <= 1 ? setPageNumber(1) : setPageNumber(pageNumber - 1);
    console.log(pageNumber);
  };

  const handleNext = () => {
    pageNumber >= 6 ? setPageNumber(6) : setPageNumber(pageNumber + 1);
    console.log(pageNumber);
  };

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ButtonContainer>
        <PageButton onClick={handlePrevious}>
          <FontAwesomeIcon icon={faChevronLeft} /> Previous page
        </PageButton>

        <PageButton onClick={handleNext}>
          Next page <FontAwesomeIcon icon={faChevronRight} />
        </PageButton>
      </ButtonContainer>
      <EpisodeCard>
        {locations.length > 0 &&
          locations.map((location, i) => (
            <Link to={{ pathname: "/locationdetails", state: location }}>
              <EpisodeContent
                key={i}
                style={{ width: "20rem", height: "5rem" }}
              >
                <EpisodeTitle>
                  <EpisodeNumber>
                    Residents: {location.residents.length}
                  </EpisodeNumber>
                  <EpisodeAir> {location.type}</EpisodeAir>
                  <EpisodeAir>Dimension: {location.dimension}</EpisodeAir>
                </EpisodeTitle>
                <EpisodeName>{location.name}</EpisodeName>
              </EpisodeContent>
            </Link>
          ))}
      </EpisodeCard>
      <ScrollToTop onClick={scrollToTop}>
        <FontAwesomeIcon icon={faChevronCircleUp} size="2x"></FontAwesomeIcon>
      </ScrollToTop>
    </>
  );
};
export default Locations;
