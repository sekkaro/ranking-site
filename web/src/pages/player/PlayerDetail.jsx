import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CardContent,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
  Input,
  Snackbar,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { editPlayer, fetchPlayerDetail } from "./playerDetailAction";
import Alert from "../../components/alert/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 700,
    height: 500,
  },
}));

const initialState = {
  player: {},
};

const reducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case "FETCH":
      return {
        player: action.data,
      };
    case "SET":
      return {
        player: {
          ...state.player,
          [action.name]: action.value,
        },
      };
    default:
      return state;
  }
};

const PlayerDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { player, isLoading, isEditLoading, editError } = useSelector(
    (state) => state.playerDetail
  );
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [state, playerDispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPlayerDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (player) {
      playerDispatch({ type: "FETCH", data: player });
    }
  }, [player]);

  useEffect(() => {
    if (editError) {
      alert(editError);
      playerDispatch({ type: "FETCH", data: player });
    }
  }, [editError, player]);

  const editHandler = () => {
    setIsEdit((prev) => !prev);
    if (isEdit) {
      dispatch(editPlayer(state.player, setOpen));
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          수정되었습니다!
        </Alert>
      </Snackbar>
      <Card className={classes.card}>
        <CardHeader
          action={
            <>
              {isEditLoading ? (
                <CircularProgress />
              ) : (
                <IconButton aria-label="edit" onClick={editHandler}>
                  {isEdit ? <DoneIcon /> : <EditIcon />}
                </IconButton>
              )}
              <IconButton
                aria-label="delete"
                onClick={() => {
                  if (isEdit) {
                    setIsEdit(false);
                  }
                }}
              >
                {isEdit ? <CloseIcon /> : <DeleteIcon />}
              </IconButton>
            </>
          }
          title={player?.name}
          subheader={`${player?.age}, ${player?.height}cm`}
        />
        <CardContent>
          <Typography component="div">
            Matches played:{" "}
            {isEdit ? (
              <Input
                value={state.player?.matches}
                name="matches"
                onChange={(e) =>
                  playerDispatch({
                    type: "SET",
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
              />
            ) : (
              state.player?.matches
            )}
          </Typography>
          <Typography component="div">
            Goals scored:{" "}
            {isEdit ? (
              <Input
                value={state.player?.goals}
                name="goals"
                onChange={(e) =>
                  playerDispatch({
                    type: "SET",
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
              />
            ) : (
              state.player?.goals
            )}
          </Typography>
          <Typography component="div">
            Assists made:{" "}
            {isEdit ? (
              <Input
                value={state.player?.assists}
                name="assists"
                onChange={(e) =>
                  playerDispatch({
                    type: "SET",
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
              />
            ) : (
              state.player?.assists
            )}
          </Typography>
          <Typography>Created by: {player?.creator?.name}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerDetail;
