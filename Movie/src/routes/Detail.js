import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import propTypes from "prop-types";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    console.log(json);
    console.log(json.data.movie);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <h1>Detail of Movie</h1>
      <hr />
      <Movie_details
        key={movie.id}
        title={movie.title}
        language={movie.language}
        rating={movie.rating}
        coverImage={movie.large_cover_image}
        summary={movie.description_full}
        genres={movie.genres}
      ></Movie_details>
    </div>
  );
}

function Movie_details({
  title,
  language,
  rating,
  coverImage,
  summary,
  genres,
}) {
  return (
    <div>
      <h2>
        {title} ({language}, *{rating})
      </h2>
      <img src={coverImage} alt="Sorry"></img>
      <p>{summary === "" ? "제공된 정보 없음" : summary}</p>
      <ul>
        {genres === undefined ? null : genres.map((g) => <li key={g}>{g}</li>)}
      </ul>
    </div>
  );
}

Detail.propTypes = {
  title: propTypes.string.isRequired,
  language: propTypes.string.isRequired,
  rating: propTypes.number.isRequired,
  coverImage: propTypes.string.isRequired,
  summary: propTypes.string.isRequired,
  genres: propTypes.array.isRequired,
};

export default Detail;
