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
 
const client = new ApolloClient({
  // uri: 'http://localhost:4000', // local dev
  uri: 'https://kc4uqd938e.execute-api.us-east-1.amazonaws.com/dev/graphql', // apollo graphql lambda
  connectToDevTools: true
});

function AppStateProvider(props) {
  const [filters, setFilters] = useState(
    {
      season: '2019',
      category: 'Races',
      detail: 'All'
    }
  );

  return (
    <AppState.Provider value={{ filters, setFilters }}>
      { props.children }
    </AppState.Provider>
  );
}

function App() {
  const classes = useStyles();

  return (
    <AppStateProvider>
      <Container className={classes.root}>
        <ApolloProvider client={client}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Formula 1 GraphQL Picker
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
    </AppStateProvider>
  );
}

export default App;
