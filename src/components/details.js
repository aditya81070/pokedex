import React from "react";
import { useParams } from "react-router-dom";

export default function Details({ data }) {
  const { id } = useParams();
  const pokemon = data.find(pokemon => pokemon.id === parseInt(id));
  console.log(pokemon);
  return (
    <div>
      <p>Name: {pokemon.name.english}</p>
      <p>Type of pokemon</p>
      <ul>
        {pokemon.type.map(type => (
          <li key={type}>{type}</li>
        ))}
      </ul>
      <p>Attack Level: {pokemon.base.Attack}</p>
      <p>Defense Level: {pokemon.base.Defense}</p>
    </div>
  );
}
