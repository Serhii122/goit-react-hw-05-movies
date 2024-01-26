import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/movieAPI';

import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { postId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/home');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(postId);
        setMovieDetails(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [postId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <div className={css.container}>
        <img src={posterUrl} alt={movieDetails.title} height="550" />
        <div className={css.details_container}>
          <h2 className={css.movie_title}>{movieDetails.title}</h2>
          <p>User Score: {movieDetails.vote_average}%</p>
          <h3>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <ul className={css.genre_list}>
            {movieDetails.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.info_container}>
        <h3 className={css.info_title}>Additional information</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        {/* <NavLink
        state={{ from: backLinkRef }}
         state={{ from: backLinkRef }}
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.active : ''}`
          }
          to="cast"
        >
          Cast
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.active : ''}`
          }
          to="reviews"
        >
          Reviews
        </NavLink> */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
