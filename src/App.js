import React,{useState} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';


import Home from './components/Home';
import Register from './components/Register';
import Signin from './components/Signin';
import PrivateRoute from './PrivateRoute';

import DashBoard from './components/user/Index';
import HaveLeads from './components/user/HaveLeads';
import MyLeads from './components/user/MyLeads';

import Admin_index from './components/admin/Index';
import Verifylead from './components/admin/Verifylead';

import Error404 from './components/Error404';



function App() {
   
  return (
    <div className="App">
      
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/register' component={Register}/>
        
        
        <PrivateRoute  exact path='/dashboard' component={DashBoard} role='user'/>
        <PrivateRoute  exact path='/havelead' component={HaveLeads} role='user'/>
        <PrivateRoute  exact path='/myleads' component={MyLeads} role='user'/>




        <PrivateRoute  exact path='/admin' component={Admin_index} role='admin'/>
        <PrivateRoute  exact path='/admin/verifylead' component={Verifylead} role='admin'/>
        <Route component={Error404}/>
        
        
      </Switch>
      </BrowserRouter>
     
      
    
    </div>
  );
}

export default App;
