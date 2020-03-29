import React from "react";

export default function List({ data }) {
  return (
    <ul>
      {data.map(pokemon => (
        <li key={pokemon.id}>{pokemon.name.english}</li>
      ))}
    </ul>
  );
}
