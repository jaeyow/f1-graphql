import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MAIN_RESULTS_V2 } from '../gql';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import AppState from '../AppState';
import useStyles from '../styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function DetailsFilter() {
    const classes = useStyles();
    const { filters, setFilters, resultDetail, setResultDetail } = useContext(AppState);
    const { loading, error, data } = useQuery(MAIN_RESULTS_V2, {
      variables: { season: filters.season }
    });
  
    if (loading) return (
      <Grid item xs={4} className={classes.root}>
        <CircularProgress size={20} className={classes.spinner} ></CircularProgress>
      </Grid>
    );

    if (error) return <p>Error :(</p>;
  
    const handleChange = (event) => {
      setFilters({
        ...filters,
        detail: event.target.value
      });

      if (event.target.value !== 'All') {
        setResultDetail({
          ...resultDetail,
          raceResults: {
              state: true,
              title: 'Race Results',
              visible: true
          },
          fastestLaps: {
            state: false,
            title: 'Fastest Laps',
            visible: data.raceResults[0].Results[0].FastestLap ? true : false
          },
          activeButton: 'Race Results'
        });
      } else {
        setResultDetail({
          ...resultDetail,
          activeButton: 'Season Race Results'
        });
      }
    };
  
    console.log(`Detail Filter: ${filters.detail}`);
  
    return (
      <Grid item xs={4} className={classes.option}>
        <FormControl className={classes.formControl}>
        <Select
              height='25%'
              value={ filters.detail }
              onChange={ handleChange }>
                <MenuItem key="All" value="All" className={classes.option}>All</MenuItem>
                {
                  data.raceResults.map(({Circuit}, result_i) => (
                      <MenuItem key={result_i} value={result_i} className={classes.option}>{Circuit.Location.country}</MenuItem>
                  ))
                }
            </Select>
        </FormControl>
      </Grid>
    );
  }