export const SearchInput = ({
  clickEnter,
  searchMovie,
  resetIsClickEnter,
  isButtonClicked,
  setIsButtonClicked,
  
 }: {
  clickEnter: any;
  searchMovie: any;
  resetIsClickEnter  : any;
  setIsButtonClicked : any;
  isButtonClicked: any
 }) => {

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      clickEnter();
    }
  };
  const handleButtonClick = () => {
  if (window.innerWidth < 768) {
    setIsButtonClicked(true);
  }
  clickEnter();
  };
  return (
    <div className={ `flex md:flex-1 h-[39px] ${ isButtonClicked ? "flex-1" : " " } border bg-white dark:bg-black dark:border-[#27272A] border-[#E4E4E7] items-center rounded-md ` } >

      <button
        onClick={ handleButtonClick }
        className=" mx-[10px] items-center flex justify-center w-[20px] h-[20px] "
      >
        🔍
      </button>

      <input
        placeholder="Search.."
        onChange={(e) => { searchMovie(e.target.value); resetIsClickEnter() } }
        onKeyDown={handleKeyDown}
        className={` w-[flex-1] py-[8px] md:block  border-none focus:outline-none placeholder dark:text-white
                   ${ isButtonClicked ? " block  " : " hidden " } `}
      />
      
       { isButtonClicked &&
         <button 
          className=" w-[16px] ml-auto h-[16px] dark:text-gray-400 flex items-center "
          onClick={ () => setIsButtonClicked(false)} >
             ✕
         </button> }

       </div>
  );
};
