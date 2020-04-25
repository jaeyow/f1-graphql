import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { SEASONS_LIST } from '../gql';
import AppState from '../AppState';
import useStyles from '../styles';

export default function SeasonsFilter() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(SEASONS_LIST);
    const { filters, setFilters } = useContext(AppState);
  
    const handleChange = (event) => {
      setFilters({
        ...filters,
        season: event.target.value
      });
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    console.log(`Season Filter: ${filters.season}`);
  
    return (
      <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <Select
              height='25%'
              value={ filters.season }
              onChange={ handleChange }>
                {
                  data.seasons.map((season, season_i) => (
                    <MenuItem key={season_i} value={season.season}>{season.season}</MenuItem>
                  ))
                }
            </Select>
          </FormControl>
      </Grid>
    );
  }