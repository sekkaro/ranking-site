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
  Input,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
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
  search: {
    float: "right",
  },
  // form: {
  //   display: "flex",
  // },
}));

const Players = ({ location }) => {
  const classes = useStyles();
  const history = useHistory();
  const queryParams = qs.parse(location.search);
  const page = parseInt(queryParams.page || 1);
  const { q } = queryParams;
  const { isLoading, players, error, count } = useSelector(
    (state) => state.players
  );
  const [keyword, setKeyword] = useState(q || "");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers(history, page, q));
  }, [dispatch, history, page, q]);

  const handlePageChange = (_, page) => {
    history.push({ search: qs.stringify({ ...queryParams, page }) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "keyword") {
      setKeyword(value);
    }
  };

  const onSearch = () => {
    history.push({ search: qs.stringify({ ...queryParams, q: keyword }) });
  };

  const onResetKeyword = () => {
    setKeyword("");
    history.push({
      search: qs.stringify({ ...queryParams, q: "" }),
    });
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
        <div className={classes.search}>
          <Input
            placeholder="Search name..."
            value={keyword}
            onChange={handleChange}
            name="keyword"
            endAdornment={
              keyword && (
                <InputAdornment position="end">
                  <IconButton onClick={onResetKeyword}>
                    <HighlightOffIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
          <Button onClick={onSearch}>
            <SearchIcon />
          </Button>
        </div>
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
          onChange={handlePageChange}
        />
      </TableContainer>
    </div>
  );
};

export default withRouter(Players);
