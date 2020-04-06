import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CustomAttr from './custom-attr';
import { baseLabels, styles } from './add-pokemon';
import Wrapper from './wrapper';

class EditPokemon extends React.Component {
  state = {
    id: 0,
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

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`${process.env.REACT_APP_API_URL}/pokemons/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.err) {
          const pokemon = data.data;
          const { name, base, type, customAttrs, id: uid } = pokemon;
          let customAttributes = [];
          if (customAttrs) {
            customAttributes = Object.keys(customAttrs).map((attrName) => ({
              attrName: attrName,
              attrValue: customAttrs[attrName],
            }));
          }
          this.setState({
            id: uid,
            name: name.english,
            type: type.join(','),
            hp: base.HP,
            attack: base.Attack,
            defense: base.Defense,
            spAttack: base.SpAttack,
            spDefense: base.SpDefense,
            speed: base.Speed,
            customAttrs: customAttributes,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeCustomAttr = (idx) => () => {
    this.setState((prevState) => ({
      customAttrs: prevState.customAttrs.filter((_, id) => id !== idx),
    }));
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

  handleBack = () => {
    this.props.history.push('/');
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      type,
      hp,
      attack,
      defense,
      spAttack,
      spDefense,
      speed,
      customAttrs,
      id,
    } = this.state;
    const customAttributes = {};
    customAttrs.forEach(({ attrName, attrValue }) => (customAttributes[attrName] = attrValue));
    const data = {
      id,
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
    fetch(`${process.env.REACT_APP_API_URL}/pokemons/${id}`, {
      method: 'PUT',
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
        <Typography variant='h5' component='h1' className={classes.title}>
          Edit Pokemon Details
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
                Update Pokemon
              </Button>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(EditPokemon);
