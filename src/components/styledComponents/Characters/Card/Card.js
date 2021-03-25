import styled from "styled-components";

const Card = styled.div`
  position: relative;
  margin: 10px;
  transition: all 0.3s ease;
  :hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
`;
export default Card;
