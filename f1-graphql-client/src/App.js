import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider } from '@apollo/react-hooks';
import { Container, Button } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const RACES_LIST = gql`
  {
    races {
      season
      round
      url
      raceName
      date
      time
      Circuit {
        circuitId
        url
        circuitName
      }
      Results {
        number
        position
        positionText
        points
        grid
        laps
        status
        Driver {
          driverId
          permanentNumber
          code
          url
          givenName
          familyName
          dateOfBirth
          nationality
        }
        Constructor {
          constructorId
          url
          name
          nationality
        }
        Time {
          millis
          time
        }
        FastestLap {
          rank
          lap
          Time {
            millis
            time
          }
          AverageSpeed {
            units
            speed
          }
        }
      }
    }
  }
`;

const RACES_SHORTLIST = gql`
  {
    races {
      season
      round
      url
      raceName
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  
  const testFetch = () => {
    client
    .query({
      query: RACES_SHORTLIST
    })
    .then(result => console.log(result));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            F1 GraphQL
          </Typography>
        </Toolbar>
      </AppBar>
      <ApolloProvider client={client}>
          <Container>
            <RaceCards />
            <Button variant="contained" color="primary" onClick={testFetch}>
              Fetch races
            </Button>
          </Container>
        </ApolloProvider>
    </div>
  );
}

function RaceCards() {
  
  const { loading, error, data } = useQuery(RACES_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.races.map((race, race_i) => (
    <div key={race_i}>
      <p>
        {`Round ${race.round}: ${race.raceName}`}
      </p>
    </div>
  ));
}

export default App;
