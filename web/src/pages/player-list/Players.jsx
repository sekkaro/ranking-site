import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  CircularProgress,
  makeStyles,
  TableRow,
} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import qs from "query-string";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayers } from "./playersAction";
import { limit } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    width: "80%",
  },
}));

const Players = ({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  const queryParams = qs.parse(location.search);
  const page = parseInt(queryParams.page || 1);
  const { isLoading, players, error, count } = useSelector(
    (state) => state.players
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers(page));
  }, [dispatch, page]);

  const handleChange = (_, page) => {
    history.push({ search: qs.stringify({ ...queryParams, page }) });
  };

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Goals</TableCell>
              <TableCell>Assists</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((p, idx) => (
              <TableRow key={p._id}>
                <TableCell>{limit * (page - 1) + idx + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {p.name}
                </TableCell>
                <TableCell>{p.goals}</TableCell>
                <TableCell>{p.assists}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={count}
          siblingCount={2}
          // defaultPage={1}
          page={page}
          onChange={handleChange}
        />
      </TableContainer>
    </div>
  );
};

export default withRouter(Players);
