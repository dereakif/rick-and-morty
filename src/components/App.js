import "./../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Characters from "./Pages/Characters/Characters";
import Episodes from "./Episodes";
import Locations from "./Locations";
import CharacterDetails from "./CharacterDetails";

import styled from "styled-components";
const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid white;
  line-height: 2;
`;
const NavItem = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  :hover {
    color: #fa1e0e;
  }
`;
function App() {
  return (
    <Router>
      <div>
        <Nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <NavItem>Home</NavItem>
          </Link>

          <Link to="/characters" style={{ textDecoration: "none" }}>
            <NavItem>Characters</NavItem>
          </Link>
          <Link to="/locations" style={{ textDecoration: "none" }}>
            <NavItem>Locations</NavItem>
          </Link>
          <Link to="/episodes" style={{ textDecoration: "none" }}>
            <NavItem>Episodes</NavItem>
          </Link>
        </Nav>
        <Switch>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/episode">
            <Episodes />
          </Route>
          <Route path="/characterdetails">
            <CharacterDetails />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
