
"use client"
import { useRouter } from "next/navigation";

export const SearchResults = ({ movies, seeMoreClicked, isButtonClicked }:
 { movies: any []; isButtonClicked : any; seeMoreClicked : any; }) => {
  const router = useRouter(); 
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  console.log(movies);

  return (
     <div className={`${ !isButtonClicked && isMobile ? " hidden " : "" }`}>
         { movies.map( ( m ) => (
          <div className=" flex w-full gap-[10px] p-[8px] border-b border-b-[#E4E4E7] " >

              { m.poster_path && (
                 <img
                    src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                    className="w-[67px] h-[100px] rounded-md"
                  />
              )}

              <div className="flex flex-1 h-full flex-col justify-around  " >
                 <h2 className="text-[#09090B] font-semibold  text-[20px] ">{m.title}</h2>
                 <p className=" text-[14px] text-[#09090B] " >
                    ⭐️ {  m.vote_average } <span className=" text-[#71717A] text-[12px] " > /10</span>
                 </p>
                 <div className=" flex  justify-between items-center  " >
                    <p className=" text-center text-[14px] " > { m.release_date } </p>
                    <button
                     onClick={() => {
                     seeMoreClicked();
                     router.push(`/movieDetail/${m.id}`) }}
                     className="  text-[#09090B] text-[14px] hover:underline text-center "
                    >
                       See more 👉
                    </button>
                 </div>
               </div>

           </div>
           ))
         }
       </div>
  )
  }