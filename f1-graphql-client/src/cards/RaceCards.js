import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { MAIN_RESULTS_V2 } from '../gql';
import useStyles from '../styles';
import AppState from '../AppState';
import ResultsContainer from '../race-results/ResultsContainer';

export default function RaceCards() {
    const classes = useStyles();
    const { filters } = useContext(AppState);
    const { loading, error, data } = useQuery(MAIN_RESULTS_V2, {
      variables: { season: filters.season }
    });
  
    if (loading) return null;

    if (error) return <p>Error :(</p>;
  
    return (
    <Container className={classes.root}>
        <ResultsContainer races={ data.raceResults } />
    </Container>
    );
  }