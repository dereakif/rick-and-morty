import "./../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Characters from "./Pages/Characters/Characters";
import Locations from "./Pages/Locations/Locations";
import CharacterDetails from "./Pages/CharacterDetails/CharacterDetails";
import Nav from "./styledComponents/Nav/Nav";
import NavItem from "./styledComponents/Nav/NavItem";
import { useState } from "react";
import LocationDetails from "./Pages/LocationDetails/LocationDetails";
import navLogo from "../assets/nav-logo.png";
import styled from "styled-components";

const NavLogo = styled.img`
  height: auto;
  width: 4rem;
  padding: 5px 0;
`;
const NavItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  letter-spacing: 1px;
`;

function App() {
  const [activePage, setActivePage] = useState("");
  const handlePage = (event) => {
    setActivePage(event.target.innerHTML);
  };
  const clickHandler = () => {
    setActivePage("Home");
  };
  return (
    <Router>
      <div>
        <Nav>
          <Link onClick={clickHandler} to="/">
            <NavLogo src={navLogo} alt="logo"></NavLogo>
          </Link>
          <NavItemContainer>
            <Link
              to="/"
              onClick={handlePage}
              style={{ textDecoration: "none" }}
            >
              <NavItem
                style={{
                  color: activePage === "Home" ? "#e84545" : "white",
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
                style={{
                  color: activePage === "Characters" ? "#e84545" : "white",
                }}
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
                style={{
                  color: activePage === "Locations" ? "#e84545" : "white",
                }}
              >
                Locations
              </NavItem>
            </Link>
          </NavItemContainer>
        </Nav>
        <Switch>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <Route path="/characterdetails">
            <CharacterDetails />
          </Route>
          <Route path="/locationdetails">
            <LocationDetails />
          </Route>
          <Route path="*">
            <Home />
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
