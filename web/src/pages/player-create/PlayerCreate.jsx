import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  makeStyles,
  MenuItem,
  CircularProgress,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { birthdayRegex } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrEditPlayer,
  fetchPositionNames,
  fetchTeamNames,
} from "./playerCreateAction";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { clearTeamNames } from "./playerCreateSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "40%",
    minWidth: 300,
  },
  button: {
    width: "20%",
    minWidth: 50,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },
}));

const PlayerCreate = ({ location }) => {
  const classes = useStyles();
  const { id } = useParams();
  const { player } = location.state;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    shouldUnregister: false,
  });
  const {
    positions,
    isLoading,
    isPositionsLoading,
    positionsError,
    teams,
    isTeamsLoading,
    teamsError,
  } = useSelector((state) => state.playerCreate);
  const dispatch = useDispatch();
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(addOrEditPlayer(history, data, id));
  };

  useEffect(() => {
    dispatch(fetchPositionNames());
  }, [dispatch]);

  useEffect(() => {
    if (!keyword) {
      dispatch(clearTeamNames());
    }
  }, [dispatch, keyword]);

  // useEffect(() => {
  //   if (keyword) {
  //     dispatch(fetchTeamNames(keyword));
  //   } else {
  //     dispatch(clearTeamNames());
  //   }
  // }, [dispatch, keyword]);

  return (
    <div className={classes.root}>
      <h2>?????? {id ? "??????" : "??????"}</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                className={classes.input}
                label="?????? *"
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
              />
              {errors?.name?.message && (
                <span style={{ color: "red" }}>{errors?.name?.message}</span>
              )}
            </>
          )}
          name="name"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
          }}
          defaultValue={id ? player?.name : ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                className={classes.input}
                label="????????? *"
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
              />
              {errors?.number?.message && (
                <span style={{ color: "red" }}>{errors?.number?.message}</span>
              )}
            </>
          )}
          name="number"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
            validate: (value) =>
              (!isNaN(value) && parseInt(value) > 0 && parseInt(value) < 100) ||
              "1?????? 99????????? ????????? ??????????????????.",
          }}
          defaultValue={id ? player?.number : ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <>
              <Autocomplete
                options={teams}
                // onSelect={() => dispatch(clearTeamNames())}
                getOptionSelected={(option) => option?._id || ""}
                getOptionLabel={(option) => option?.name || ""}
                style={{ width: 300 }}
                value={value}
                onBlur={onBlur}
                onChange={(e, value) => onChange(value)}
                inputValue={keyword}
                onInputChange={(e, value) => setKeyword(value)}
                renderInput={(params) => (
                  <div style={{ display: "flex" }}>
                    <TextField {...params} label="??? *" variant="outlined" />
                    <IconButton
                      onClick={() => {
                        if (keyword) {
                          dispatch(fetchTeamNames(keyword));
                        }
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </div>
                )}
                renderOption={(option) => <>{option.name}</>}
                noOptionsText="????????? ??? ????????? ????????????."
                loading={isTeamsLoading}
              />
              {errors?.team?.message && (
                <span style={{ color: "red" }}>{errors?.team?.message}</span>
              )}
            </>
          )}
          name="team"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
          }}
          defaultValue={id ? player?.team : ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                select
                label="????????? *"
                className={classes.input}
                onBlur={onBlur}
                value={value}
                onChange={(value) => onChange(value)}
              >
                {isPositionsLoading ? (
                  <CircularProgress />
                ) : (
                  positions.map((position) => (
                    <MenuItem key={position._id} value={position._id}>
                      {position.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
              {errors?.position?.message && (
                <span style={{ color: "red" }}>
                  {errors?.position?.message}
                </span>
              )}
            </>
          )}
          name="position"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
          }}
          defaultValue={id ? player?.position?._id : ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                className={classes.input}
                label="???????????? *"
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
              />
              {errors?.birthday?.message && (
                <span style={{ color: "red" }}>
                  {errors?.birthday?.message}
                </span>
              )}
            </>
          )}
          name="birthday"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
            pattern: {
              value: birthdayRegex,
              message: "???????????? 8????????? ??????????????????",
            },
          }}
          defaultValue={id ? player?.birthday : ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                className={classes.input}
                label="?????? *"
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
              />
              {errors?.age?.message && (
                <span style={{ color: "red" }}>{errors?.age?.message}</span>
              )}
            </>
          )}
          name="age"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
          }}
          defaultValue={id ? player?.age : ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                className={classes.input}
                label="??? *"
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
              />
              {errors?.height?.message && (
                <span style={{ color: "red" }}>{errors?.height?.message}</span>
              )}
            </>
          )}
          name="height"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
          }}
          defaultValue={id ? player?.height : ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                className={classes.input}
                label="?????? *"
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
              />
              {errors?.origin?.message && (
                <span style={{ color: "red" }}>{errors?.origin?.message}</span>
              )}
            </>
          )}
          name="origin"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
          }}
          defaultValue={id ? player?.origin : ""}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextField
                className={classes.input}
                label="????????? *"
                onBlur={onBlur}
                onChange={(value) => onChange(value)}
                value={value}
              />
              {errors?.weight?.message && (
                <span style={{ color: "red" }}>{errors?.weight?.message}</span>
              )}
            </>
          )}
          name="weight"
          rules={{
            required: {
              value: true,
              message: "?????? ???????????????.",
            },
          }}
          defaultValue={id ? player?.weight : ""}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div style={{ display: "flex" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {id ? "??????" : "??????"}
            </Button>
            {id && (
              <Button
                variant="contained"
                onClick={() => history.goBack()}
                className={classes.button}
              >
                ??????
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default withRouter(PlayerCreate);
