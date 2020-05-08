import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { SEASONS_LIST } from '../gql';
import AppState from '../AppState';
import useStyles from '../styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SeasonsFilter() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(SEASONS_LIST);
    const { filters, setFilters, resultDetail, setResultDetail } = useContext(AppState);
  
    const handleChange = (event) => {
      setFilters({
        ...filters,
        season: event.target.value,
        detail: 'All'
      });

      setResultDetail({
        ...resultDetail,
        activeButton: 'Season Race Results'
      });
    };
  
    if (loading) return (
      <Grid item xs={4} className={classes.root}>
        <CircularProgress size={20} className={classes.spinner}></CircularProgress>
      </Grid>
    );

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