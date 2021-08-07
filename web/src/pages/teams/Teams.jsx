import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useHistory, withRouter } from "react-router-dom";
import {
  TableContainer,
  CircularProgress,
  makeStyles,
  Input,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  TableCell,
  TableRow,
  Select,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "../../components/alert/Alert";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import {
  addTeam,
  changeTeam,
  fetchLeagueNames,
  fetchTeams,
  removeTeam,
} from "./teamsAction";
import CustomTable from "../../components/table/CustomTable";
import { limit } from "../../constants";

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

const Teams = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isLoading,
    isAddLoading,
    isLeagueLoading,
    teams,
    error,
    leagues,
    count,
    addError,
    isEditLoading,
    editError,
    leagueError,
    isDeleteLoading,
    deleteError,
  } = useSelector((state) => state.teams);
  const queryParams = qs.parse(location.search);
  const page = parseInt(queryParams.page || 1);
  const { q } = queryParams;
  const [keyword, setKeyword] = useState(q || "");
  const [team, setTeam] = useState({
    name: "",
    league: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams(page, q));
  }, [dispatch, page, q]);

  useEffect(() => {
    dispatch(fetchLeagueNames());
  }, [dispatch]);

  const handlePageChange = (_, page) => {
    history.push({ search: qs.stringify({ ...queryParams, page }) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "keyword") {
      setKeyword(value);
    } else {
      setTeam((team) => ({ ...team, [name]: value }));
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
    if (isEdit && id) {
      dispatch(changeTeam(id, team, setTeam, setIsEdit, setAlertOpen));
    } else {
      dispatch(addTeam(team, setTeam, setAlertOpen)).then(() => {
        dispatch(fetchTeams(page, q));
      });
    }
  };

  const onEdit = (id, name, league) => {
    setIsEdit(true);
    setId(id);
    setTeam({ name, league });
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
          severity={
            addError || editError || deleteError || leagueError
              ? "error"
              : "success"
          }
        >
          {editError
            ? editError
            : addError
            ? addError
            : deleteError
            ? deleteError
            : leagueError
            ? leagueError
            : "정상 처리되었습니다"}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={dialogOpen}
        title="이 팀을 지우시겠습니까?"
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          setDialogOpen(false);
          dispatch(removeTeam(id, setAlertOpen)).then(() => {
            if (teams.length === 1 && page > 1) {
              handlePageChange(null, page - 1);
            } else {
              dispatch(fetchTeams(page, q));
            }
          });
        }}
      />
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
        <CustomTable
          isLoading={isLoading}
          fields={["#", "name", "league", ""]}
          data={teams}
          emptyMsg="팀이 없습니다"
          onEdit={onEdit}
          setId={setId}
          setDialogOpen={setDialogOpen}
          page={page}
          renderItem={({ items, idx }) => (
            <TableRow>
              <TableCell>{limit * (page - 1) + idx + 1}</TableCell>
              <TableCell component="th" scope="row">
                {items.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {items.league ? items.league.name : "-"}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    onEdit(items._id, items.name, items.league?._id);
                  }}
                >
                  <EditIcon />
                </IconButton>
                {isDeleteLoading ? (
                  <CircularProgress />
                ) : (
                  <IconButton
                    onClick={() => {
                      setDialogOpen(true);
                      setId(items._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          )}
        />
        <Pagination
          count={count}
          siblingCount={2}
          page={page}
          onChange={handlePageChange}
        />
      </TableContainer>
      <h3>팀 추가/수정</h3>
      <form style={{ display: "flex" }} onSubmit={onAdd}>
        <Input
          placeholder="Add team"
          value={team.name}
          onChange={handleChange}
          name="name"
          required
        />
        {isLeagueLoading ? (
          <CircularProgress />
        ) : (
          <Select
            name="league"
            value={team.league}
            onChange={handleChange}
            required
          >
            {leagues.map((league) => (
              <MenuItem key={league._id} value={league._id}>
                {league.name}
              </MenuItem>
            ))}
          </Select>
        )}
        {isAddLoading ? (
          <CircularProgress />
        ) : isEdit ? (
          <>
            {isEditLoading ? (
              <CircularProgress />
            ) : (
              <IconButton type="submit">
                <DoneIcon />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                setIsEdit(false);
                setTeam({
                  name: "",
                  league: "",
                });
                setId(null);
              }}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <IconButton type="submit">
            <AddIcon />
          </IconButton>
        )}
      </form>
    </div>
  );
};

export default withRouter(Teams);
