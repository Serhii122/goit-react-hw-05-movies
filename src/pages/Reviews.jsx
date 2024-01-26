import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/movieAPI';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await getMovieReviews(postId);
        setReviews(response.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    };

    if (postId) {
      fetchMovieReviews();
    }
  }, [postId]);

  if (!postId) {
    return <div>No reviews available</div>;
  }

  return (
    <div>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;