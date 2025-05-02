import { useState } from "react";

type Genres = {
    id: number;
    name: string;
  };
  type GenreListProps = {
    genres : Genres[];
    toggleGenre : ( i : number ) => void
    selectedGenreId : number [];
    booliin : boolean;
  }
  export const GenreList = ({ genres, selectedGenreId , toggleGenre , booliin }: GenreListProps ) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return (
    <div className={ `flex bg-[#fff]  flex-wrap gap-[10px] ${ !booliin && isMobile ? " hidden " : "" } ` }>
     
      <div className="  w-full border-b border-b-[#E4E4E7] pb-[10px] " >
        <p className=" text-[24px] text-black " >Genres</p>
        <p className=" text-[16px] " > See lists of movies by genre</p>
      </div>
      
      <div className=" flex flex-wrap gap-[14px]  " >
      {genres.map((v) => {
        const isSelected = selectedGenreId.includes(v.id);
        return (
          <button
            key={v.id}
            onClick={() => toggleGenre(v.id)}
            className={`border text-[12px] rounded-full px-[10px] py-[1px]  border-[#E4E4E7] transition-all duration-200 ${ !booliin && isMobile ? " hidden " : "" } ${
            isSelected
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-white text-black hover:bg-gray-100"
            }`}
          >
              {v.name} <span> ➤ </span>
          </button>
        )
      })}
      </div>
    </div>
  );
}