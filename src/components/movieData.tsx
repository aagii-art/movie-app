"use client";
import axios from "axios";
import { Button } from "./ui/button";
const key = process.env.NEXT_PUBLIC_KEY;
import { useEffect, useRef, useState } from "react";
type Movie = {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  overview: string;
  backdrop_path?: string;
  trailerKey?: string;
};
type video = {
  type : string;
  site : string;
};
export const MovieData = () => {
  const [movies, setMovies] = useState<Movie []>([]);
  const [ currentIndex, setCurrentIndex ] = useState<number>( 0 )
  const [ showTrailer, setShowTrailer ] = useState<boolean>(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!showTrailer && movies.length > 0) { 
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevValue) => (prevValue + 1) % movies.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); 
      }
    };
  }, [movies, showTrailer, currentIndex]); 

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const res = await axios( "https://api.themoviedb.org/3/movie/now_playing",
                    {
                      params: {
                              api_key: key,
                              },
        });
        const moviesWithVideos = await Promise.all(
              res.data.results.map( async (v: Movie) => {
                  const videoRes = await axios(`https://api.themoviedb.org/3/movie/${v.id}/videos`,
                             {
                              params: {
                                      api_key: key,
                                      },
                   });
                   const trailer = videoRes.data.results.find(
                         (v : video) => v.type  === "Trailer" && v.site === "YouTube"
                   );
                   return {
                       ...v, trailerKey: trailer ? trailer.key : null,
                   };
        }));
        setMovies(moviesWithVideos);
      } catch (error) {
        console.log(" get axios error ", error);
      }
    };
    getNowPlaying();
  }, []);
  const currentMovie = movies[currentIndex]
  
  return ( <>
         <div
            className=" hidden md:flex relative w-[100%] mt-[80px] h-[600px]  bg-cover bg-center  bg-no-repeat  justify-between items-center pl-[8%] "
            style={{ backgroundImage : movies.length > 0 ? `url(https://image.tmdb.org/t/p/original${movies[currentIndex].backdrop_path})` : "none" }}>
            { movies.length  > 0 && (
                    <div
                        key={currentIndex}
                        className="w-[90%] h-[40%] flex flex-col gap-[10px]">
                        { showTrailer && currentMovie.trailerKey ? ( <>
                            <div className="fixed inset-0 backdrop-blur-[5px] z-[1]"></div>
                            <div className="absolute top-[10%]  w-[85%] h-[100%] z-[2] " >
                                  <iframe
                                     src={`https://www.youtube.com/embed/${currentMovie.trailerKey}`}
                                     className=" w-full  h-full "
                                     allowFullScreen >
                                  </iframe>
                                  <Button
                                        onClick={ () => setShowTrailer(false) }
                                        className="text-white absolute z-[2] w-[30px] h-[30px] right-[2%] top-[2%]
                                        hover:bg-gray-500 bg-gray-400 rounded-full " >
                                               ✕
                                  </Button>
                              </div> </> ) : (
                                         <> 
                                           <p className=" text-[16px] text-white " > Now playing : </p>
                                           <h1 className=" text-[36px] text-white font-bold " > { currentMovie.title } </h1>
                                           <p className=" text-[#FAFAFA] text-[18px] font-semibold mb-[20px] " > 
                                              ⭐️ {currentMovie.vote_average}
                                              <span className=" text-[#71717A] text-[16px] font-normal " >/10</span>
                                           </p>
                                           <p className=" text-[#FAFAFA] text-[12px] w-[30%] " > { currentMovie.overview } </p>
                                           <Button 
                                             onClick={ () => setShowTrailer(true) }
                                             className=" hover:bg-gray-300 text-[14px] bg-[#F4F4F5] mt-[20px] w-[145px] "
                                              >  <span> ▶️ </span> Watch Trailer
                                           </Button>
                                         </>) 
                        }
                    </div>
            )}
      
            <Button
                  onClick={ () => {
                         setCurrentIndex( (prev) => ( prev + 1 ) % movies.length )
                  }}
                  className=" w-[35px] h-[30-px] rounded-full bg-gray-200 hover:bg-gray-400 mr-[10px]" >
                       ➤
            </Button>
         </div>
    
         <div
          className=" md:hidden relative w-[100%] mt-[80px] h-[246px] bg-no-repeat bg-cover bg-center  justify-between items-center pl-[8%] "
          style={{ backgroundImage : movies.length > 0 ? `url(https://image.tmdb.org/t/p/original/${movies[currentIndex].backdrop_path})` : "none" }}
           >
         </div>
         { showTrailer && currentMovie.trailerKey && 
              <>
                 <div className="fixed inset-0 backdrop-blur-[5px] z-[1]"></div>
                 <div className=" md:hidden absolute top-[100px] z-[2] w-[85%] h-[500px] " >
                    <iframe
                       src={`https://www.youtube.com/embed/${currentMovie.trailerKey}`}
                       className=" w-full  h-full "
                       allowFullScreen >
                    </iframe>
                    <Button
                    onClick={ () => setShowTrailer(false) }
                      className="text-white absolute z-[2] w-[30px] h-[30px] right-[2%] top-[2%] hover:bg-gray-500 bg-gray-400 rounded-full " >
                        ✕
                   </Button>
                 </div> 
              </>   
           }
           <div className=" w-full  md:hidden p-[20px] border-b border-gray-300 " >
               { movies.length > 0 && <>
               <div className=" flex justify-between items-center  h-[80px] " >
                 <div className=" " >
                   <p className=" text-[14px] dark:text-white " > Now Playing : </p>
                   <p className=" text-[24px] font-semibold dark:text-white " > { currentMovie.title } </p>
                 </div>
                 <p className="  text-[18px] dark:text-white mt-[14px] font-semibold mb-[20px] " > 
                     ⭐️ {currentMovie.vote_average} <span className=" text-[#71717A] text-[16px] font-normal " >/10</span>
                 </p>
               </div>
               <p className=" text-[#09090B] dark:text-white text-[14px] " > { currentMovie.overview } </p>
               <Button 
                     onClick={ () => setShowTrailer(true) }
                     className=" hover:opacity-80 text-[14px] bg-black dark:bg-white text-white dark:text-black mt-[20px] w-[145px] "
                      >  <span> ▶️ </span> Watch Trailer
               </Button>
     
               </>}
           </div>

         </>)
};
