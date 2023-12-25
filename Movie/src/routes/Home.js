import { useEffect, useState } from "react";
import Movie from "../components/Movie";

import styles from "../css/Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const [rating, setRating] = useState("9");

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=${rating}&sort_by=year`
        // "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
      )
    ).json();

    // fetch(
    //   "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    // )
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setMovies(json.data.movies);
    //     setLoading(false);
    //   });

    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    setRating("9");
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
