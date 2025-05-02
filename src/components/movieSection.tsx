"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const MovieSection = ({ type, title }: { type : any, title : any }) => {
  const [movies, setMovies] = useState< any []>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios(`https://api.themoviedb.org/3/movie/${type}`, {
          params: {
            api_key: "7218121adc89327f121be3514953c73f",
          },
        });
        setMovies(res.data.results.slice(0, 10));
      } catch (error) {
        console.error(`${title} хэсэг дуудахад алдаа гарлаа`, error);
      }
    };
    fetchMovies();
  }, []);
  console.log(movies);
  
  return (
    <div className="w-[90%] my-[20px]  ">
       <div className=" flex justify-between items-center " >
         <h2 className="text-[24px] text-[#09090B] font-semibold py-[20px] ">{title}</h2>
         <Link href={`/movies/${type}`} className="text-blue-500 underline text-sm">
            See more
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
             src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
             <p className=" text-[14px] " > ⭐️ {movie.vote_average} <span className="text-[#71717A] text-[12px] " >/10</span> </p> 
             <p className=" text-[18px] text-[#09090B] ">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
