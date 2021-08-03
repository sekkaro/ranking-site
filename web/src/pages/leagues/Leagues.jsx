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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeague,
  changeLeague,
  fetchLeagues,
  removeLeague,
} from "./leaguesAction";
import { limit } from "../../constants";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "../../components/alert/Alert";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";

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
  const {
    isLoading,
    isAddLoading,
    leagues,
    error,
    count,
    addError,
    isEditLoading,
    editError,
    isDeleteLoading,
    deleteError,
  } = useSelector((state) => state.leagues);
  const queryParams = qs.parse(location.search);
  const page = parseInt(queryParams.page || 1);
  const { q } = queryParams;
  const [keyword, setKeyword] = useState(q || "");
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    if (isEdit && id) {
      dispatch(changeLeague(id, name, setName, setIsEdit, setAlertOpen));
    } else {
      dispatch(addLeague(name, setName, setAlertOpen));
      dispatch(fetchLeagues(page, q));
    }
  };

  const onEdit = (id, name) => {
    setIsEdit(true);
    setId(id);
    setName(name);
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
          severity={addError || editError || deleteError ? "error" : "success"}
        >
          {editError
            ? editError
            : addError
            ? addError
            : deleteError
            ? deleteError
            : "정상 처리되었습니다"}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        open={dialogOpen}
        title="이 리그를 지우시겠습니까?"
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          setDialogOpen(false);
          dispatch(removeLeague(id, setAlertOpen));
          dispatch(fetchLeagues(page, q));
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell rowSpan={limit} colSpan={limit}>
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
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        onEdit(p._id, p.name);
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
                          setId(p._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
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
                setName("");
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

export default withRouter(Leagues);
