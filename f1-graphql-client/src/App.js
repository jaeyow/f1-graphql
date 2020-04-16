import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Container, Link, ExpansionPanel,
  ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useQuery } from '@apollo/react-hooks';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { RACES_LIST, SEASONS_LIST } from './gql/index';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

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
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '90%',
  },
  seasonFilter: {
    height: '50px',
  }
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
        <SeasonsFilter handleChange={handleChange} state={state}/>
        <Grid item xs={4} className={classes.option}>
          <FormControl className={classes.formControl}>
            <Select
              height='25%'
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

function SeasonsFilter(handleChange, state) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(SEASONS_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid item xs={4} className={classes.option}>
        <FormControl className={classes.formControl}>
          <Select
            height='25%'
            value={state.filter1}
            onChange={handleChange}
            inputProps={{
              name: 'filter1'
            }}>
              {
                data.seasons.map((season) => (
                    <option value={season.season} className={classes.option}>{season.season}</option>
                ))
              }
          </Select>
        </FormControl>
    </Grid>
  );
}

export default App;
