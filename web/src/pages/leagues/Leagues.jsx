import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useHistory, withRouter } from "react-router-dom";
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
  Snackbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { addLeague, fetchLeagues } from "./leaguesAction";
import { limit } from "../../constants";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "../../components/alert/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
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

const Leagues = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, isAddLoading, leagues, error, count, addError } =
    useSelector((state) => state.leagues);
  const queryParams = qs.parse(location.search);
  const page = parseInt(queryParams.page || 1);
  const { q } = queryParams;
  const [keyword, setKeyword] = useState(q || "");
  const [name, setName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLeagues(page, q));
  }, [dispatch, page, q]);

  const handlePageChange = (_, page) => {
    history.push({ search: qs.stringify({ ...queryParams, page }) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "keyword") {
      setKeyword(value);
    } else if (name === "name") {
      setName(value);
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

  const onAdd = (e) => {
    e.preventDefault();
    dispatch(addLeague(name, setName, setAlertOpen));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={addError ? "error" : "success"}
        >
          {addError ? addError : "추가되었습니다"}
        </Alert>
      </Snackbar>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={limit}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              leagues.map((p, idx) => (
                <TableRow key={p._id}>
                  <TableCell>{limit * (page - 1) + idx + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {p.name}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Pagination
          count={count}
          siblingCount={2}
          page={page}
          onChange={handlePageChange}
        />
      </TableContainer>
      <h3>리그 추가/수정</h3>
      <form style={{ display: "flex" }} onSubmit={onAdd}>
        <Input
          placeholder="Add league"
          value={name}
          onChange={handleChange}
          name="name"
          required
        />
        {isAddLoading ? (
          <CircularProgress />
        ) : (
          <IconButton type="submit">
            <AddIcon />
          </IconButton>
        )}
      </form>
    </div>
  );
};

export default withRouter(Leagues);
