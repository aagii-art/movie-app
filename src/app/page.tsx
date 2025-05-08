import { MovieData } from "@/components/movieData";
import { MovieSection } from "@/components/movieSection";

const Home = () => {
  return (
    <div className="flex flex-col items-center ">
      <MovieData />
      <MovieSection type="upcoming" title="Upcoming" />
      <MovieSection type="popular" title="Popular" />
      <MovieSection type="top_rated" title="Top Rated" />
    </div>
  );
};
export default Home;
