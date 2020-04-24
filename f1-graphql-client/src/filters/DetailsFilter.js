import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MAIN_RESULTS_V2 } from '../gql';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import AppState from '../AppState';
import useStyles from '../styles';

export default function DetailsFilter() {
    const classes = useStyles();
    const { filters, setFilters } = useContext(AppState);
    const { loading, error, data } = useQuery(MAIN_RESULTS_V2, {
      variables: { season: filters.season }
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
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
              height='25%'
              value={ filters.detail }
              onChange={ handleChange }>
                <option key="All" value="All" className={classes.option}>All</option>
                {
                  data.raceResultsV2.map(({Circuit}, result_i) => (
                      <option key={result_i} value={Circuit.Location.country} className={classes.option}>{Circuit.Location.country}</option>
                  ))
                }
            </Select>
        </FormControl>
      </Grid>
    );
  }