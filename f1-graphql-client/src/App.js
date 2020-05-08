import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { SeasonsFilter, CategoriesFilter, DetailsFilter } from './filters';
import AppState from './AppState';
import useStyles from './styles';
import { RaceCards } from './cards';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
 
const client = new ApolloClient({
  // uri: 'http://localhost:4000', // local dev
  uri: 'https://kc4uqd938e.execute-api.us-east-1.amazonaws.com/dev/graphql', // apollo graphql lambda
  connectToDevTools: true
});

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#e10600'
      }
    },
});

function AppStateProvider(props) {
  const [filters, setFilters] = useState(
    {
      season: '2019',
      category: 'Races',
      detail: 'All'
    }
  );

  const [resultDetail, setResultDetail] = useState(
    {
      raceResults: {
        state: false,
        title: 'Race Results'
      },
      fastestLaps: {
        state: false,
        title: 'Fastest Laps'
      },
      startingGrid: {
        state: false,
        title: 'Starting Grid'
      },
      qualifying: {
        state: false,
        title: 'Qualifying'
      },
      pitStops: {
        state: false,
        title: 'Pit Stops'
      },
      practice1: {
        state: false,
        title: 'Practice 1'
      },
      practice2: {
        state: false,
        title: 'Practice 2'
      },
      practice3: {
        state: false,
        title: 'Practice 3'
      },
      activeButton: 'Season Race Results'
    }
  );

  return (
    <AppState.Provider value={{ filters, setFilters, resultDetail, setResultDetail }}>
      { props.children }
    </AppState.Provider>
  );
}

function App() {
  const classes = useStyles();

  return (
    <AppStateProvider>
      <MuiThemeProvider theme={theme}>
        <Container className={classes.root}>
          <ApolloProvider client={client}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Formula 1 GraphQL Client
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid container spacing={3} className={classes.seasonFilter}>
              <SeasonsFilter/>
              <CategoriesFilter/>
              <DetailsFilter/>
            </Grid>
            <RaceCards />
          </ApolloProvider>
        </Container>
      </MuiThemeProvider>
    </AppStateProvider>
  );
}

export default App;
