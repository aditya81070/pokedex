import React from 'react';
import { Route, Switch } from 'react-router-dom';
import dotenv from 'dotenv';
import List from './list';
import Details from './details';
import EditForm from './edit-form';
import Create from './form';
dotenv.config();

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <List />
      </Route>
      <Route path='/pokemon/add'>
        <Create />
      </Route>
      <Route path='/pokemon/:id/edit'>
        <EditForm />
      </Route>
      <Route path='/pokemon/:id'>
        <Details />
      </Route>
    </Switch>
  );
}

export default App;
