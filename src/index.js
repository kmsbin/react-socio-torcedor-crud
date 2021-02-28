import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clube from './routes/Clube';
import Socios from './routes/Socios';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Associados from './routes/Associados';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Clube}/>
        <Route path="/cadastrar-clube" exact={true} component={Clube}/>
        <Route path="/cadastrar-socio" exact={true} component={Socios}/>
        <Route path="/associados" exact={true} component={Associados}/>
      </Switch>
    
    </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
