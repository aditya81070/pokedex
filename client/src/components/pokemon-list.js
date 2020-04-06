import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PokemonDetail from './pokemon-detail';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  headingContainer: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
}));

export default function PokemonList(props) {
  const [pokemonList, setPokemonList] = useState([]);
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
  if (loading) {
    return <LinearProgress />;
  }
  return (
    <div>
      <Grid
        container
        justify='space-between'
        direction='row'
        alignItems='center'
        className={classes.headingContainer}
      >
        <Grid item>
          <Typography variant='h4' component='h1'>
            All Pokemons
          </Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to='/pokemon/add' variant='contained' color='primary'>
            Add Pokemon
          </Button>
        </Grid>
      </Grid>
      {pokemonList.length > 0 ? (
        pokemonList.map((pokemon) => (
          <PokemonDetail
            data={pokemon}
            key={pokemon.id}
            onChange={handlePokemonOpen(pokemon.id)}
            onDelete={handlePokemonDelete(pokemon.id)}
            expanded={expanded}
          />
        ))
      ) : (
        <Typography>No Pokemons to display.</Typography>
      )}
    </div>
  );
}
