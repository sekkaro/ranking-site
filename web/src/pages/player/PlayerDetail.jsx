import React, { useEffect, useState } from "react";
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
import { deletePlayerDetail, fetchPlayerDetail } from "./playerDetailAction";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";

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
  const history = useHistory();
  const { id } = useParams();
  const { player, isLoading, isDeleteLoading, deleteError, error } =
    useSelector((state) => state.playerDetail);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPlayerDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (deleteError) {
      alert(deleteError);
    }
  }, [deleteError]);

  const editHandler = () => {
    history.push({
      pathname: `/players/${id}/edit`,
      state: { player },
    });
  };

  const deleteHandler = () => {
    setDialogOpen(true);
  };

  if (error) {
    return <div className={classes.root}>player not found</div>;
  }

  if (isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <ConfirmDialog
        open={dialogOpen}
        title="이 선수를 지우시겠습니까?"
        onClose={() => setDialogOpen(false)}
        onSuccess={() => {
          setDialogOpen(false);
          dispatch(deletePlayerDetail(id, history));
        }}
      />
      <Card className={classes.card}>
        <CardHeader
          action={
            <>
              <IconButton aria-label="edit" onClick={editHandler}>
                <EditIcon />
              </IconButton>
              {isDeleteLoading ? (
                <CircularProgress />
              ) : (
                <IconButton aria-label="delete" onClick={deleteHandler}>
                  <DeleteIcon />
                </IconButton>
              )}
            </>
          }
          title={player?.name}
          subheader={`${player?.age}, ${player?.height}cm ${player?.weight}kg`}
        />
        <CardContent>
          <Typography component="div">팀: {player?.team?.name}</Typography>
          <Typography component="div">등번호: {player?.number}</Typography>
          <Typography component="div">
            포지션: {player?.position?.name}
          </Typography>
          <Typography component="div">생년월일: {player?.birthday}</Typography>
          <Typography component="div">출신: {player?.origin}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerDetail;
