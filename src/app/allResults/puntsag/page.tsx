"use client";

import axios from "axios";
const key = process.env.NEXT_PUBLIC_KEY;
import { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
type Movie = {
  id: number;
  title: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string;
};
type Genre = {
  id: number;
  name: string;
};
export default function AllResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const query = searchParams.get('query'); 
  const page = Number(searchParams.get("page")) || 1;
  const [movies, setMovies] = useState<Movie []>([]);
  const [ genres, setGenres ] = useState<Genre []>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie []>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number[]>([]);

  const toggleGenre = (genreId: number) => {
    if (selectedGenreId.includes(genreId)) {
      const newSelected = selectedGenreId.filter(id => id !== genreId);
      setSelectedGenreId(newSelected);
    } else {
      setSelectedGenreId(prev => [...prev, genreId]);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: key,
          },
        });
        setGenres(res.data.genres);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
      const fetchMovies = async () => {
        try {
            const res = await axios( "https://api.themoviedb.org/3/search/movie" , {
               params : {
                        api_key: key,
                        query : query,
                        page : page
            }})
            setMovies(res.data.results.slice(0,8)); 
        } catch (error) {
            console.error("Error fetching movies", error);
        }
      };
      fetchMovies();
  }, [query, page]); 

  useEffect(() => {
    if (selectedGenreId.length === 0) {
        setFilteredMovies(movies);
    } else {
        const filtered = movies.filter(movie =>
              selectedGenreId.every( (id) => movie.genre_ids.includes(id) ));
        setFilteredMovies(filtered);
    }
  }, [selectedGenreId, movies]);
   
  return (
    <div className=" min-h-[73vh] md:flex items-start w-[90%] mt-[100px]">

      <div className=" flex flex-col md:w-[60%] h-auto md:border-r md:pr-[30px] md:border-r-[#E4E4E7] dark:border-[#27272A] md:pb-[10vh] " >
          <p className="text-[30px] dark:text-white font-semibold ">Search results</p>
          <p className=" text-[20px] dark:text-white font-semibold my-[20px] " > { filteredMovies.length } results for <span>&#34; { query } &#34; </span></p>
          {filteredMovies.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[30px] ">
                  {filteredMovies.map((movie) => ( 
                     <div 
                       key={movie.id}
                       onClick={ () => router.push(`/movieDetail/${movie.id}`) } 
                       className="rounded-lg bg-[#F4F4F5] pb-[20px] ">
                       { movie.poster_path && (
                         <img
                          alt={movie.title} 
                          className=" rounded-t-lg w-full "
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} /> )}
                       <p className=" text-[14px] " > ⭐️ {movie.vote_average} <span className="text-[#71717A] text-[12px] " >/10</span> </p> 
                       <p className=" text-[18px] text-[#09090B] ">{movie.title}</p>
                     </div>
                   ))}
               </div>
          )}
          <Pagination currentPage={page}  />
      </div>

       <div className=" flex-1 md:pl-[30px] mb-[20px]" >
          <div className=" pt-[40px] " >
            <p className=" text-[24px] font-medium dark:text-white " >Search by genre</p>
            <p className=" text-[16px] dark:text-white  " > See lists of movies by genre</p>
          </div>

            {genres.map((v) => {
                   const isSelected = selectedGenreId.includes(v.id);
                   return (
                        <button
                          key={v.id}
                          onClick={() => { toggleGenre(v.id) }}
                          className={`border text-[12px] rounded-full px-[10px] my-[10px] mr-[10px]  border-[#E4E4E7] transition-all duration-200 
                          ${isSelected
                             ? "bg-blue-500 dark:bg-white dark:text-black text-white border-blue-600 dark:border-[#27272A]"
                             : "bg-white dark:bg-black dark:border-[#27272A] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 "}`} >
                           {v.name} < span className=" ml-[5px] " > ➤ </span>
                        </button>
            )})}
       </div>
    </div>
  );
}
