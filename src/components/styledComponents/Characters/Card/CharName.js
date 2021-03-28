import styled from "styled-components";

const CharName = styled.div`
  position: absolute;
  text-align: center;
  border-radius: 1rem;
  color: white;
  line-height: 1.6;
  font-size: 1vw;
  bottom: 0px;
  width: 100%;

  background-image: linear-gradient(
    to right,
    #3ca55c 0%,
    #b5ac49 51%,
    #3ca55c 100%
  );

  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;

  border-radius: 10px;
  display: block;
  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;
export default CharName;
