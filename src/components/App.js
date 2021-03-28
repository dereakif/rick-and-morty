import "./../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Characters from "./Pages/Characters/Characters";
import Episodes from "./Episodes";
import Locations from "./Locations";
import CharacterDetails from "./CharacterDetails";
import $ from "jquery";
import styled from "styled-components";
import { useState } from "react";
const Nav = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid white;
  line-height: 2;
`;
const NavItem = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  :hover {
    color: #fa1e0e;
  }
`;

function App() {
  const [activePage, setActivePage] = useState("");
  const handlePage = (event) => {
    setActivePage(event.target.innerHTML);
    console.log(activePage);
  };
  return (
    <Router>
      <div>
        <Nav>
          <Link to="/" onClick={handlePage} style={{ textDecoration: "none" }}>
            <NavItem
              style={{
                color: activePage == "Home" ? "red" : "white",
              }}
            >
              Home
            </NavItem>
          </Link>
          <Link
            to="/characters"
            onClick={handlePage}
            style={{ textDecoration: "none" }}
          >
            <NavItem
              style={{ color: activePage == "Characters" ? "red" : "white" }}
            >
              Characters
            </NavItem>
          </Link>
          <Link
            to="/locations"
            onClick={handlePage}
            style={{ textDecoration: "none" }}
          >
            <NavItem
              style={{ color: activePage == "Locations" ? "red" : "white" }}
            >
              Locations
            </NavItem>
          </Link>
          <Link
            to="/episodes"
            onClick={handlePage}
            style={{ textDecoration: "none" }}
          >
            <NavItem
              style={{ color: activePage == "Episodes" ? "red" : "white" }}
            >
              Episodes
            </NavItem>
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
