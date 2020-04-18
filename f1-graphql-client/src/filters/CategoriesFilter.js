import React, { useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import AppState from '../AppState';
import useStyles from '../styles';

export default function CategoriesFilter() {
    const classes = useStyles();
    const { filters, setFilters } = useContext(AppState);
  
    const handleChange = (event) => {
      setFilters({
        ...filters,
        category: event.target.value
      });
    };
  
    console.log(`Catagory Filter: ${filters.category}`);
  
    return (
      <Grid item xs={4} className={classes.option}>
        <FormControl className={classes.formControl}>
          <Select
            height='25%'
            value={ filters.category }
            onChange={ handleChange }>
              <option value='Races' className={classes.option}>Races</option>
              <option value='Drivers' className={classes.option}>Drivers</option>
              <option value='Teams' className={classes.option}>Teams</option>
          </Select>
        </FormControl>
      </Grid>
    );
  }