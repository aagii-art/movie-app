"use client";
import axios from "axios";
const key = process.env.NEXT_PUBLIC_KEY;
import { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";
import { useSearchParams, useRouter } from "next/navigation";
interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}
interface Genre {
  id: number;
  name: string;
}
export default function GenreResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const UrlGenreId = searchParams.get("genres");
  const [movies, setMovies] = useState< Movie [] >([]); 
  const [genres, setGenres] = useState<Genre []>([]);
  const [ numberTitle, setNumberTitle ] = useState<number | null>( null );
  const currentPage = Number(searchParams.get("page")) || 1 ;
  const selectedGenreIds = UrlGenreId ? UrlGenreId.split(",").map((id) => parseInt(id)) : [];

  const handleGenreClick = (genreId: number) => {
    let updatedSelectedGenres: number[] = [];
    if (selectedGenreIds.includes(genreId)) {
       updatedSelectedGenres = selectedGenreIds.filter((id) => id !== genreId);
    } else {
       updatedSelectedGenres = [...selectedGenreIds, genreId];
    }
    router.push(`/genreResults?genres=${updatedSelectedGenres.join(",")}`);
  };
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: key,
          },
        });
        setGenres(res.data.genres);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!UrlGenreId) { setMovies([]); setNumberTitle(null); return }; 
      try {
        const res = await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key : key,
            with_genres : UrlGenreId,
            page : currentPage, 
          },
        });
        setNumberTitle(res.data.total_results);
        setMovies(res.data.results.slice(0,12)); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies(); 
  }, [UrlGenreId, currentPage ]);
   
  return (
     <div className=" flex flex-col min-h-[72vh] md:flex-row mt-[100px] mb-[20px] w-[90%]">
       <div className="  md:w-[35%] ">
         <p className="text-[30px] text-[#09090B] dark:text-white font-semibold"> Search filter </p>
         <div className=" py-[20px] " >
           <p className=" text-[24px] dark:text-white " >Genres</p>
           <p className=" text-[16px] dark:text-white " > See lists of movies by genre</p>
         </div>
      
         <div className="flex flex-wrap gap-[14px]" >
           {genres.map((v) => {
            const isSelected = selectedGenreIds.includes(v.id);
              return (
                <button
                 key={v.id}
                 onClick={() => { handleGenreClick(v.id) }}
                 className={`border text-[12px] rounded-full px-[10px] py-[1px]  border-[#E4E4E7] transition-all duration-200  ${
                   isSelected
                      ? "bg-blue-500 dark:bg-white dark:text-black text-white border-blue-600 dark:border-[#27272A]"
                      : "bg-white dark:bg-black dark:border-[#27272A] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 "}`} >
                      {v.name} <span> ➤ </span>
                </button>
            )})}
          </div>
       </div>

       <div className=" flex flex-col flex-1 md:pl-[20px] mt-[60px] md:ml-[10px] md:border-l md:border-l-[#E4E4E7] dark:border-[#27272A] " >

          <p className="flex dark:text-white flex-wrap gap-[10px] font-semibold text-[20px] mb-6">
             <span> { numberTitle ? numberTitle : "0" } titles in " </span>
              {  selectedGenreIds.map( ( id ) => {
                    const selectedGenresName = genres.find( (g) => g.id === id );
                    return (
                         <span
                           key={id}
                           className=" mr-[10px] "> 
                                { selectedGenresName?.name }
                         </span> )
              })}
              <span>"</span>
          </p>
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-[20px]">
          { movies?.length ? movies.map((movie : any ) => (
             <div 
              key={movie.id}
              onClick={ () => router.push(`/movieDetail/${movie.id}`) } 
              className=" rounded-lg bg-[#F4F4F5] pb-[20px] ">
                 {movie.poster_path && (<img 
                  className=" w-full rounded-t-lg "
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} /> )}
                 <p className=" text-[14px] " > ⭐️ {movie.vote_average} <span className="text-[#71717A] text-[12px] " >/10</span> </p> 
                 <p className=" text-[18px] text-[#09090B] ">{movie.title}</p>
              </div>
            )) : ( <p className=" text-center " > No results found. </p> )
          }
          </div>

          <Pagination currentPage={currentPage} />  
       </div>
    </div>
  );
}
