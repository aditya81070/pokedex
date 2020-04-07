import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Wrapper from './wrapper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DetailField from './detail-field';
const DetailPage = (props) => {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/pokemons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          const pokemon = data.data;
          setPokemon(pokemon);
        } else {
          console.log(`err fetching data: ${data.message}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handlePokemonDelete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/pokemons/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          props.history.push('/');
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
      {pokemon ? (
        <>
          <Grid container justify='space-between'>
            <Grid item>
              <Typography variant='h4' component='h2'>
                {pokemon.name.english}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant='outlined'
                    color='secondary'
                    component={Link}
                    to={`/pokemon/${id}/edit`}
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' onClick={handlePokemonDelete}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify='center' direction='column'>
            <DetailField
              base={pokemon.base}
              type={pokemon.type}
              customAttrs={pokemon.customAttrs}
            />
          </Grid>
        </>
      ) : (
        <Typography>Loading pokemon details...</Typography>
      )}
    </Wrapper>
  );
};

export default DetailPage;
