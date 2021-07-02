import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {

    const [movie, setMovies] = useState([]);

    useEffect ( () => {    // "useEffect" runs on based of given condition. 
        async function fetchData() {
        const request = await axios.get(requests.fetchNetflixOriginals); 

        setMovies(                           // To get one random movie from "Netflix Original" for a Banner
            request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
        ] );

        return request;   
        }
        fetchData();
    }, []);

    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + " ... " : str;
    }

    return (
        <header className="banner"    // This "banner" class is used for background banner image,
         style = {{
            backgroundSize: "cover", 
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"  
            )`,   // "?" is used, if movie is un-defined or not found, then it will handle the situation elegantly
            backgroundPosition: "center center"
        }}  >   
          <div className="banner_contents">   
            <h1 className="banner_title">
             {movie?.title || movie?.name || movie?.original_name}    
             </h1>

             <div className="banner_buttons">
                 <button className="banner_button"> Play </button>
                 <button className="banner_button"> My List </button>  
            </div>

            <h1 className="banner_description">
                {truncate(movie?.overview, 150)} </h1>
         </div>
            
            <div className="banner-fadeBottom"></div>
        </header>
    )
}

export default Banner
