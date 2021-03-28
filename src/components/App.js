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
import CharacterDetails from "./Pages/CharacterDetails/CharacterDetails";
import Nav from "./styledComponents/Nav/Nav";
import NavItem from "./styledComponents/Nav/NavItem";
import { useState } from "react";

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
