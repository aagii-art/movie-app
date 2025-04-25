"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";


type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

type MovieSectionProps = {
  type: "top_rated" | "upcoming" | "popular";
  title: string;
};

export const MovieSection = ({ type, title }: MovieSectionProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios(`https://api.themoviedb.org/3/movie/${type}`, {
          params: {
            api_key: "7218121adc89327f121be3514953c73f",
          },
        });
        console.log(res);
        
        setMovies(res.data.results.slice(0, 10));
      } catch (error) {
        console.error(`${title} хэсэг дуудахад алдаа гарлаа`, error);
      }
    };
    fetchMovies();
  }, []);
  console.log(movies);
  
  return (
    <div className="w-[90%] bg-green-100 my-6">
       <h2 className="text-xl font-bold mb-4">{title}</h2>
       <Link href={`/movies/${type}`} className="text-blue-500 underline text-sm">
          See more
       </Link>
       <div className="grid grid-cols-5 gap-4">
         {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded-md shadow">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
            <h3 className="font-semibold mt-2">{movie.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
