import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCharacter, getEpisode, getLocation } from "rickmortyapi"; // getCharacter()
import styled from "styled-components";
const CharacterDetails = (props) => {
  const Card = styled.div`
    border: 1px solid black;
    display: flex;

    padding: 20px;
    border-radius: 1rem;
  `;
  const CharacterImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 1rem;
  `;
  const CharacterInfo = styled.div`
    width: 200px;
    height: 100px;
    border-radius: 1rem;
    border: 1px solid black;
  `;

  const EpisodeCard = styled.p`
    font-weight: 600;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;
  const EpisodeContent = styled.div`
    border: 2px solid white;
    color: white;
  `;

  const EpisodeName = styled.p`
    font-weight: 300;
    font-size: 12px;
  `;
  const EpisodeAir = styled.p`
    font-weight: 300;
    font-size: 8px;
  `;

  const [charInfo, setCharInfo] = useState({});
  const [charEpNumbers, setCharEpNumbers] = useState([]);
  const [charEpInfo, setCharEpInfo] = useState([]);
  const location = useLocation();

  useEffect(() => {
    //console.log(location.state, "akiif");
    setCharInfo(location.state);

    console.log("if ici");
    let episodes = getEpisode(
      location.state.episode.map((item) => item.replace(/\D/g, ""))
    );
    console.log(episodes, "promise oncesi");
    /* episodes.then((value) => setCharEpInfo(value));
      console.log(charEpInfo.length > 0 && charEpInfo); */
    episodes.then((value) => setCharEpInfo(value));
    console.log(charEpInfo.length, "promise sonrasi");
  }, []);

  return (
    <div>
      <Card>
        <CharacterInfo>{charInfo.name}as</CharacterInfo>
        <CharacterImg src={charInfo.image}></CharacterImg>
        <EpisodeCard>
          {charEpInfo.length > 0 &&
            charEpInfo.map((item) => (
              <EpisodeContent>
                {item.episode}
                <EpisodeAir> Aired: {item.air_date}</EpisodeAir>
                <EpisodeName>{item.name}</EpisodeName>
              </EpisodeContent>
            ))}
        </EpisodeCard>
      </Card>
    </div>
  );
};
export default CharacterDetails;
