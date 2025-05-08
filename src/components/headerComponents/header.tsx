"use client";
import axios from "axios";
import { Button } from "../ui/button";
import ThemeToggle from "./toggleTheme";
import { Inter} from "next/font/google";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { ChevronDownIcon} from "lucide-react";
import { GenreList, SearchInput, SearchResults } from "./index";
const inter = Inter({ subsets: ["latin"], style: ["normal", "italic"] });
type Genre = {
  id: number;
  name: string;
};
type Movie = {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  poster_path?: string;
};

export const Header = () => {
  const router = useRouter();
  const [see, nosee] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [genres, setGenres] = useState< Genre []>([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [showGenres, setShowGenres] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie []>([]);
  const [ isSeeMoreClicked, setIsSeeMoreClicked ] = useState(false)
  const [selectedGenreId, setSelectedGenreId] = useState<number []>([]);
  const key = process.env.NEXT_PUBLIC_KEY;
 
  const seeMoreClicked = () => {
    setIsSeeMoreClicked(true)
  }
  const resetIsClickEnter = () => {
    setIsSeeMoreClicked(false);
    nosee(false);
  };
  const clickEnter = () => {
    if (searchMovie.trim().length > 1) {
      router.push(`/allResults?query=${searchMovie}`);
      setSelectedGenreId([]);
      setShowGenres(false);
      setIsSeeMoreClicked(true);
      nosee(true);
    }
  };
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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    const getGenres = async () => {
      try {
        const res = await axios("https://api.themoviedb.org/3/genre/movie/list", {
            params: {
              api_key: key ,
            }}
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
      if (searchMovie.trim().length < 2) { setSearchResults([]); return }
      try {
        const res = await axios("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: key,
            query: searchMovie,
          },
        });
        const movies : any [] = res.data.results.slice(0,5);
        setSearchResults(movies);
      } catch (error) {
        console.error("konoo aldaa", error);
      }
    };
    fetchMovies();
  }, [searchMovie, selectedGenreId]);

    return (
       <div className={`fixed z-[3] flex justify-between  [h-36px] w-[90%] pt-[16px] `}>

          <div
              onClick={() => router.push('/')}
              className={` flex  gap-[8px] mt-[10px] cursor-pointer ${ isButtonClicked ? "hidden" : "" } `}
           >
              <img src="/img/MovieIcon.jpg" alt="" className=" w-[20px] h-[20px] rounded-sm " />
              <p className={`text-[16px] ${inter.className} font-bold italic text-[#4338CA] `}>Movie Z</p>
          </div>

          <div className={`  md:w-[45%]   ml-auto mr-[10px] md:ml-0  ${ isButtonClicked ? " flex-1 " : "" } `}>
            <div className=" flex gap-[8px]  " >
                <Button 
                  className={` bg-white dark:bg-black dark:text-white hidden md:flex border h-[39px] dark:border-[#27272A] border-[#E4E4E7] ${ isButtonClicked ? "block" : "hidden" } `}
                  onClick={() =>{
                     setShowGenres((prev) => !prev)
                  }} > 
                  <ChevronDownIcon
                     className={` w-[16px] h-[16px] md:block ${ isButtonClicked ? "block" : "hidden" } `}
                  /> 
                  <span className={ ` ${ isButtonClicked ? "hidden" : "block" } text-[14px] ` } > Genre </span> 
                </Button>
                <SearchInput isButtonClicked={isButtonClicked} setIsButtonClicked={setIsButtonClicked}
                             searchMovie={setSearchMovie} clickEnter={clickEnter} resetIsClickEnter={resetIsClickEnter}
                />
             </div>

             { searchResults.length > 0 && !isSeeMoreClicked ?
              <div className={ `border-[#E4E4E7] dark:border-[#27272A] border rounded-lg mt-[10px] bg-white
                   dark:bg-black  w-[100%] p-[20px]  flex justify-center  ${!isButtonClicked ? "hidden" : "block"}  md:block  ` } >
                 <div className=" w-[100%]  " >
                     <SearchResults isButtonClicked={isButtonClicked} movies={searchResults} seeMoreClicked={seeMoreClicked}  /> 
                     <button 
                      onClick={() => {
                       setSelectedGenreId([]);      
                       if (showGenres) {            
                         setShowGenres(false);      
                       }
                       router.push(`/allResults?query=${searchMovie}`);
                       setSearchMovie("")
                      }}
                      className={` hover:underline mt-[10px] text-[14px] text-[#09090B] dark:text-white ${!isButtonClicked ? "hidden" : "block"}  md:block `}
                     >
                         See all results for "{searchMovie}"
                     </button>
                 </div>
              </div>
              : (searchMovie.trim().length > 1  && searchResults.length === 0 && !see ) && 
                  <div className={ `${!isButtonClicked ? "hidden" : "block"} border-[#E4E4E7] border rounded-lg
                       mt-[10px] bg-white dark:bg-black dark:border-[#27272A] w-[100%] p-[20px]  flex justify-center  md:block `} >
                      <p className=" text-center dark:text-white " >  🤷‍♂️  No results found. </p>
                  </div>
             }
             { ( searchMovie.trim() === "" && showGenres ) && 
                <div className={ ` bg-white dark:bg-black dark:text-white   ${ isMobile && !isButtonClicked ? "hidden"
                     : "" } border-[#E4E4E7] dark:border-[#27272A] border rounded-lg mt-[10px] w-[100%] p-[20px]  flex justify-center` } >
                  <GenreList booliin={isButtonClicked} genres={genres} toggleGenre={toggleGenre} />
                </div>
             }
          </div>
          <ThemeToggle isButtonClicked={isButtonClicked} />
        </div>
      );
};
