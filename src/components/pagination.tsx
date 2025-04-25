import Link from "next/link";
type Props = {
    currentPage : number;
    totalPages : number;
}

export const Pagination = ({ currentPage, totalPages }: Props) => {
  const pageNumbers = [];
  const startPage = Math.max( currentPage - 1, 1 );
  const endPage = Math.min( startPage + 2, 10 );
  for( let i = startPage; i <= endPage; i++ ){
    pageNumbers.push(i)
  } 
  return (
    <div className="flex gap-4 justify-center mt-40">
      {
        currentPage > 1 && (
          <Link 
            href={ `?page=${ currentPage -1 }` }
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"  >
              prev
          </Link>
        )
      }
      {startPage > 1 && (
        
        <Link
          href={`?page=1`}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          1
        </Link> )
      }
       { startPage - 2 > 1 &&  <span className="px-2">...</span> }

      { pageNumbers.map( (p) => (
        <Link 
          key={p}
          href={ `?page=${ p  }` }
          className={`px-3 py-1 rounded ${
            p === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"}`}
         >
          { p }
         </Link>
      ) )

      } 
      { currentPage < 10 && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
            Next
        </Link>
      )
        
      }
    </div>
  );
};
