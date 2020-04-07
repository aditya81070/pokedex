import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import PokemonDetail from './pokemon-detail';
import LinearProgress from '@material-ui/core/LinearProgress';
import Wrapper from './wrapper';
import Button from '@material-ui/core/Button';
import ListHeader from './list-header';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  showMoreBtnContainer: {
    margin: theme.spacing(2, 0),
  },
}));
export default function PokemonList(props) {
  const [pokemonList, setPokemonList] = useState([]);
  const [limitedList, setLimitedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/pokemons`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (!data.err) {
          setPokemonList(data.data);
          setLimitedList(data.data.slice(0, 20));
        } else {
          console.log('can not fetch data');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(`err in req: ${err}`);
      });
  }, []);

  const handlePokemonOpen = (id) => (_, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };

  const handleShowMore = () => {
    setLimitedList((prev) => pokemonList.slice(0, prev.length + 10));
  };
  const handlePokemonDelete = (id) => () => {
    fetch(`${process.env.REACT_APP_API_URL}/pokemons/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          setPokemonList((prev) => prev.filter((pokemon) => pokemon.id !== id));
        } else {
          console.log('can not delete. try again later.');
        }
      })
      .catch((err) => {
        console.log(`err in req: ${err}`);
      });
  };

  return (
    <Wrapper>
      {loading ? (
        <LinearProgress color='secondary' />
      ) : (
        <>
          <ListHeader list={pokemonList} />
          {limitedList.length > 0 ? (
            limitedList.map((pokemon) => (
              <PokemonDetail
                data={pokemon}
                key={pokemon.id}
                onChange={handlePokemonOpen(pokemon.id)}
                onDelete={handlePokemonDelete(pokemon.id)}
                expanded={expanded}
              />
            ))
          ) : (
            <Grid container justify='center'>
              <Typography>No Pokemons to display.</Typography>
            </Grid>
          )}
          <Grid container justify='center' className={classes.showMoreBtnContainer}>
            <Button variant='outlined' onClick={handleShowMore}>
              Show more Pokemons
            </Button>
          </Grid>
        </>
      )}
    </Wrapper>
  );
}
