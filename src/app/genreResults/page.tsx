"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = "7218121adc89327f121be3514953c73f";

export default function GenreResultsPage() {
   
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page"); 
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const genresParam = searchParams.get("genres");
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]); 
  const [genres, setGenres] = useState<any[]>([]);

  const selectedGenreIds = genresParam ? genresParam.split(",").map((id) => parseInt(id)) : [];

  const handleGenreClick = (genreId: number) => {
    let newSelectedGenres: number[] = [];
  
    if (selectedGenreIds.includes(genreId)) {
      newSelectedGenres = selectedGenreIds.filter((id) => id !== genreId);
    } else {
      newSelectedGenres = [...selectedGenreIds, genreId];
    }
  
    const queryString = newSelectedGenres.join(",");
    router.push(`/genreResults?genres=${queryString}`);
  };
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: API_KEY,
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
      if (!genresParam) return; 
      try {
        const res = await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "7218121adc89327f121be3514953c73f",
            with_genres: genresParam,
            page: currentPage, 

          },
        });
        setMovies(res.data.results); 
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };
    fetchMovies(); 
  }, [genresParam, currentPage ]); 
  return (
    <div className="p-4 pt-[180px] bg-amber-100 min-h-screen flex ">

       <div className=" p-4 border-r border-gray-300 w-[40%] ">
        <h2 className="text-xl font-bold mb-4">Genres</h2>
        <div className="flex flex-col gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`px-3 py-2 rounded ${
                selectedGenreIds.includes(genre.id)
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
       
      <h1 className="text-2xl font-bold mb-6">Genre Results</h1>
      <p>Selected genres: {selectedGenreIds.join(", ")}</p>
      <div className="grid grid-cols-2 gap-4">
      { movies.length > 0 ? (
          movies.map((movie) => (
            <div 
             key={movie.id} 
             onClick={ () => router.push(`/movieDetail/${movie.id}`) }
             className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm">{movie.overview}</p>
            </div>
          ))
        ) : (
          <p>No movies found for the selected genres.</p>
        )}

        <div className="flex gap-4 mt-6">
        <button
          onClick={() => {
            if (currentPage > 1) {
              router.push(`/genreResults?genres=${selectedGenreIds.join(",")}&page=${currentPage - 1}`);
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
         <span> { currentPage } </span>
        <button
          onClick={() => {
            router.push(`/genreResults?genres=${selectedGenreIds.join(",")}&page=${currentPage + 1}`);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
       </div>
      
      </div>
    </div>
  );
}
