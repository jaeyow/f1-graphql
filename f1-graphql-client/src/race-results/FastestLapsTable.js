import React, { useContext, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from '../styles';
import AppState from '../AppState';

export default function FastestLapsTable({races}) {
  const classes = useStyles();
  const { filters } = useContext(AppState);
  const fastestLaps = races[filters.detail].Results.sort((a, b) => {
    return a.FastestLap.rank - b.FastestLap.rank;
  });

  return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Pos</TableCell>
                    <TableCell align="left">No</TableCell>
                    <TableCell align="left">Driver</TableCell>
                    <TableCell align="left">Car</TableCell>
                    <TableCell align="left">Lap</TableCell>
                    <TableCell align="left">Time</TableCell>
                    <TableCell align="left">Ave speed</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    fastestLaps.map((result, row_i) => (
                    <TableRow key={row_i}>
                        <TableCell align="left" component="th" scope="row">{result.FastestLap.rank}</TableCell>
                        <TableCell align="left">{result.number}</TableCell>
                        <TableCell align="left">{`${result.Driver.givenName} ${result.Driver.familyName}`}</TableCell>
                        <TableCell align="left">{`${result.Constructor.name}`}</TableCell>
                        <TableCell align="left">{`${result.FastestLap.lap}`}</TableCell>
                        <TableCell align="left">{`${result.FastestLap.Time.time}`}</TableCell>
                        <TableCell align="left">{`${result.FastestLap.AverageSpeed.speed} ${result.FastestLap.AverageSpeed.units}`}</TableCell>
                    </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
  );
}