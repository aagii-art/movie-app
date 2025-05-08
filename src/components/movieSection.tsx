"use client";
import axios from "axios";
import Link from "next/link";
const key = process.env.NEXT_PUBLIC_KEY;
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type Movie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};
export const MovieSection = ({ type, title }: { type : string, title : string }) => {
  const router = useRouter();
  const [movies, setMovies] = useState< Movie []>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios(`https://api.themoviedb.org/3/movie/${type}`, {
              params: {
                      api_key: key
              },
        });
        setMovies(res.data.results.slice(0, 10));
      } catch (error) {
        console.error( error);
      }
    };
    fetchMovies();
  }, []);
  
  return (
     <div className="w-[90%] my-[20px]  ">
        <div className=" flex justify-between items-center " >
           <h2 className="text-[24px] text-[#09090B] dark:text-white font-semibold py-[20px] ">{title}</h2>
           <Link href={`/movies/${type}`} className="dark:text-white hover:underline text-sm">
              See more →
           </Link>
        </div>

       <div className="grid grid-cols-2 md:grid-cols-5 gap-[20px] ">
         {movies.map((movie) => (
          <div 
           key={movie.id}
           onClick={ () => router.push(`/movieDetail/${movie.id}`) } 
           className=" rounded-lg bg-[#F4F4F5] pb-[20px] ">
            <img 
             className=" w-full rounded-t-lg "
             src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
             <p className=" text-[14px] " > ⭐️ {movie.vote_average} <span className="text-[#71717A] text-[12px] " >/10</span> </p> 
             <p className=" text-[18px] text-[#09090B] ">{movie.title}</p>
          </div>
          ))}
       </div>
     </div>
  )
};
