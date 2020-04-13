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
import { Container, Link, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        Location {
          locality
          country
        }
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '20px 0px 60px 0px'
  },
  raceCell: {
    margin: '10px 0px'
  },
  summaryCell: {
    backgroundColor: '#EBF5FB'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    flexBasis: '80',
    flexShrink: 0,
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            2019 Formula 1 Constructor Results
          </Typography>
        </Toolbar>
      </AppBar>
      <ApolloProvider client={client}>
          <Container>
            <RaceCards />
          </Container>
        </ApolloProvider>
    </div>
  );
}

function RaceCards() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(RACES_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div className={classes.root}>
  {
    data.races.map((race, race_i) => (
        <ExpansionPanel className={classes.raceCell} key={race_i}>
          <ExpansionPanelSummary className={classes.summaryCell}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={`panel${race_i}a-header`}>
            <Typography className={classes.heading}>{`Round ${race.round}: ${race.raceName}`}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Link href={`${race.Circuit.url}`} target="_blank">
                {`${race.Circuit.circuitName}`}
              </Link>
              <div>
                {`${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`}
              </div>
              <div>
                {`Date: ${race.date}`}
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))
    }
  </div>
}

export default App;
