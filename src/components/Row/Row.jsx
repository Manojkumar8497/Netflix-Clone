import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { toast } from "react-toastify";

// Services
import httpService from "../../services/httpService";

// CSS
import "./Row.css";
import "react-toastify/dist/ReactToastify.css";

// Image base url
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // State
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  //   Hooks life cycle
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await httpService.get(fetchUrl);
        setMovies(data.results);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchData();
  }, [fetchUrl]);
  // Configuration options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  // const trailerUrl = "XtMThy8QKqU";
  // Mapping the image path
  function imagePath(path) {
    return `${baseUrl}${path}`;
  }

  function getMovieName(movie) {
    return (
      movie?.original_name ||
      movie?.original_title ||
      movie?.name ||
      movie?.title
    );
  }

  const handleRowClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl(null);
    } else {
      try {
        // Getting the youtube video id based on the movie title
        const youtubeUrl = await movieTrailer(getMovieName(movie));
        // https:www.youtube.com/watch?v=Xreu3Vb29NrZ => destructuring the id from youtube link address
        const urlParams = new URLSearchParams(new URL(youtubeUrl).search);
        const youtubeId = urlParams.get("v");
        setTrailerUrl(youtubeId);
      } catch (error) {
        toast.error(`Oops ${getMovieName(movie)} trailer is not Found`);
      }
    }
  };

  return (
    <div className="row">
      {/* Title */}
      <h3>{title}</h3>
      {/* Container - Movie Poster */}
      <div className="row__posters">
        {/* Rendering the lists of movies */}
        {movies.length > 0 &&
          movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__posterImage ${
                isLargeRow && "row__posterLarger"
              }`}
              src={imagePath(
                isLargeRow ? movie.poster_path : movie.backdrop_path
              )}
              alt={movie.name}
              onClick={handleRowClick.bind(this, movie)}
            />
          ))}
      </div>
      {/* Youtube embedded */}
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
