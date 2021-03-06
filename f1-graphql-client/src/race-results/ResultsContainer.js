import React, { useContext, Fragment } from 'react';
import AppState from '../AppState';
import useStyles from '../styles';
import SideNav from './SideNav';
import Grid from '@material-ui/core/Grid';
import RaceResultsTable from './RaceResultsTable';
import CircuitResultsTable from './CircuitResultsTable';
import FastestLapsTable from './FastestLapsTable';
import QualifyingResultsTable from './QualifyingResultsTable';
import { MAIN_RESULTS } from '../gql';
import { useQuery } from '@apollo/react-hooks';

export default function ResultsContainer() {
  const classes = useStyles();
  const { filters, resultDetail } = useContext(AppState);
  const { loading, error, data } = useQuery(MAIN_RESULTS, {
    variables: { season: filters.season }
  });

  if (loading) return null;
  if (error) return <p>Error :(</p>;
  
  const races = data.raceResults;  
  const tableTitle = resultDetail.activeButton === 'Season Race Results' ?
  `Formula 1 - ${filters.season} Season Race Results` :
  `Formula 1 - ${filters.season} ${races[filters.detail].raceName} - ${resultDetail.activeButton }`;

  const renderTable = (param) => {
    switch(param) {
      case 'Race Results':
        return <CircuitResultsTable races={races}/>;
      case 'Fastest Laps':
        return <FastestLapsTable races={races}/>;
      case 'Qualifying':
        return <QualifyingResultsTable/>;
      default:
        return <RaceResultsTable races={races}/>;
    }
  }

  return (
    <Fragment>
        <h1 className={classes.heading}>{`${tableTitle}`}</h1>
        <Grid container spacing={3}>
            { filters.detail !== 'All' && 
                <Grid item xs={3}>
                    <SideNav/>
                </Grid>            
            }
            <Grid item xs={filters.detail !== 'All' ? 9 : 12 }>
                { renderTable(resultDetail.activeButton) }
            </Grid> 
        </Grid>
    </Fragment>
  );
}