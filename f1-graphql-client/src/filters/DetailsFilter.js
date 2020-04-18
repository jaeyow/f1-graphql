import React, { useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import AppState from '../AppState';
import useStyles from '../styles';

export default function DetailsFilter() {
    const classes = useStyles();
    const { filters, setFilters } = useContext(AppState);
  
    const handleChange = (event) => {
      setFilters({
        ...filters,
        detail: event.target.value
      });
    };
  
    console.log(`Detail Filter: ${filters.detail}`);
  
    return (
      <Grid item xs={4} className={classes.option}>
        <FormControl className={classes.formControl}>
          <Select
            value={ filters.detail }
            onChange={ handleChange }>
            <option value='Option1' className={classes.option}>Option1</option>
            <option value='Option2' className={classes.option}>Option2</option>
            <option value='Option3' className={classes.option}>Option3</option>
          </Select>
        </FormControl>
      </Grid>
    );
  }