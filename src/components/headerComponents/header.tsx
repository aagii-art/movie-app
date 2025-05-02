"use client";
import { GenreList, SearchInput, SearchResults } from "../index";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation"; 
import ThemeToggle from "./toggleTheme";
import { Inter} from "next/font/google";
const inter = Inter({ subsets: ["latin"], style: ["normal", "italic"] });
export const Header = () => {
  const router = useRouter();
  
  const [searchMovie, setSearchMovie] = useState("");
  const [genres, setGenres] = useState< any []>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [searchResults, setSearchResults] = useState<any []>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number []>([]);
  const [ showResults, setShowResults ] = useState(false)
  const [ isClickEnter, setIsClickEnter ] = useState(false)
  const [ isSeeMoreClicked, setIsSeeMoreClicked ] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const clickEnter = () => {
    if (searchMovie.trim().length > 1) {
      router.push(`/allResults?query=${searchMovie}`);
      setSelectedGenreId([]);
      setIsClickEnter(false);
      setShowResults(false);
      setShowGenres(false);
      setIsSeeMoreClicked(true)
    }
  };
    const resetIsClickEnter = () => {
    setIsClickEnter(false);
    setIsSeeMoreClicked(false)
  };
  const seeMoreClicked = () => {
    setIsSeeMoreClicked(true)
  }
  const toggleGenre = (id: number) => {
    if (!searchMovie.trim()) {
      router.push(`/genreResults?genres=${id}`);
      setShowGenres(false);
      setSelectedGenreId([]);
    } else {
      setSelectedGenreId((prev) =>
        prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
      );
    }
  };
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
        const movies : any [] = res.data.results.slice(0,5);
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
    return (
       <div className={`fixed z-[3] flex justify-between  [h-36px] w-[90%] pt-[16px] dark:text-white dark:bg-black  `}>

          <div
              onClick={() => router.push('/')}
              className={` flex  gap-[8px] mt-[10px] cursor-pointer ${ isButtonClicked ? "hidden" : "" } `}
           >
              <img src="/img/MovieIcon.jpg" alt="" className=" w-[20px] h-[20px] " />
              <p className={`text-[16px] ${inter.className} font-bold italic text-[#4338CA] `}>Movie Z</p>
          </div>

          <div className={`  md:w-[45%]  ml-auto mr-[10px] md:ml-0  ${ isButtonClicked ? " flex-1 " : "" } `}>
            <div className=" flex w-[100%] gap-[8px] " >
              <Button 
               className={` hidden md:flex border h-[39px] border-[#E4E4E7]  bg-white ${ isButtonClicked ? "block" : "hidden" } `}
               onClick={() =>{
                 setShowGenres((prev) => !prev)
               }} > 
                  <img src="/img/arrow-down.svg" alt=""  className={` w-[16px] h-[16px] md:block ${ isButtonClicked ? "block" : "hidden" } `} /> 
                  <span className={ ` ${ isButtonClicked ? "hidden" : "block" } text-[14px] ` } > Genre  </span> 
              </Button>
              <SearchInput isButtonClicked={isButtonClicked} setIsButtonClicked={setIsButtonClicked}
                  searchMovie={setSearchMovie} clickEnter={clickEnter} resetIsClickEnter={resetIsClickEnter}  />
            </div>

            { searchResults.length > 0 && !isSeeMoreClicked ?
              <div className={ `border-[#E4E4E7] border rounded-lg mt-[10px] bg-white  w-[100%] p-[20px]  flex justify-center  ${!isButtonClicked ? "hidden" : "block"}  md:block  ` } >
                 <div className="  w-[100%] " >
                     <SearchResults isButtonClicked={isButtonClicked} movies={searchResults} seeMoreClicked={seeMoreClicked}  /> 
                     <button 
                      onClick={() => {
                       setSelectedGenreId([]);      
                       setIsClickEnter(false);      
                       setShowResults(false);       
                       if (showGenres) {            
                         setShowGenres(false);      
                       }
                       router.push(`/allResults?query=${searchMovie}`);
                       setSearchMovie("")
                      }}
                      className={` hover:underline mt-[10px] text-[14px] text-[#09090B]  ${!isButtonClicked ? "hidden" : "block"}  md:block `}

                     >
                         See all results for "{searchMovie}"
                   </button>
                 </div>
              </div>
              : (searchMovie.trim().length > 1  && searchResults.length === 0 ) && 
                 <div className={ `border-[#E4E4E7]  border rounded-lg mt-[10px] bg-white  w-[100%] p-[20px]  flex justify-center ${!isButtonClicked ? "hidden" : "block"}  md:block ` } >
                   <p className=" text-center " >  🤷‍♂️  No results found. </p>
                 </div>
             }
             { ( searchMovie.trim() === "" && showGenres ) && 
                <div className={ `border-[#E4E4E7] border rounded-lg mt-[10px] bg-white  w-[100%] p-[20px]  flex justify-center` } >
                  <GenreList booliin={isButtonClicked} genres={genres} toggleGenre={toggleGenre} selectedGenreId={selectedGenreId} />
                </div>
             }
          </div>

          <ThemeToggle isButtonClicked={isButtonClicked} />
         
        </div>
      );
};
