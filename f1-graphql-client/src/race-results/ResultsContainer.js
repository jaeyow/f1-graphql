import React, { useContext, Fragment } from 'react';
import AppState from '../AppState';
import useStyles from '../styles';
import SideNav from './SideNav';
import Grid from '@material-ui/core/Grid';
import RaceResultsTable from './RaceResultsTable';
import CircuitResultsTable from './CircuitResultsTable';

export default function ResultsContainer({races}) {
  const classes = useStyles();
  const { filters, resultDetail } = useContext(AppState);
  const tableTitle = resultDetail.activeButton === 'Season Race Results' ?
  `Formula 1 - ${filters.season} Season Race Results` : `Formula 1 - ${filters.season} ${races[filters.detail].raceName} - Race Results`;

  const renderTable = (param) => {
    switch(param) {
      case 'Race Results':
        return <CircuitResultsTable races={races}/>;
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