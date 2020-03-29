import React from "react";
import List from "./list";
import pokedexData from "../data/data.js";

export default function Main() {
  const [data, setData] = React.useState(pokedexData.slice(0, 30));
  return <List data={data} />;
}
