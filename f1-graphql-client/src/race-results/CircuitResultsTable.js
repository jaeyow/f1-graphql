import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from '../styles';
import AppState from '../AppState';

export default function CircuitResultsTable({races}) {
  const classes = useStyles();
  const { filters } = useContext(AppState);

  return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Pos</TableCell>
                    <TableCell align="left">No</TableCell>
                    <TableCell align="left">Driver</TableCell>
                    <TableCell align="left">Car</TableCell>
                    <TableCell align="left">Laps</TableCell>
                    <TableCell align="left">Time/Retired</TableCell>
                    <TableCell align="left">Pts</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    races[filters.detail].Results.map((result, row_i) => (
                    <TableRow key={row_i}>
                        <TableCell align="left" component="th" scope="row">{result.position}</TableCell>
                        <TableCell align="left">{`${result.number}`}</TableCell>
                        <TableCell align="left">{`${result.Driver.givenName} ${result.Driver.familyName}`}</TableCell>
                        <TableCell align="left">{`${result.Constructor.name}`}</TableCell>
                        <TableCell align="left">{`${result.laps}`}</TableCell>
                        <TableCell align="left">{result.Time !== null ? `${result.Time.time}` : 
                          result.status.includes('+') ? result.status : `DNF - ${result.status}`}</TableCell>
                        <TableCell align="left">{`${result.points}`}</TableCell>
                    </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
  );
}