import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
const CharacterDetails = (props) => {
  const Card = styled.div`
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
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
  const [charInfo, setCharInfo] = useState({});
  const location = useLocation();

  useEffect(() => {
    //console.log(location.state, "akiif");
    setCharInfo(location.state);
    console.log(location.state);
  }, []);
  return (
    <div>
      <Card>
        <CharacterInfo>{charInfo.name}as</CharacterInfo>
        <CharacterImg src={charInfo.image}></CharacterImg>
      </Card>
    </div>
  );
};
export default CharacterDetails;
