import { BrowserRouter, Switch, Route } from "react-router-dom";
// CSS
import "./App.css";
// Components
import Home from "./views/Home";
import Nav from "./components/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
