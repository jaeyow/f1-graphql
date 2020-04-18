import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, Link, ExpansionPanel,
  ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useQuery } from '@apollo/react-hooks';
import { RACES_LIST } from '../gql';
import useStyles from '../styles';

export default function RaceCards() {
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