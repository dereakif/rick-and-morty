import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEpisode } from "rickmortyapi";
import CharName from "../../styledComponents/Characters/Card/CharName";
import Card from "../../styledComponents/CharacterDetails/Card";
import CharacterImg from "../../styledComponents/CharacterDetails/CharacterImg";
import EpisodeCard from "../../styledComponents/CharacterDetails/EpisodeCard";
import EpisodeContent from "../../styledComponents/CharacterDetails/EpisodeContent";
import Container from "../../styledComponents/CharacterDetails/Container";
import EpisodeTitle from "../../styledComponents/CharacterDetails/EpisodeTitle";
import EpisodeNumber from "../../styledComponents/CharacterDetails/EpisodeNumber";
import EpisodeAir from "../../styledComponents/CharacterDetails/EpisodeAir";
import EpisodeName from "../../styledComponents/CharacterDetails/EpisodeName";
const CharacterDetails = () => {
  const [charInfo, setCharInfo] = useState({});
  const [charEpInfo, setCharEpInfo] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setCharInfo(location.state);

    const episodes = getEpisode(
      location.state.episode.map((item) => item.replace(/\D/g, ""))
    );
    episodes.then(async (value) =>
      value.constructor === Object
        ? setCharEpInfo([...charEpInfo, value])
        : setCharEpInfo(value)
    );
  }, [location.state]);

  return (
    <Container>
      <Card>
        <CharacterImg src={charInfo.image}></CharacterImg>
        <CharName style={{ position: "static" }}>{charInfo.name}</CharName>
      </Card>
      <EpisodeCard>
        {charEpInfo.length > 0 &&
          charEpInfo.map((item, i) => (
            <EpisodeContent key={i}>
              <EpisodeTitle>
                <EpisodeNumber>{item.episode}</EpisodeNumber>
                <EpisodeAir> {item.air_date}</EpisodeAir>
              </EpisodeTitle>
              <EpisodeName>{item.name}</EpisodeName>
            </EpisodeContent>
          ))}
      </EpisodeCard>
    </Container>
  );
};
export default CharacterDetails;
