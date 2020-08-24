import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";

// Components
import Navbar from "./components/Nabar/Navbar";
import Banner from "./components/Banner/Banner";
import Row from "./components/Row/Row";
// Services
import requests from "./services/requests";

const rows = [
  {
    title: "Netflix Originals",
    requestUrl: requests.fetchNetflixOriginals,
    isLargeRow: true,
  },
  {
    title: "Trending Now",
    requestUrl: requests.fetchTrending,
    isLargeRow: false,
  },
  {
    title: "Top Rated",
    requestUrl: requests.fetchTopRated,
    isLargeRow: false,
  },
  {
    title: "Action Movies",
    requestUrl: requests.fecthActionMovies,
    isLargeRow: false,
  },
  {
    title: "Comedy Movies",
    requestUrl: requests.fecthComedyMovies,
    isLargeRow: false,
  },
  {
    title: "Horror Movies",
    requestUrl: requests.fecthHorrorMovies,
    isLargeRow: false,
  },
  {
    title: "Romance Movies",
    requestUrl: requests.fecthRomanceMovies,
    isLargeRow: false,
  },
];

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="app">
        {/* Error message toaster */}
        {/* Navbar */}
        <Navbar />
        {/* Banner */}
        <Banner />
        {/* Rendering the list of rows */}
        {rows.length > 0 &&
          rows.map((row, index) => (
            <Row
              key={index}
              title={row.title}
              fetchUrl={row.requestUrl}
              isLargeRow={row.isLargeRow}
            />
          ))}
      </div>
    </React.Fragment>
  );
}

export default App;
