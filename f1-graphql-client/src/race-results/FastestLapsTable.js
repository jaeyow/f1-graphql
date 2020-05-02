import React, { useContext, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from '../styles';

export default function FastestLapsTable({races}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Grand Prix</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Winner</TableCell>
                    <TableCell align="left">Car</TableCell>
                    <TableCell align="left">Laps</TableCell>
                    <TableCell align="left">Time</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    races.map(({raceName, date, Results}, row_i) => (
                    <TableRow key={row_i}>
                        <TableCell align="left" component="th" scope="row">{raceName}</TableCell>
                        <TableCell align="left">{date}</TableCell>
                        <TableCell align="left">{`${Results[0].Driver.givenName} ${Results[0].Driver.familyName}`}</TableCell>
                        <TableCell align="left">{`${Results[0].Constructor.name}`}</TableCell>
                        <TableCell align="left">{`${Results[0].laps}`}</TableCell>
                        <TableCell align="left">{`${Results[0].Time.time}`}</TableCell>
                    </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
  );
}