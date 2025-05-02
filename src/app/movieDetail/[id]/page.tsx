"use client"
import axios from "axios";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function MovieDetail () {
    const { id } = useParams();
    const router = useRouter();
    const [movie, setMovie] = useState<any>(null);
    const [similarMovies, setSimilarMovies] = useState<any[]>([]);
    const [trailer, setTrailer] = useState< any >(null);  
    const [showTrailer, setShowTrailer] = useState(false);
    const movieTime = ( v : any ) => {
      const hour = Math.floor( v / 60 );
      const min = v % 60;
      return `${hour}h ${ min }m `
    }
    useEffect(() => {
        if (!id) return;
        const fetchMovie = async () => {
          try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
              params: {
                api_key: "7218121adc89327f121be3514953c73f",
              },
            });
            setMovie(res.data);
            const videoRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                params: {
                  api_key: "7218121adc89327f121be3514953c73f",
                },
              });
            const trailerData = videoRes.data.results.find((video: any) => video.site === 'YouTube' && video.type === 'Trailer' );
              console.log(videoRes.data.results);
              if (trailerData) {
                setTrailer(`https://www.youtube.com/embed/${trailerData.key}`);
              }
              
            const similarRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
                params: {
                  api_key: "7218121adc89327f121be3514953c73f",
                },
              });
              setSimilarMovies(similarRes.data.results.slice(0, 5)); 
          } catch (error) {
            console.error("Movie fetch error:", error);
          } 
        };
    
        fetchMovie();
      }, [id]);
      console.log(movie);
      
      if (!movie) return <div className="pt-[100px] text-center">Loading...</div>;
    return (
      <div className=" w-full bg-blue-100 mt-[80px]  " >
        <div className=" flex justify-between " >
          <div>
           <p> { movie.title } </p>
           <p>
             { movie.release_date } ◦ PG ◦
             { movie.runtime && 
               <span>  { movieTime(movie.runtime) } </span>
              }
           </p>
          </div>
          <div>
            <p> Rating </p>
            <div className=" flex items-center " >
              <span className=" mr-[3px] " >
                ⭐️ 
              </span>
              <div>
                <p> { movie.vote_average } <span>/10</span>  </p>
                <p> 👥 { movie.vote_count } vote </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex gap-[32px] " >
          { movie.poster_path &&
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className=" w-[290px] h-[428px]  " alt="" />
          }
         
           <div 
             style={{ backgroundImage : `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
             className=" flex-1  h-[428px] bg-no-repeat bg-cover bg-center flex " >
             <div className=" mt-auto " >
              <button 
              onClick={ () => setShowTrailer(true) }
               className=" h-[36px] border border-white w-[36px] rounded-full bg-gray-300 hover:bg-gray-500 " >►</button>
              <span>Play trailer</span>
             </div>
           </div>
         
        </div>

        {showTrailer && trailer && (
            <>
              <div className="fixed inset-0 bg-black/ backdrop-blur-sm z-10"></div>
              <div className="w-[80%] h-[50%] fixed top-[10%] left-[10%] z-20">
                <iframe
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  src={trailer}
                ></iframe>
              </div>
            </>
        )}
      </div>
    )
}