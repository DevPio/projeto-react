
import React from 'react';
import Header from './components/Header';

import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import AdicionarMes from './components/AdicionarMes';
import MovimentacoesData from './pages/MovimentacoesData';


function App() {

  return (
    <div className="App">
    
     
      

      <BrowserRouter>
        <Header />
      <Switch>
          <Route path={`/`} exact component={()=><Home/>}></Route>

          <Route path={`/movimentacoes/:data`} component={MovimentacoesData} >
            
          </Route>
        </Switch>
      </BrowserRouter>
      
      
      
    </div>
  );  
}

export default App;
