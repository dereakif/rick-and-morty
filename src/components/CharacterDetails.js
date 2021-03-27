import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCharacter, getEpisode, getLocation } from "rickmortyapi";
import CharName from "./styledComponents/Characters/Card/CharName";
import styled from "styled-components";
const CharacterDetails = (props) => {
  const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0 0 20px;
    border-radius: 1rem;
  `;
  const CharacterImg = styled.img`
    width: 250px;
    height: auto;
    border-radius: 1rem;
  `;
  const CharacterInfo = styled.div`
    font-size: 24px;
    color: white;
  `;

  const EpisodeCard = styled.p`
    font-weight: 700;
    font-size: 18px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `;
  const EpisodeContent = styled.div`
    border: 2px solid white;
    border-radius: 1rem;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 150px;
    margin: 5px;
    padding: 0 5px;
    height: 100px;
  `;

  const EpisodeName = styled.p`
    font-weight: 400;
    font-size: 14px;
    text-align: center;
  `;
  const EpisodeAir = styled.p`
    font-weight: 300;
    font-size: 12px;
    margin-left: 10px;
    color: whitesmoke;
  `;
  const EpisodeTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    border-bottom: 1px solid white;
  `;
  const Container = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
  `;
  const EpisodeNumber = styled.div``;
  const [charInfo, setCharInfo] = useState({});

  const [charEpInfo, setCharEpInfo] = useState([]);
  const location = useLocation();

  useEffect(() => {
    //console.log(location.state, "akiif");
    setCharInfo(location.state);

    console.log("if ici");
    const episodes = getEpisode(
      location.state.episode.map((item) => item.replace(/\D/g, ""))
    );
    console.log(episodes, "promise oncesi");
    /* episodes.then((value) => setCharEpInfo(value));
      console.log(charEpInfo.length > 0 && charEpInfo); */
    // Array.isArray(episodes) ? episodes.then((value) => setCharEpInfo(value)):
    //episodes.then((value) => setCharEpInfo(value))
    console.log(episodes.constructor === Object);

    //Array.isArray(episodes)) {
    episodes.then(async (value) =>
      value.constructor === Object
        ? setCharEpInfo([...charEpInfo, value])
        : setCharEpInfo(value)
    );
  }, []);

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
