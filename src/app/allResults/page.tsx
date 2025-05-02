"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@/components/pagination";
export default function AllResultsPage() {
  const [ genres, setGenres ] = useState< any [] >([])
  const [movies, setMovies] = useState<any []>([]);
  const [filteredMovies, setFilteredMovies] = useState<any []>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number []>([]);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const query = searchParams.get('query'); 
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam) : 1;

  const toggleGenre = (genreId: number) => {
    if (selectedGenreId.includes(genreId)) {
      const newSelected = selectedGenreId.filter(id => id !== genreId);
      setSelectedGenreId(newSelected);
    } else {
      setSelectedGenreId(prev => [...prev, genreId]);
    }
  };
  useEffect(() => {
    if (query) {
    
      const fetchMovies = async () => {
        try {
          const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
              api_key: "7218121adc89327f121be3514953c73f",
              query: query, 
              page: page,
            },
          });
          setMovies(res.data.results); 
          console.log( " page ", res);

        } catch (error) {
          console.error("Error fetching movies", error);
        }
      };
      fetchMovies();
    }
  }, [query, page]); 

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: "7218121adc89327f121be3514953c73f",
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
    if (selectedGenreId.length === 0) {
      setFilteredMovies(movies);
    } else {
        const filtered = movies.filter(movie =>
          selectedGenreId.every( (id) => movie.genre_ids.includes(id) )
      );
      setFilteredMovies(filtered);
    }
  }, [selectedGenreId, movies]);
  
  return (
    <div className="  w-full bg-blue-100  ">
      <div className=" w-[60%] bg-gray-50 " >
      <h1 className="text-2xl font-bold mb-6">Results for: "{query}"</h1>
      {filteredMovies.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {filteredMovies.map((movie) => ( 
            <div 
             key={movie.id}
             onClick={ () =>  router.push(`/movieDetail/${movie.id}`) }
             className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm">{movie.overview}</p>
            </div>
          ))}
        </div>
      )}
      <Pagination currentPage={page}  />
      </div>
      <div className=" bg-amber-50 flex flex-wrap gap-[10px] dark:bg-red-400" >
        { genres.map( (v) => (
          <button
            className={`border px-2 py-1 rounded-md transition-all duration-200 ${
            selectedGenreId.includes(v.id)
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-white text-black hover:bg-gray-100"
           }`}
          onClick={() => toggleGenre(v.id)}
          key={ v.id } >
            { v.name }
          </button>
        ) )
        }
      </div>
    </div>
  );
}
