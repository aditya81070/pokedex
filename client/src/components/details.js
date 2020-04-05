import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/pokemons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          console.log(data);
          setPokemon(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return pokemon ? (
    <div>
      <p>Name: {pokemon.name.english}</p>
      <p>Type of pokemon</p>
      <ul>
        {pokemon.type.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
      <p>Attack Level: {pokemon.base.Attack}</p>
      <p>Defense Level: {pokemon.base.Defense}</p>
      {pokemon.customAttrs &&
        Object.keys(pokemon.customAttrs).map((attr) => (
          <p>
            {attr}: {pokemon.customAttrs[attr]}
          </p>
        ))}
    </div>
  ) : (
    <p>Loading pokemon data...</p>
  );
}
