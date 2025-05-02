import { Pagination } from "@/components/pagination";
import axios from "axios";
type Props = {
  params: { type : string };
  searchParams : { page? : string };
};

const MovieTypePage = async ({ params, searchParams }: Props) => {
  const axe = Number(searchParams.page) || 1 ;
   const res = await axios.get(`https://api.themoviedb.org/3/movie/${params.type}`, {
    params: {
      api_key: "7218121adc89327f121be3514953c73f",
      page : axe
    },
  });
  
  const { results, total_pages } = res.data;
  console.log(res.data);
  

  return (
    <div className="p-4 pt-[60px] bg-amber-100 ">
     <span className="  " >🖕</span>
       <h1 className="text-xl font-bold">movie turul: {params.type}</h1>
       <div className="grid grid-cols-5" >
         { results.slice(0,10).map( (m : any ) => (
           <div key={m.id} className="  " >
             <p> {m.title} </p>
             <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="" className=" w-[100px] h-[100px] " /> 
             </div>
           ) )

         }

       </div> 
      <Pagination currentPage={axe}  /> 

    </div> 
  );
};

export default MovieTypePage;
