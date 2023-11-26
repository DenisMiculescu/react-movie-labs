import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'

const HomePage = (props) => {
  const [movies, setMovies] = useState([]);
  const watchlist = movies.filter(m => m.watchlist)
  localStorage.setItem('Watchlisted', JSON.stringify(watchlist))

  const addToWatchlist = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, watchlist: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      selectFavorite={addToWatchlist}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};
export default HomePage;