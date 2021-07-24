//antes de usar rodas mude  pra <Fragment>
// <React.Fragment><App /></React.Fragment> 
import React, {} from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Login} from './pages/Login';
import {Home} from './pages/Home';
const App = ()=> {
  return (
    <div>
     <Router>
       <Switch>
       <Route exact path="/" component={Login} />
       <Route  path="/home" component={Home} />
        </Switch>
     </Router>
  </div>
  );
}

export default App;
