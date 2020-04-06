import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const CustomAttr = ({ attr, handleInputChange, removeCustomAttr }) => {
  return (
    <Grid container alignItems='center' spacing={0} justify='space-between'>
      <Grid item md={5}>
        <TextField
          variant='outlined'
          required
          fullWidth
          size='small'
          label='Attribute Name'
          name='attrName'
          value={attr.attrName}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item md={5}>
        <TextField
          variant='outlined'
          required
          fullWidth
          size='small'
          label='Attribute Value'
          name='attrValue'
          value={attr.attrValue}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item md={1}>
        <Tooltip title='Remove'>
          <IconButton onClick={removeCustomAttr}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default CustomAttr;
