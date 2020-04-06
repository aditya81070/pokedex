import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CSSBaseLine from '@material-ui/core/CssBaseline';
import dotenv from 'dotenv';
import List from './list';
import Details from './details';
import EditForm from './edit-form';
import Create from './form';
dotenv.config();
function App() {
  return (
    <>
      <CSSBaseLine />
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
    </>
  );
}

export default App;
