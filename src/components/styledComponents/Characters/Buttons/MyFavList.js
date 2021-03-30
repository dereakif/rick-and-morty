import styled from "styled-components";

const MyFavList = styled.div`
  border: 2px solid white;
  border-radius: 1rem;
  padding: 4px 10px;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  :hover {
    color: black;
    background-color: white;
  }
`;
export default MyFavList;
