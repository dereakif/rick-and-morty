import styled from "styled-components";
const EpisodeContent = styled.div`
  border: 2px solid #903749;
  border-radius: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  letter-spacing: 1px;
  width: 15rem;
  height: 8rem;
  margin: 0.5rem 2rem 1rem 0;
  padding: 5px 5px;
  :hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
`;
export default EpisodeContent;
