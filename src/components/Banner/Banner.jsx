import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Services
import httpService from "../../services/httpService";
import requests from "./../../services/requests";

// CSS
import "./Banner.css";

// Image base url
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
  //   State
  const [movie, setMovie] = useState(null);
  // Life cycle hook
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await httpService.get(requests.fetchNetflixOriginals);
        const randomIndex = Math.floor(Math.random() * data.results.length - 1);
        setMovie(data.results[randomIndex]);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchData();
  }, []);
  //   Truncate text
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* Title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* Actions button */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* Description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
