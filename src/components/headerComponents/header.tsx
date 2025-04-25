"use client";
import { GenreList, SearchInput, SearchResults } from "../index";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
type Genres = {
  id: number;
  name: string;
};
type Movie = {
  genre_ids : number[];
  title : string;
  id: number;
  overview: string;
  poster_path: string;
  };
  
export const Header = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [genres, setGenres] = useState<Genres[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie []>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number []>([]);
  const [ showResults, setShowResults ] = useState(false)
  const [ isClickEnter, setIsClickEnter ] = useState(false)
  const [ inputVlaue, setInputValue ] = useState("")
  const clickEnter = () => {

      setIsClickEnter(true)
  }
  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await axios( "https://api.themoviedb.org/3/genre/movie/list", {
            params: {
              api_key: "7218121adc89327f121be3514953c73f",
            } }
        );
        setGenres(res.data.genres);
      } catch (error) {
        console.log(" axios genres aldaa ");
      }
    };
    getGenres();
  }, [] );
   console.log("genres", genres);
  useEffect(() => {
    const fetchMovies = async () => {
      if (searchMovie.length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await axios("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: "7218121adc89327f121be3514953c73f",
            query: searchMovie,
          },
        });
        const movies : Movie [] = res.data.results.slice(0,5);
        const filtered = selectedGenreId.length > 0 
        ? movies.filter((movie) => selectedGenreId.every((id) => movie.genre_ids.includes(id)))
        : movies;
        setSearchResults(filtered);
        setShowResults(true)
        console.log(" filtered movies ", filtered);
      } catch (error) {
        console.error("konoo aldaa", error);
      }
    };
    fetchMovies();
  }, [searchMovie, selectedGenreId ]);
  const toggleGenre = (id: number) => {
    console.log( " genre id ", id);
    
    setSelectedGenreId((prev) => prev.includes(id)
      ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  
    return (
       <div className={`fixed bg-gray-200 w-[80%] flex flex-col justify-center items-center `}>
          <div className="flex w-[40%] gap-2 bg-amber-200 ">
        
            <Button onClick={() =>{
                 setShowGenres((prev) => !prev)
              }} > 
              genres 
            </Button>
            <SearchInput   searchMovie={setSearchMovie} clickEnter={clickEnter} />
          </div>
          { 
               <div className={ ` bg-amber-100 ${ isClickEnter ? "flex justify-center gap-[40px] "  : " flex justify-center  " } ` } >
                  { searchResults.length > 0 ? <SearchResults movies={searchResults} /> 
                    : <p> Not found </p>
                  }
                  { (isClickEnter || showGenres) &&  <GenreList genres={genres} toggleGenre={toggleGenre} selectedGenreId={selectedGenreId} />}

               </div>
          }
         
        </div>
      );
};
