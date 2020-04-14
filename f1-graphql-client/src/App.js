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
import { Container, Link, ExpansionPanel,
  ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useQuery } from '@apollo/react-hooks';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const RACES_LIST = gql`
  query {
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
    flexShrink: 0
  },
  option: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '90%',
  },
}));

function App() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    filter1: '',
    filter2: '',
    filter3: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Container className={classes.root}>
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
      
      
      <Grid container spacing={3}>
        <Grid item xs={4} className={classes.option}>
            <FormControl className={classes.formControl}>
              <Select
                value={state.filter1}
                onChange={handleChange}
                inputProps={{
                  name: 'filter1'
                }}>
                <option value='2017' className={classes.option}>2017</option>
                <option value='2018' className={classes.option}>2018</option>
                <option value='2019' className={classes.option}>2019</option>
              </Select>
            </FormControl>
        </Grid>
        <Grid item xs={4} className={classes.option}>
          <FormControl className={classes.formControl}>
            <Select
              value={state.filter2}
              onChange={handleChange}
              inputProps={{
                name: 'filter2'
              }}>
              <option value='Races' className={classes.option}>Races</option>
              <option value='Drivers' className={classes.option}>Drivers</option>
              <option value='Teams' className={classes.option}>Teams</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} className={classes.option}>
          <FormControl className={classes.formControl}>
            <Select
              value={state.filter3}
              onChange={handleChange}
              inputProps={{
                name: 'filter3'
              }}>
              <option value='Option1' className={classes.option}>Option1</option>
              <option value='Option2' className={classes.option}>Option2</option>
              <option value='Option3' className={classes.option}>Option3</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <ApolloProvider client={client}>
        <RaceCards />
      </ApolloProvider>
    </Container>
  );
}

function RaceCards() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(RACES_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
  <Container className={classes.root}>
  {
    data.races.map((race, race_i) => (
      <ExpansionPanel className={classes.raceCell} key={race_i}>
        <ExpansionPanelSummary className={classes.summaryCell}
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${race_i+1}a-content`}
          id={`panel${race_i+1}a-header`}>
          <Typography className={classes.heading}>{`Round ${race.round}: ${race.raceName}`}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <Link href={`${race.Circuit.url}`} target="_blank">
              {`${race.Circuit.circuitName}`}
            </Link>
            <Typography>
              {`${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`}
            </Typography>
            <Typography>
              {`Date: ${race.date}`}
            </Typography>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      ))
    }
  </Container>
  );
}

export default App;
