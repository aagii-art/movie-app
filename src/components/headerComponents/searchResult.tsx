type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
};

export const SearchResults = ({ movies }: { movies: Movie[] }) => 
  <div className="w-[60%] flex-col flex gap-y-4">
    {movies.map((movie) => (
      <div
        key={movie.id}
        className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-start"
      >
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-[80px] rounded-md"
          />
        )}
        <div>
          <h2 className="font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    ))}
  </div>

