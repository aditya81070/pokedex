import React from 'react';
import { Link, useHistory } from 'react-router-dom';
export default function List({ data, loadData, ...props }) {
  const history = useHistory();
  const goToEdit = id => () => {
    console.log('cool');
    history.push(`/pokemon/${id}/edit`);
  };
  return (
    <div>
      {data.map(pokemon => (
        <div key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name.english}</Link>
          <button onClick={goToEdit(pokemon.id)}>Edit</button>
        </div>
      ))}
      <button onClick={loadData}>Show more pokemons</button>
    </div>
  );
}
