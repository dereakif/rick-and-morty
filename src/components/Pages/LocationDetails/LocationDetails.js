import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCharacter } from "rickmortyapi";
import Card from "../../styledComponents/Characters/Card/Card";
import CardContainer from "../../styledComponents/Characters/Card/CardContainer";
import CharImg from "../../styledComponents/Characters/Card/CharImg";
import CharName from "../../styledComponents/Characters/Card/CharName";

const LocationDetails = () => {
  const location = useLocation();
  const [residentsInfo, setResidentsInfo] = useState([]);
  useEffect(() => {
    const residents = getCharacter(
      location.state.residents.map((item) => item.replace(/\D/g, ""))
    );

    residents.then(async (value) =>
      value.constructor === Object
        ? setResidentsInfo([...residentsInfo, value])
        : setResidentsInfo(value)
    );
  }, [location, residentsInfo]);
  return (
    <CardContainer>
      {residentsInfo.length > 0 &&
        residentsInfo.map((character, i) => (
          <Card key={i} className="char-card">
            <CharImg
              key={i}
              src={character && character.image}
              alt="character-img"
            ></CharImg>

            <CharName className="quick-view">{character.name}</CharName>
          </Card>
        ))}
    </CardContainer>
  );
};
export default LocationDetails;
