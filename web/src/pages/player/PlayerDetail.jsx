import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  CardContent,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { fetchPlayerDetail } from "./playerDetailAction";

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

const PlayerDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { player, isLoading } = useSelector((state) => state.playerDetail);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchPlayerDetail(history, id));
  }, [dispatch, history, id]);

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="edit">
                <DeleteIcon />
              </IconButton>
            </>
          }
          title={player?.name}
          subheader={`${player?.age}, ${player?.height}cm`}
        />
        <CardContent>
          <Typography>Matches played: {player?.matches}</Typography>
          <Typography>Goals scored: {player?.goals}</Typography>
          <Typography>Assists made: {player?.assists}</Typography>
          <Typography>Created by: {player?.creator?.name}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerDetail;
