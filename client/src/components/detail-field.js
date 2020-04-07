import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chip: {
    marginLeft: theme.spacing(1),
    '&:first-of-type': {
      marginLeft: '0px',
    },
  },
  chipContainer: {
    width: 'calc(100% - 200px)',
  },
  titleContainer: {
    width: '200px',
  },
  attrContainer: {
    padding: theme.spacing(1, 0),
  },
}));

const DetailField = ({ base, type, customAttrs, name }) => {
  const classes = useStyles();
  return (
    <>
      {name && (
        <>
          <Grid item container alignItems='center' className={classes.attrContainer}>
            <Grid item className={classes.titleContainer}>
              <Typography variant='h6' component='p'>
                Name
              </Typography>
            </Grid>
            <Grid item className={classes.chipContainer}>
              {name}
            </Grid>
          </Grid>
          <Divider />
        </>
      )}
      <Grid item container alignItems='center' className={classes.attrContainer}>
        <Grid item className={classes.titleContainer}>
          <Typography variant='h6' component='p'>
            Types
          </Typography>
        </Grid>
        <Grid item className={classes.chipContainer}>
          {type.map((t) => (
            <Chip key={t} variant='outlined' size='small' label={t} className={classes.chip} />
          ))}
        </Grid>
      </Grid>
      <Divider />

      <Grid item container alignItems='center' className={classes.attrContainer}>
        <Grid item className={classes.titleContainer}>
          <Typography variant='h6' component='p'>
            Attack
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6' component='p'>
            {base.Attack}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid item container alignItems='center' className={classes.attrContainer}>
        <Grid item>
          <Typography variant='h6' component='p' className={classes.titleContainer}>
            Defense
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6' component='p'>
            {base.Defense}
          </Typography>
        </Grid>
      </Grid>
      {customAttrs
        ? Object.keys(customAttrs).map((key) => (
            <React.Fragment key={key}>
              <Divider />
              <Grid item container alignItems='center' className={classes.attrContainer}>
                <Grid item>
                  <Typography variant='h6' component='p' className={classes.titleContainer}>
                    {key}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h6' component='p'>
                    {customAttrs[key]}
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          ))
        : null}
    </>
  );
};

export default DetailField;
