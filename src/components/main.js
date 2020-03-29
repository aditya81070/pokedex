import React from 'react';
import List from './list';
import pokedexData from '../data/data.js';
import Details from './details';
import Create from './form';
import { Route, Switch } from 'react-router-dom';
import EditForm from './edit-form';
export default function Main() {
  const [data, setData] = React.useState(pokedexData.slice(0, 3));

  const addPokemon = data => {
    setData(prev => [...prev, data]);
  };

  const updatePokemon = data => {
    setData(prev => prev.map(pokemon => (pokemon.id === data.id ? data : pokemon)));
  };
  const loadData = () => {
    setData(prevData => [...prevData, ...pokedexData.slice(prevData.length, prevData.length + 10)]);
  };
  return (
    <Switch>
      <Route path='/' exact>
        <List data={data} loadData={loadData} />
      </Route>
      <Route path='/pokemon/add'>
        <Create addPokemon={addPokemon} length={data.length} />
      </Route>
      <Route path='/pokemon/:id/edit'>
        <EditForm data={data} updatePokemon={updatePokemon} />
      </Route>
      <Route path='/pokemon/:id'>
        <Details data={data} />
      </Route>
    </Switch>
  );
}
