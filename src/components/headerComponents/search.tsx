import { Input } from "../ui/input";

{
  Input;
}

export const SearchInput = ({
  clickEnter,
  searchMovie,
}: {
  clickEnter: () => void;
  searchMovie: any;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clickEnter();
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          clickEnter();
        }}
      >
        🔍
      </button>
      <Input
        placeholder="Search movies"
        onChange={(e) => searchMovie(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-[80%]"
      />
    </div>
  );
};
