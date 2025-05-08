"use client";
import axios from "axios";
const key = process.env.NEXT_PUBLIC_KEY;
import { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";
import { useParams, useSearchParams, useRouter } from "next/navigation";

const MovieTypePage = () => {
  const prms = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const axe = Number(searchParams.get("page")) || 1;
  const [results, setresults] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = ( !id || id === "null" )
          ? `https://api.themoviedb.org/3/movie/${prms.type}`
          : `https://api.themoviedb.org/3/movie/${prms.type}/similar`;
        const res = await axios(url, {
          params: {
            api_key: key,
            page: axe,
          },
        });
        setresults(res.data.results.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [prms.type, axe]);

  return (
    <div className=" flex flex-col min-h-[73vh] mt-[100px] w-[90%]">
      <p className="text-[30px] text-[#09090B] dark:text-white mb-[20px] font-semibold">
        { ( !id || id === "null" ) ? 
          prms.type
          : <span> More like this </span>
        }
      </p>
      <div className={`grid gap-[20px] grid-cols-2 md:grid-cols-5 `}>
        {results?.map((m) => (
          <div
              key={m.id}
              onClick={() => router.push(`/movieDetail/${m.id}`)}
              className=" rounded-lg bg-[#F4F4F5] pb-[20px] ">
              <img
                 className="rounded-t-lg "
                 src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
              />
              <p className=" text-[14px] ">
                 ⭐️ {m.vote_average}{" "}
                 <span className="text-[#71717A] text-[12px] ">/10</span>
              </p>
              <p className=" text-[18px] text-[#09090B] ">{m.title}</p>
          </div>
        ))}
      </div>
      <Pagination currentPage={axe} />
    </div>
  );
};
export default MovieTypePage;
