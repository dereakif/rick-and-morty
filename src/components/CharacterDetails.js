import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCharacter, getEpisode, getLocation } from "rickmortyapi";
import CharName from "./styledComponents/Characters/Card/CharName";
import styled from "styled-components";
const CharacterDetails = (props) => {
  const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    margin-left: 2rem;
    border-radius: 1rem;
  `;
  const CharacterImg = styled.img`
    width: 20rem;
    height: auto;
    border-radius: 1rem;
  `;
  const CharacterInfo = styled.div`
    font-size: 24px;
    color: white;
  `;

  const EpisodeCard = styled.p`
    font-weight: 700;
    font-size: 1.6vw;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  `;
  const EpisodeContent = styled.div`
    border: 2px solid white;
    border-radius: 1rem;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10vw;
    height: 15vh;
    margin: 0.1vh 1rem 0.1vh 0;
    padding: 5px 5px;
  `;

  const EpisodeName = styled.p`
    font-weight: 500;
    font-size: 1vw;
    margin-top: 1vh;
    line-height: 1.5;
    text-align: center;
  `;
  const EpisodeAir = styled.p`
    font-weight: 300;
    font-size: 0.7vw;
    margin-left: 10px;
    font-style: italic;
    color: whitesmoke;
  `;
  const EpisodeTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: max-content;
    margin-top: 0;
    line-height: 1.5;
    border-bottom: 1px solid white;
  `;
  const Container = styled.div`
    margin: 0;
    display: flex;
    justify-content: center;
  `;
  const EpisodeNumber = styled.div`
    font-weight: 600;
    letter-spacing: 1px;
  `;
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
