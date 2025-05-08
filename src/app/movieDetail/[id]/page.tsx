"use client"
import axios from "axios";
const key = process.env.NEXT_PUBLIC_KEY;
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"

export default function MovieDetail () {
    const router = useRouter();
    const { id } = useParams();
    const [star, setStar] = useState<any []>([]);
    const [movie, setMovie] = useState<any>(null);
    const [writer, setWriter] = useState<any>(null);
    const [trailer, setTrailer] = useState<any>(null);  
    const [director, setDirector] = useState<any>(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [similarMovies, setSimilarMovies] = useState<any[]>([]);

    const movieTime = ( v : any ) => {
      const hour = Math.floor( v / 60 );
      const min = v % 60;
      return `${hour}h ${ min }m `
    }
    useEffect(() => {
        if (!id) return;
        const fetchMovie = async () => {
          try {
            const res = await axios(`https://api.themoviedb.org/3/movie/${id}`, {
              params: {
                api_key: key,
              },
            });
            setMovie(res.data);
            const videoRes = await axios(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                params: {
                  api_key: key,
                },
              });
            const trailerData = videoRes.data.results.find((video: any) => video.site === 'YouTube' && video.type === 'Trailer');
              if (trailerData) {
                setTrailer(`https://www.youtube.com/embed/${trailerData.key}`);
              }
            const people = await axios(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                params: {
                  api_key: key,
                },
              });
              const credits = people.data;
              const directorData = credits.crew.find((person: any) => person.job === "Director");
              const writerData = credits.crew.find((person: any) => person.job === "Writer" || person.job === "Screenplay" );
              const topCast = credits.cast.slice(0, 3); 
              if (directorData) setDirector(directorData.name);
              if (writerData) setWriter(writerData.name);
              setStar(topCast.map((actor: any) => actor.name));
              const isMobile = innerWidth <= 768; 
              const movieNumber = isMobile ? 2 : 5;
              const similarRes = await axios(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
                params: {
                  api_key: key,
                },
              });
              setSimilarMovies(similarRes.data.results.slice(0, movieNumber)); 
          } catch (error) {
            console.error("Movie fetch error:", error);
          } 
        };
        fetchMovie();
      }, [id]);
      if (!movie) return <div className="pt-[100px] text-center">Loading...</div>;

    return (
      <div className=" w-[95%] md:w-[80% min-h-[73vh] mt-[100px] mb-[60px]  " >
        <div className=" flex justify-between  " >
          <div className="" >
              < p className=" text-[36px] text-[#09090B] font-bold dark:text-white " > { movie.title } </p>
              <p className=" text-[#09090B] text-[18px] dark:text-white  " >
                 { movie.release_date } ◦ PG ◦
                 { movie.runtime && 
                   <span>  { movieTime(movie.runtime) } </span>
                 }
              </p>
          </div>
          <div>
            <p className=" text-[#09090B] text-[12px] dark:text-white  " > Rating </p>
            <div className=" flex items-center " >
              <span className=" mr-[3px] " >
                ⭐️ 
              </span>
              <div>
                <p className=" text-[18px] font-semibold text-[#09090B] dark:text-white " > { movie.vote_average } <span className=" text-[#71717A] text-[16px] " >/10</span>  </p>
                <p className=" text-[#71717A] text-[12px] " > 👥 { movie.vote_count } voted </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex gap-[32px] h-[30vh] " >
           { movie.poster_path &&
               <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className=" w-[25%]  object-cover hidden md:block " alt="" />
           }
           <div 
             style={{ backgroundImage : `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
             className=" flex-1 bg-no-repeat bg-cover bg-center bg-blue-100 flex p-[20px] " >
             <div className=" mt-auto " >
              <button 
               onClick={ () => setShowTrailer(true) }
               className=" h-[36px] border border-white w-[36px] rounded-full bg-gray-300 hover:bg-gray-500 " >►
              </button>
              <span className=" text-[16px] text-[white] ml-[10px] " >Play trailer</span>
             </div>
           </div>
        </div >

        <div className=" flex gap-[20px] " > 
          <img 
            className=" w-[40%] h-[20vh] mt-[20px] md:hidden "
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""  />
          <div  >
            { movie.genres && 
              <p className=" flex flex-wrap gap-[10px] my-[20px] " > 
               { movie.genres.map( ( g : any ) => (
                <span key={ g.id }
                 className=" text-[#09090B] dark:text-white text-[12px] font-semibold px-[10px] border border-[#E4E4E7] dark:border-[#27272A] rounded-full" >
                  { g.name }
                </span>
               ))}
              </p>
             }
            <p className=" text-[16px] text-[#09090B] dark:text-white " >
               { movie.overview }
            </p>
          </div>
        </div>

        <div className=" flex border-b border-[#E4E4E7] dark:border-[#27272A] dark:text-white mt-[20px] " >
          <span className=" text-[16px] font-bold w-[100px] " > Director : </span>
           <p className=" flex-wrap " >
            { director }
           </p>
        </div>
        <div className=" flex  border-b border-[#E4E4E7] dark:border-[#27272A] dark:text-white mt-[20px] " >
          <span className=" text-[16px] font-bold w-[100px] " > Writer : </span>
           <p>
            { writer }
           </p>
        </div>
        <p className=" flex  border-b border-b-[#E4E4E7] dark:border-[#27272A]  mt-[20px] dark:text-white " >
           <span className=" text-[16px] font-bold w-[100px] " > Stars :  </span > { star?.join("◦") }
        </p>
        {showTrailer && trailer && (
            <>
              <div className="fixed inset-0 backdrop-blur-[5px] z-10"></div>
              <div className="w-[80%] h-[50%] fixed top-[10%] left-[10%] z-20">
                <iframe
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  src={trailer}
                ></iframe>
                <button
                   className=" m-[20px] top-[0] w-[20px] h-[20px] flex items-center justify-center hover:bg-gray-500 bg-gray-400 p-[20px] rounded-full right-[0] absolute text-white "
                   onClick={ () => setShowTrailer(false) } >
                  ✕
                </button>
              </div>
            </>
         )}
        <div>
          <div className=" flex justify-between my-[20px] dark:text-white " > 
              <p className=" text-[24px] font-semibold" > More like this </p>
              <span
                  onClick={ () => router.push( `/movies/${id}?id=${id}` ) }
                  className=" hover:underline " > See more →
              </span>
          </div>
          <div className=" flex justify-between gap-[20px] " >
            { similarMovies && 
              similarMovies.map((movie) => (
                <div 
                 key={movie.id}
                 onClick={ () => router.push(`/movieDetail/${movie.id}`) } 
                 className=" flex-1 rounded-lg bg-[#F4F4F5] pb-[20px] ">
                  <img 
                   className=" w-full rounded-t-lg "
                   src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                  <p className=" text-[14px] " > ⭐️ {movie.vote_average} <span className="text-[#71717A] text-[12px] " >/10</span> </p> 
                  <p className=" text-[18px] text-[#09090B] ">{movie.title}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    )
}