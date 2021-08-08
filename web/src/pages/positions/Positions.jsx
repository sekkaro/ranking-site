import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useHistory, withRouter } from "react-router-dom";
import {
  TableContainer,
  TableCell,
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
  addPosition,
  changePosition,
  fetchPositions,
  removePosition,
} from "./positionsAction";
import { limit } from "../../constants";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "../../components/alert/Alert";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import CustomTable from "../../components/table/CustomTable";

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

const Positions = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isLoading,
    isAddLoading,
    positions,
    error,
    count,
    addError,
    isEditLoading,
    editError,
    isDeleteLoading,
    deleteError,
  } = useSelector((state) => state.positions);
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
    dispatch(fetchPositions(page, q));
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
      dispatch(changePosition(id, name, setName, setIsEdit, setAlertOpen));
    } else {
      dispatch(addPosition(name, setName, setAlertOpen)).then(() => {
        dispatch(fetchPositions(page, q));
      });
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
        title="이 포지션을 지우시겠습니까?"
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          setDialogOpen(false);
          dispatch(removePosition(id, setAlertOpen)).then(() => {
            if (positions.length === 1 && page > 1) {
              handlePageChange(null, page - 1);
            } else {
              dispatch(fetchPositions(page, q));
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
          fields={["#", "name", ""]}
          data={positions}
          emptyMsg="포지션이 없습니다"
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
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    onEdit(items._id, items.name);
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
      <h3>포지션 추가/수정</h3>
      <form style={{ display: "flex" }} onSubmit={onAdd}>
        <Input
          placeholder="Add position"
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

export default withRouter(Positions);
