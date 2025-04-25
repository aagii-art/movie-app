
type Genres = {
    id: number;
    name: string;
  };
  type GenreListProps = {
    genres : Genres[];
    toggleGenre : ( i : number ) => void
    selectedGenreId : number [];

  }
  export const GenreList = ({ genres, selectedGenreId , toggleGenre }: GenreListProps ) => (
    <div className="flex w-[40%] flex-wrap gap-[10px]">
      {genres.map((v) => {
        const isSelected = selectedGenreId.includes(v.id);

        return (
          <button
          key={v.id}
          onClick={() => toggleGenre(v.id)}
          className={`border px-2 py-1 rounded-md transition-all duration-200 ${
            isSelected
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {v.name}
          </button>
        )
      })}
    </div>
  );
  