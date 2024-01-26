import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from 'services/movieAPI';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { postId } = useParams(null);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const credits = await getMovieCredits(postId);
        setCast(credits.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      }
    };

    if (postId) {
      fetchMovieCredits();
    }
  }, [postId]);

  if (!postId) {
    return <div>No cast information available</div>;
  }

  return (
    <div>
      <ul>
        {cast.map(member => (
          <li key={member.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${
                member.profile_path || '/no_image_available.jpg'
              }`}
              alt={member.name}
            />
            <p>{member.name}</p>
            <p>Character: {member.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
