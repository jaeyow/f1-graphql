import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppState from '../AppState';
import useStyles from '../styles';

export default function RaceResultsTable({races}) {
  const classes = useStyles();
  const { filters } = useContext(AppState);

  return (
    <TableContainer component={Paper}>
        <h1 className={classes.heading}>{`${filters.season} Race Results`}</h1>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Grand Prix</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Winner</TableCell>
            <TableCell align="right">Car</TableCell>
            <TableCell align="right">Laps</TableCell>
            <TableCell align="right">Time</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                races.map(({raceName, date, Results}, row_i) => (
                <TableRow key={row_i}>
                    <TableCell component="th" scope="row">{raceName}</TableCell>
                    <TableCell align="right">{date}</TableCell>
                    <TableCell align="right">{`${Results[0].Driver.givenName} ${Results[0].Driver.familyName}`}</TableCell>
                    <TableCell align="right">{`${Results[0].Constructor.name}`}</TableCell>
                    <TableCell align="right">{`${Results[0].laps}`}</TableCell>
                    <TableCell align="right">{`${Results[0].Time.time}`}</TableCell>
                </TableRow>
                ))
            }
        </TableBody>
        </Table>
    </TableContainer>
  );
}