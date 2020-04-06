import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CSSBaseLine from '@material-ui/core/CssBaseline';
import dotenv from 'dotenv';
import PokemonList from './pokemon-list';
import EditPokemon from './edit-pokemon';
import AddPokemon from './add-pokemon';

dotenv.config();
function App() {
  return (
    <>
      <CSSBaseLine />
      <Switch>
        <Route path='/' exact component={PokemonList} />
        <Route path='/pokemon/add' component={AddPokemon} />
        <Route path='/pokemon/:id/edit' component={EditPokemon} />>
      </Switch>
    </>
  );
}

export default App;
