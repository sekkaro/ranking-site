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
// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { NavLink, useHistory, withRouter } from "react-router-dom";
import qs from "query-string";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlayers } from "./playersAction";
import { limit } from "../../constants";
import CustomTable from "../../components/table/CustomTable";

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
  const { n, num } = queryParams;
  const { isLoading, players, error, count } = useSelector(
    (state) => state.players
  );
  const [name, setName] = useState(n || "");
  const [number, setNumber] = useState(num || "");
  // const [isGoalsClicked, setIsGoalsClicked] = useState(sort === "goals");
  // const [isAssistsClicked, setIsAssistsClicked] = useState(sort === "assists");
  // const [isAsc, setIsAsc] = useState(type === "asc");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchPlayers(page, q, sort, type));
  // }, [dispatch, page, q, sort, type]);

  useEffect(() => {
    dispatch(fetchPlayers(page, n, num));
  }, [dispatch, page, n, num]);

  const handlePageChange = (_, page) => {
    history.push({ search: qs.stringify({ ...queryParams, page }) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if(name === "number") {
      setNumber(value);
    }
  };

  const onSearch = () => {
    history.push({
      search: qs.stringify({ ...queryParams, n: name, num: number, page: 1 }),
    });
  };

  const onResetName = () => {
    setName("");
    history.push({
      search: qs.stringify({ ...queryParams, n: "" }),
    });
  };

  const onResetNumber = () => {
    setNumber("");
    history.push({
      search: qs.stringify({ ...queryParams, num: "" }),
    });
  };

  // const sortClickHandler = (key) => {
  //   let type = "desc";
  //   if (key === "goals") {
  //     setIsGoalsClicked(true);
  //     setIsAssistsClicked(false);
  //     if (isGoalsClicked) {
  //       setIsAsc((prev) => {
  //         if (!prev) {
  //           type = "asc";
  //         }
  //         return !prev;
  //       });
  //     } else {
  //       setIsAsc(false);
  //     }
  //     history.push({
  //       search: qs.stringify({ ...queryParams, sort: key, type }),
  //     });
  //   } else {
  //     setIsAssistsClicked(true);
  //     setIsGoalsClicked(false);
  //     if (isAssistsClicked) {
  //       setIsAsc((prev) => {
  //         if (!prev) {
  //           type = "asc";
  //         }
  //         return !prev;
  //       });
  //     } else {
  //       setIsAsc(false);
  //     }
  //     history.push({
  //       search: qs.stringify({ ...queryParams, sort: key, type }),
  //     });
  //   }
  // };

  // if (isLoading) {
  //   return (
  //     <div className={classes.root}>
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <div className={classes.search}>
          <Input
            placeholder="이름"
            value={name}
            onChange={handleChange}
            name="name"
            endAdornment={
              name && (
                <InputAdornment position="end">
                  <IconButton onClick={onResetName}>
                    <HighlightOffIcon />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
          <Input
            placeholder="등번호"
            value={number}
            onChange={handleChange}
            name="number"
            endAdornment={
              number && (
                <InputAdornment position="end">
                  <IconButton onClick={onResetNumber}>
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
        <CustomTable
          isLoading={isLoading}
          fields={["#", "소속리그", "팀", "이름", "등번호"]}
          data={players}
          emptyMsg="선수가 없습니다"
          renderItem={({ items, idx }) => (
            <TableRow key={items._id}>
              <TableCell>{limit * (page - 1) + idx + 1}</TableCell>
              <TableCell>{items?.team?.league?.name}</TableCell>
              <TableCell>{items.team?.name}</TableCell>
              <TableCell component="th" scope="row">
                <NavLink to={`/players/${items._id}`}>{items.name}</NavLink>
              </TableCell>
              <TableCell>{items.number}</TableCell>
            </TableRow>
          )}
        />
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>소속리그</TableCell>
              <TableCell>
                팀
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
                이름
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
              <TableCell>등번호</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((p, idx) => (
              <TableRow key={p._id}>
                <TableCell>{limit * (page - 1) + idx + 1}</TableCell>
                <TableCell>{p?.team?.league?.name}</TableCell>
                <TableCell>{p?.team?.name}</TableCell>
                <TableCell component="th" scope="row">
                  <NavLink to={`/players/${p._id}`}>{p.name}</NavLink>
                </TableCell>
                <TableCell>{p.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
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
