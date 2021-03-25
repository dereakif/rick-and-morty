import "./../App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Characters from "./Pages/Characters/Characters";
import Episodes from "./Episodes";
import Locations from "./Locations";
import CharacterDetails from "./CharacterDetails";
import FavCharacters from "./FavCharacters";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/characters">Characters</Link>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
            <li>
              <Link to="/episodes">Episodes</Link>
            </li>
            <li>
              <Link to="/favcharacters">FavCharacters</Link>
            </li>
          </ul>
        </nav>
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
