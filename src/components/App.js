import Header from "./Header/Header";
import Main from "./Main/Main";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";


function App() {
  return (
    <div>
      <Header />
      <Main />
      
    </div>
  );
}

export default App;
