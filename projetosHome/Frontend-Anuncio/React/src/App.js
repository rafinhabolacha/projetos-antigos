import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {Home} from './pages/home';
import {VisualizarAnuncio} from './pages/visualizar';
import {CadastrarAnuncio} from './pages/cadastrarAnuncio';
import {EditarAnuncio} from './pages/EditarAnuncio';
import {Menus} from './components/Menus';


function App(){
   return(
 <div>
    <Menus/>
   <Router>
      <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/visulaizar-anuncio/:id" component={VisualizarAnuncio} />
         <Route path="/cadastrar-anuncio" component={CadastrarAnuncio}/>
         <Route path="/editar-anuncio/:id" component={EditarAnuncio}/>
   </Switch>
 </Router>
</div>
     
   )
}
export default App;