"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
type Movie = {
  id: number;
  title: string;
  overview : string
  poster_path : string
  trailerKey: string | null;
};
type videoRes = {
  type: string;
  site: string;
  key: string;
};

export const MovieData = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [ currentIndex, setCurrentIndex ] = useState( 0 )
  const [ showTrailer, setShowTrailer ] = useState(false)
  
  useEffect( () => {
   let interval : any;
    if( !showTrailer && movies.length > 0 ){
       interval = setInterval( () => {
        setCurrentIndex( ( prevValue ) => ( prevValue + 1 ) % movies.length );
      }, 3000 )
    }
    return () => clearInterval(interval);
  }, [movies, showTrailer, currentIndex ] )
     
  
  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const res = await axios(
          "https://api.themoviedb.org/3/movie/now_playing",
          {
            params: {
              api_key: "7218121adc89327f121be3514953c73f",
            },
          }
        );
        // console.log("res", res.data.results);

        const moviesWithVideos = await Promise.all(
          res.data.results.map(async (v: any) => {
            const videoRes = await axios(
              `https://api.themoviedb.org/3/movie/${v.id}/videos`,
              {
                params: {
                  api_key: "7218121adc89327f121be3514953c73f",
                },
              }
            );
            // console.log("videoRes", videoRes);
            const trailer = (videoRes.data.results as videoRes[]).find(
              (v: videoRes) => v.type === "Trailer" && v.site === "YouTube"
            );
            // console.log(" trailer ", trailer);
            return {
              ...v,
              trailerKey: trailer ? trailer.key : null,
            };
          })
        );
        // console.log(moviesWithVideos, "movies");

        setMovies(moviesWithVideos);
      } catch (error) {
        console.log(" get axios error ");
      }
    };
    getNowPlaying();
  }, []);
  const currentMovie = movies[currentIndex]
  console.log( "current movie", currentMovie );
  
  return (
    <div
     className=" bg-amber-100 w-[100%] h-[800px] bg-no-repeat bg-cover bg-center "
     style={{ backgroundImage : movies.length > 0 ? `url(https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path})` : "none" }}
      >
        <Button onClick={ () => {
          setCurrentIndex( (prev) => prev === 0 ? movies.length - 1 : prev -1 )
          // setShowTrailer( false )
         } } > previous
        </Button>
        <Button onClick={ () => {
            setCurrentIndex( (prev) => ( prev + 1 ) % movies.length )
            // setShowTrailer( false )
          } }
             >Next
        </Button>
      { movies.length  > 0 && (
        <div key={currentIndex} >
          { showTrailer && currentMovie.trailerKey ? (
            <>
               <iframe
                  src={`https://www.youtube.com/embed/${currentMovie.trailerKey}`}
                  className=" w-[50%] h-[600px] "
                  allowFullScreen >
               </iframe>
               <Button
               onClick={ () => setShowTrailer(false) }
                 className="text-white" >
                 
                    back 
              </Button>
            </>) : (
            <>
              <h1> { currentMovie.title } </h1>
              <p className=" " > { currentMovie.overview } </p>
              <Button 
                onClick={ () => setShowTrailer(true) }
                className=" text-white "
                 > watch trailer
              </Button>
            </>) 
          }
        </div>
       ) 
      }
    </div>
  );
};
