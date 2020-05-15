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
import { QUAL_RESULTS } from '../gql';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function QualifyingResultsTable() {
  const classes = useStyles();
  const { filters } = useContext(AppState);
  const { loading, error, data } = useQuery(QUAL_RESULTS, {
    variables: { season: filters.season }
  });
  if (loading) return (
    <Grid item xs={4} className={classes.root}>
      <CircularProgress size={20} className={classes.spinner} ></CircularProgress>
    </Grid>
  );
  if (error) return <p>Error :(</p>;
  const quals = data.qualifying[filters.detail] ? data.qualifying[filters.detail].QualifyingResults : null;  

  return (
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Pos</TableCell>
                    <TableCell align="left">No</TableCell>
                    <TableCell align="left">Driver</TableCell>
                    <TableCell align="left">Car</TableCell>
                    <TableCell align="left">Q1</TableCell>
                    <TableCell align="left">Q2</TableCell>
                    <TableCell align="left">Q3</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    quals &&
                    quals.map((result, row_i) => {                        
                        return (
                            <TableRow key={row_i}>
                                <TableCell align="left" component="th" scope="row">{result.position}</TableCell>
                                <TableCell align="left">{result.number}</TableCell>
                                <TableCell align="left">{`${result.Driver.givenName} ${result.Driver.familyName}`}</TableCell>
                                <TableCell align="left">{`${result.Constructor.name}`}</TableCell>
                                <TableCell align="left">{result.Q1 && `${result.Q1}`}</TableCell>
                                <TableCell align="left">{result.Q2 && `${result.Q2}`}</TableCell>
                                <TableCell align="left">{result.Q3 && `${result.Q3}`}</TableCell>
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>
  );
}