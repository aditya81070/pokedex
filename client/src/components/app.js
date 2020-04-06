import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CSSBaseLine from '@material-ui/core/CssBaseline';
import dotenv from 'dotenv';
import PokemonList from './pokemon-list';
import EditForm from './edit-form';
import Create from './form';
dotenv.config();
function App() {
  return (
    <>
      <CSSBaseLine />
      <Switch>
        <Route path='/' exact>
          <PokemonList />
        </Route>
        <Route path='/pokemon/add'>
          <Create />
        </Route>
        <Route path='/pokemon/:id/edit'>
          <EditForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
