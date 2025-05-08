"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
type Props = {
    currentPage : number;
}

export const Pagination = ({ currentPage }: Props) => {

  const searchParams = useSearchParams();
  const pageNumbers = [];
  const id = searchParams.get("id");
  const query = searchParams.get("query"); 
  const urlGenreId = searchParams.get("genres");
  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min( startPage + 2, 10 );

  for( let i = startPage; i <= endPage; i++ ){
    pageNumbers.push(i)
  } 
  return (
    <div className=" dark:text-white flex gap-[10px] justify-center items-center ml-auto my-[20px] ">

      { currentPage > 1 && (
          <Link 
              href={`?genres=${urlGenreId}&query=${query}&page=${currentPage - 1}&id=${id}`}
              className=" hover:text-gray-500"  >
                   ◁ prev
          </Link> )}

      {startPage > 1 && (
        <Link
            href={`?genres=${urlGenreId}&query=${query}&page=1&id=${id}`}
            className={` px-[10px] ${ currentPage === 1
              ? "rounded-md border border-[#E4E4E7]"
              : "" }`} > 1
        </Link> )}
    
      { startPage - 1 > 1 &&  <span>...</span> }

      { pageNumbers.map( (p) => (
        <Link 
            key={p}
            href={`?genres=${urlGenreId}&query=${query}&page=${p}&id=${id}`}
            className={`px-[10px] ${ p === currentPage
                     ? "rounded-md border border-[#E4E4E7]"
                     : ""}`} > { p }
         </Link> ))}

       { currentPage < 10 && (
          <Link
              href={`?axe???????genres=${urlGenreId}&query=${query}&page=${currentPage + 1}&id=${id}`}
              className="rounded-md hover:text-gray-500" > Next ▷
          </Link> )}
      
    </div>
  );
};
