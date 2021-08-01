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
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { NavLink, useHistory, withRouter } from "react-router-dom";
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
  const { q, sort, type } = queryParams;
  const { isLoading, players, error, count } = useSelector(
    (state) => state.players
  );
  const [keyword, setKeyword] = useState(q || "");
  const [isGoalsClicked, setIsGoalsClicked] = useState(sort === "goals");
  const [isAssistsClicked, setIsAssistsClicked] = useState(sort === "assists");
  const [isAsc, setIsAsc] = useState(type === "asc");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers(history, page, q, sort, type));
  }, [dispatch, history, page, q, sort, type]);

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
    history.push({
      search: qs.stringify({ ...queryParams, q: keyword, page: 1 }),
    });
  };

  const onResetKeyword = () => {
    setKeyword("");
    history.push({
      search: qs.stringify({ ...queryParams, q: "" }),
    });
  };

  const sortClickHandler = (key) => {
    let type = "desc";
    if (key === "goals") {
      setIsGoalsClicked(true);
      setIsAssistsClicked(false);
      if (isGoalsClicked) {
        setIsAsc((prev) => {
          if (!prev) {
            type = "asc";
          }
          return !prev;
        });
      } else {
        setIsAsc(false);
      }
      history.push({
        search: qs.stringify({ ...queryParams, sort: key, type }),
      });
    } else {
      setIsAssistsClicked(true);
      setIsGoalsClicked(false);
      if (isAssistsClicked) {
        setIsAsc((prev) => {
          if (!prev) {
            type = "asc";
          }
          return !prev;
        });
      } else {
        setIsAsc(false);
      }
      history.push({
        search: qs.stringify({ ...queryParams, sort: key, type }),
      });
    }
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
              <TableCell>
                <Button
                  style={{ backgroundColor: "transparent" }}
                  disableRipple
                  onClick={() => sortClickHandler("goals")}
                  endIcon={
                    isGoalsClicked ? (
                      isAsc ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )
                    ) : null
                  }
                >
                  Goals
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  style={{ backgroundColor: "transparent" }}
                  disableRipple
                  onClick={() => sortClickHandler("assists")}
                  endIcon={
                    isAssistsClicked ? (
                      isAsc ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )
                    ) : null
                  }
                >
                  Assists
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((p, idx) => (
              <TableRow key={p._id}>
                <TableCell>{limit * (page - 1) + idx + 1}</TableCell>
                <TableCell component="th" scope="row">
                  <NavLink to={`/players/${p._id}`}>{p.name}</NavLink>
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
