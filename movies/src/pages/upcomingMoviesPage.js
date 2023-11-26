import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import Tooltip from '@mui/material/Tooltip';

const UpcomingMoviesPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)
  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  
  
  const watchlist = movies.filter(m => m.watchlist)
  localStorage.setItem('watchlist', JSON.stringify(watchlist))
  const addToWatchlist = (movieId) => true

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      // selectWatchlist={addToWatchlist}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;