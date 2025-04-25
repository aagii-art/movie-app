import { MovieData } from "@/components/movieData";
import { MovieSection } from "@/components/movieSection";

const Home = () => {
  return (
    <div className=" bg-gray-50 w-[100%] flex flex-col items-center ">
      <MovieData />
      <MovieSection type="upcoming" title="Upcoming" />
      <MovieSection type="popular" title="Popular" />
      <MovieSection type="top_rated" title="Top Rated" />
    </div>
  );
};

export default Home;
