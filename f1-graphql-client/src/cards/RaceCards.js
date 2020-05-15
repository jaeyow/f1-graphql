import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from '../styles';
import ResultsContainer from '../race-results/ResultsContainer';

export default function RaceCards() {
    const classes = useStyles();
  
    return (
    <Container className={classes.root}>
        <ResultsContainer />
    </Container>
    );
  }