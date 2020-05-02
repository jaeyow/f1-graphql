import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MAIN_RESULTS_V2 } from '../gql';
import useStyles from '../styles';
import AppState from '../AppState';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ToggleButton from '@material-ui/lab/ToggleButton';

export default function SideNav() {
    const classes = useStyles();
    const { filters, resultDetail, setResultDetail } = useContext(AppState);
    // const { loading, error, data } = useQuery(MAIN_RESULTS_V2, {
    //   variables: { season: filters.season }
    // });
  
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    const toggleResultButton = (result, resultName) => {
        setResultDetail({
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
            [resultName]: {
                state: !result.state,
                title: result.title
            },
            activeButton: result.title
        });
      };

    
  
    return (
    <List>
        <ListItem>
            <ToggleButton className={classes.resultsButtonWidth} 
                selected={resultDetail.raceResults.state}
                onChange={() => { toggleResultButton(resultDetail.raceResults, 'raceResults') }}>{resultDetail.raceResults.title}
            </ToggleButton>
        </ListItem>
        <ListItem>
            <ToggleButton className={classes.resultsButtonWidth}
                selected={resultDetail.fastestLaps.state}
                onChange={() => { toggleResultButton(resultDetail.fastestLaps, 'fastestLaps') }}>{resultDetail.fastestLaps.title}
            </ToggleButton>
        </ListItem>
        <ListItem>
            <ToggleButton className={classes.resultsButtonWidth}
                selected={resultDetail.startingGrid.state}
                onChange={() => { toggleResultButton(resultDetail.startingGrid, 'startingGrid') }}>{resultDetail.startingGrid.title}
            </ToggleButton>
        </ListItem>
        <ListItem>
            <ToggleButton className={classes.resultsButtonWidth}
                selected={resultDetail.qualifying.state}
                onChange={() => { toggleResultButton(resultDetail.qualifying, 'qualifying') }}>{resultDetail.qualifying.title}
            </ToggleButton>
        </ListItem>
        <ListItem>
            <ToggleButton className={classes.resultsButtonWidth}
                selected={resultDetail.pitStops.state}
                onChange={() => { toggleResultButton(resultDetail.pitStops, 'pitStops') }}>{resultDetail.pitStops.title}
            </ToggleButton>
        </ListItem>
        <ListItem>
            <ToggleButton className={classes.resultsButtonWidth}
                selected={resultDetail.practice1.state}
                onChange={() => { toggleResultButton(resultDetail.practice1, 'practice1') }}>{resultDetail.practice1.title}
            </ToggleButton>
        </ListItem>
        <ListItem>
            <ToggleButton className={classes.resultsButtonWidth}
                selected={resultDetail.practice2.state}
                onChange={() => { toggleResultButton(resultDetail.practice2, 'practice2') }}>{resultDetail.practice2.title}
            </ToggleButton>
        </ListItem>
        <ListItem>
            <ToggleButton className={classes.resultsButtonWidth}
                selected={resultDetail.practice3.state}
                onChange={() => { toggleResultButton(resultDetail.practice3, 'practice3') }}>{resultDetail.practice3.title}
            </ToggleButton>
        </ListItem>
    </List>
    );
  }