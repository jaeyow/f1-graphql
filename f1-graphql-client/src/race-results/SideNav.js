import React, { useContext } from 'react';
import useStyles from '../styles';
import AppState from '../AppState';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ToggleButton from '@material-ui/lab/ToggleButton';

export default function SideNav() {
    const classes = useStyles();
    const { resultDetail, setResultDetail } = useContext(AppState);

    const toggleResultButton = (result, resultName) => {
        setResultDetail({
            raceResults: {
                state: false,
                title: 'Race Results',
                visible: !result.visible
            },
            fastestLaps: {
                state: false,
                title: 'Fastest Laps',
                visible: !result.visible
            },
            qualifying: {
                state: false,
                title: 'Qualifying',
                visible: !result.visible
            },
            [resultName]: {
                state: result.state ? result.state : !result.state,
                title: result.title,
                visible: result.visible
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
                selected={resultDetail.qualifying.state}
                onChange={() => { toggleResultButton(resultDetail.qualifying, 'qualifying') }}>{resultDetail.qualifying.title}
            </ToggleButton>
        </ListItem>
    </List>
    );
  }