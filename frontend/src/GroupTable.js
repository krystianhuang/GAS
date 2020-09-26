import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(studentid, firstname, lastname, developertype, language) {
  return { studentid, firstname, lastname, developertype, language };
}

const rows = [
  createData("13372558", "Mathew", "Abbou", "Frontend", "Java"),
  createData("13843847", "James", "Adams", "Backend", "Python"),
  createData("19873425", "Jamie", "Smith", "Frontend/Backend", "MongoDB"),
  createData("14375846", "Colin", "Frank", "None", "UX Designer"),
  createData("15647384", "Frank", "Smith", "Frontend", "HTML/CSS"),
  createData("12837493", "Smith", "Sam", "Backend", "Python/MongoDB"),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Developer Type</TableCell>
            <TableCell align="right">Language</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.studentid}
              </TableCell>
              <TableCell align="right">{row.firstname}</TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.developertype}</TableCell>
              <TableCell align="right">{row.language}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
