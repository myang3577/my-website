import { useState } from "react";

import { Movie } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import {
  decrement,
  fetchPopularMovies,
  increment,
  incrementByAmount,
  selectCount,
  selectMovieList,
  selectMovieListStatus,
  selectStatus
} from "../slices/CounterSlice";
import { useAppDispatch, useAppSelector } from "../store";
import styles from "./Counter.module.css";

export const Counter = () => {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const movieList = useAppSelector(selectMovieList);
  const movieListStatus = useAppSelector(selectMovieListStatus);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>Count: {count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>

        <LoadingButton
          loading={movieListStatus === "loading"}
          loadingPosition="start"
          startIcon={<Movie />}
          onClick={() => dispatch(fetchPopularMovies())}
          variant="outlined"
        >
          Fetch Movies
        </LoadingButton>
      </div>
      <div className={styles.row}>Status: {status}</div>
      <>Movie: {movieList}</>
    </>
  );
};
