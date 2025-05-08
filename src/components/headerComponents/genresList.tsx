type Genres = {
    id: number;
    name: string;
  };
  type GenreListProps = {
    genres : Genres[];
    toggleGenre : ( i : number ) => void
    booliin : boolean;
  }
  export const GenreList = ({ genres, toggleGenre , booliin }: GenreListProps ) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <div className={ `flex flex-wrap gap-[10px] ${ !booliin && isMobile ? " hidden " : "" } ` }>
     
      <div className="  w-full border-b border-b-[#E4E4E7] dark:border-[#27272A] pb-[10px] " >
        <p className=" text-[24px]  " >Genres</p>
        <p className=" text-[16px] " > See lists of movies by genre</p>
      </div>
      
      <div className=" flex flex-wrap gap-[14px]  " >
         {genres.map((v) => {
            return (
                 <button
                    key={v.id}
                    onClick={() => toggleGenre(v.id)}
                    className={`border text-[12px] rounded-full px-[10px] py-[1px]  border-[#E4E4E7] dark:border-[#27272A] transition-all duration-20 bg-white dark:bg-black
                     dark:text-white dark:hover:bg-gray-500 hover:bg-gray-100  ${ !booliin && isMobile ? " hidden " : "" } `}
                 >
                          {v.name} <span> ➤ </span>
                 </button>
            )
          })}
      </div>
    </div>
  );
}