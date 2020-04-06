import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomAttr from './custom-attr';
import Wrapper from './wrapper';
export const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginTop: theme.spacing(3),
    },
  },
  title: {
    padding: `${theme.spacing(1.25)}px 0px`,
  },
  button: {
    textTransform: 'none',
  },
});

export const baseLabels = [
  {
    label: 'HP',
    name: 'hp',
  },
  {
    label: 'Attack',
    name: 'attack',
  },
  {
    label: 'Defense',
    name: 'defense',
  },
  {
    label: 'Sp. Attack',
    name: 'spAttack',
  },
  {
    label: 'Sp. Defense',
    name: 'spDefense',
  },
  {
    label: 'Speed',
    name: 'speed',
  },
];

class AddPokemon extends React.Component {
  state = {
    name: '',
    type: '',
    hp: 0,
    attack: 0,
    defense: 0,
    spAttack: 0,
    spDefense: 0,
    speed: 0,
    customAttrs: [],
  };

  removeCustomAttr = (idx) => () => {
    this.setState((prevState) => ({
      customAttrs: prevState.customAttrs.filter((_, id) => id !== idx),
    }));
  };

  handleBack = () => {
    this.props.history.push('/');
  };

  addCustomAttr = () => {
    this.setState((prev) => ({
      customAttrs: [
        ...prev.customAttrs,
        {
          attrName: '',
          attrValue: '',
        },
      ],
    }));
  };
  handleCustomAttrChange = (idx) => (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      customAttrs: prev.customAttrs.map((attr, index) =>
        idx === index ? { ...attr, [name]: value } : attr,
      ),
    }));
  };
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, type, hp, attack, defense, spAttack, spDefense, speed, customAttrs } = this.state;
    const customAttributes = {};
    customAttrs.forEach(({ attrName, attrValue }) => (customAttributes[attrName] = attrValue));
    const data = {
      name: {
        english: name,
        japanese: name,
        chinese: name,
      },
      type: type.split(',').filter((t) => String(t).trim()),
      base: {
        HP: hp,
        Attack: attack,
        Defense: defense,
        SpAttack: spAttack,
        SpDefense: spDefense,
        Speed: speed,
      },
      customAttrs: customAttributes,
    };
    fetch(`${process.env.REACT_APP_API_URL}/pokemons`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          this.props.history.push('/');
        } else {
          console.log('can not add item');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    const { customAttrs } = this.state;
    const { classes } = this.props;
    return (
      <Wrapper>
        <Typography variant='h' component='h1' className={classes.title}>
          New Pokemon Details
        </Typography>
        <form onSubmit={this.handleFormSubmit} className={classes.form}>
          <Typography component='p'>Basic Details</Typography>
          <TextField
            variant='outlined'
            required
            fullWidth
            size='small'
            label='Name'
            name='name'
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <TextField
            variant='outlined'
            required
            fullWidth
            size='small'
            label='Type'
            name='type'
            value={this.state.type}
            onChange={this.handleInputChange}
            helperText='Enter comma separated types'
          />
          <Typography component='p'>Power Details</Typography>
          {baseLabels.map((baseLabel) => (
            <TextField
              key={baseLabel.name}
              variant='outlined'
              required
              fullWidth
              type='number'
              size='small'
              label={baseLabel.label}
              name={baseLabel.name}
              value={this.state[baseLabel.name]}
              onChange={this.handleInputChange}
              inputProps={{
                min: 0,
              }}
            />
          ))}
          {customAttrs.length > 0 ? (
            <>
              <Typography component='p'>Additional Details</Typography>
              {customAttrs.map((attr, idx) => (
                <CustomAttr
                  attr={attr}
                  key={idx}
                  handleInputChange={this.handleCustomAttrChange(idx)}
                  removeCustomAttr={this.removeCustomAttr(idx)}
                />
              ))}
            </>
          ) : null}
          <Grid container spacing={4} direction='row' justify='center'>
            <Grid item md={3}>
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                onClick={this.addCustomAttr}
                className={classes.button}
              >
                Add More Details
              </Button>
            </Grid>
            <Grid item md={3}>
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                onClick={this.handleBack}
                className={classes.button}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item md={3}>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Add Pokemon
              </Button>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(AddPokemon);
