import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  fetchPopularMovies,
  incrementIfOdd,
  selectCount,
  selectStatus,
  selectMovieList,
  selectMovieListStatus,
} from "./counterSlice";
import styles from "./Counter.module.css";
import { LoadingButton } from "@mui/lab";
import { Movie } from "@mui/icons-material";

export const Counter = () => {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const movieList = useAppSelector(selectMovieList);
  const movieListStatus = useAppSelector(selectMovieListStatus);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
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

        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
      <div className={styles.row}>Status: {status}</div>
      <>Movie: {movieList}</>
    </div>
  );
};
