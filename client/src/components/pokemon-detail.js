import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useHistory } from 'react-router-dom';
import DetailField from './detail-field';
const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginLeft: 'auto',
    '& > button': {
      marginRight: theme.spacing(2),
    },
  },
  expDetails: {
    background: '#f1f1f1',
    flexDirection: 'column',
    width: '100%',
  },
  pokemonDetails: {
    backgroundColor: '#fff',
    boxShadow: `10px 10px 5px #f4f4f4`,
    border: `1px solid #f2f2f2`,
    width: '100%',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
  },
}));

const Pokemon = ({ type, base, englishName, customAttrs }) => {
  const classes = useStyles();
  return (
    <Grid container justify='center' direction='column' className={classes.pokemonDetails}>
      <DetailField name={englishName} base={base} customAttrs={customAttrs} type={type} />
    </Grid>
  );
};
export default function PokemonDetail(props) {
  const {
    name: { english: nameEnglish },
    base,
    type,
    id,
    customAttrs,
  } = props.data;
  const { expanded, onDelete, onChange } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleEditClick = (e) => {
    e.stopPropagation();
    history.push(`/pokemon/${id}/edit`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };
  return (
    <ExpansionPanel expanded={id === expanded} onChange={onChange} elevation={1}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        IconButtonProps={{
          disableRipple: true,
        }}
      >
        <Typography variant='h6' component='p'>
          {nameEnglish}
        </Typography>
        <div className={classes.buttonContainer}>
          <Button variant='outlined' color='primary' size='small' onClick={handleEditClick}>
            Edit
          </Button>
          {id > 150 && (
            <Button variant='outlined' color='secondary' size='small' onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expDetails}>
        <Pokemon englishName={nameEnglish} base={base} type={type} customAttrs={customAttrs} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
