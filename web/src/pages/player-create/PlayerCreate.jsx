import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  makeStyles,
  Input,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { birthdayRegex } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayer,
  fetchPositionNames,
  fetchTeamNames,
} from "./playerCreateAction";
import { useHistory } from "react-router-dom";

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

const PlayerCreate = () => {
  const classes = useStyles();
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
    dispatch(addPlayer(history, data));
  };

  useEffect(() => {
    dispatch(fetchPositionNames());
  }, [dispatch]);

  useEffect(() => {
    keyword && dispatch(fetchTeamNames(keyword));
  }, [dispatch, keyword]);

  return (
    <div className={classes.root}>
      <h2>선수 생성</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                className={classes.input}
                placeholder="이름 *"
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
              message: "필수 항목입니다.",
            },
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                className={classes.input}
                placeholder="등번호 *"
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
              message: "필수 항목입니다.",
            },
            validate: (value) =>
              (!isNaN(value) && parseInt(value) > 0 && parseInt(value) < 100) ||
              "1부터 99까지의 숫자를 입력해주세요.",
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Autocomplete
                options={teams}
                getOptionSelected={(option) => option?._id || ""}
                getOptionLabel={(option) => option?.name || ""}
                style={{ width: 300 }}
                value={value}
                onChange={(e, value) => onChange(value)}
                inputValue={keyword}
                onInputChange={(e, value) => setKeyword(value)}
                renderInput={(params) => (
                  <TextField {...params} label="팀 *" variant="outlined" />
                )}
                renderOption={(option) => <>{option.name}</>}
                noOptionsText="검색한 팀 결과가 없습니다."
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
              message: "필수 항목입니다.",
            },
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Select
                className={classes.input}
                onBlur={onBlur}
                value={value}
                onChange={(value) => onChange(value)}
              >
                {isPositionsLoading ? (
                  <CircularProgress />
                ) : (
                  [{ _id: "default", name: "포지션 *" }, ...positions].map(
                    (position, idx) => (
                      <MenuItem
                        key={position._id}
                        value={position._id}
                        disabled={!idx}
                      >
                        {position.name}
                      </MenuItem>
                    )
                  )
                )}
              </Select>
              {errors?.position?.message && (
                <span style={{ color: "red" }}>
                  {errors?.position?.message}
                </span>
              )}
            </>
          )}
          name="position"
          rules={{
            validate: (value) => value !== "default" || "필수 항목입니다.",
          }}
          defaultValue="default"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                className={classes.input}
                placeholder="생년월일 *"
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
              message: "필수 항목입니다.",
            },
            pattern: {
              value: birthdayRegex,
              message: "생년월일 8자리를 입력해주세요",
            },
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                className={classes.input}
                placeholder="나이 *"
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
              message: "필수 항목입니다.",
            },
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                className={classes.input}
                placeholder="키 *"
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
              message: "필수 항목입니다.",
            },
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                className={classes.input}
                placeholder="출신 *"
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
              message: "필수 항목입니다.",
            },
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                className={classes.input}
                placeholder="몸무게 *"
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
              message: "필수 항목입니다.",
            },
          }}
          defaultValue=""
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            생성
          </Button>
        )}
      </form>
    </div>
  );
};

export default PlayerCreate;
