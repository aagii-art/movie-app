
export const Footer2 = () => {

    return (
        <div className=" flex w-[100%] md:w-[50%] mt-[20px] md:m-0 " >
        <div className=" w-[70%] md-[50%] " >
            <p className=" text-white text-[14px] " >Contact Information</p>
            <div className=" flex items-center gap-[10px] my-[10px] " >
                <img src="/img/Wifi icon.png" alt=""  className=" w-[16px] h-[16px] " />
                <div>
                    <p className=" text-14px text-white " > Email: </p>
                    <p className=" text-[14px] text-[#FAFAFA] " > support@movieZ.com </p>
                </div>
            </div>
            <div className=" flex gap-[10px] items-center " >
                <img src="/img/phoneicon.png" alt=""  className=" w-[16px] h-[16px] " />
                <div>
                    <p className=" text-14px text-white " >Phone: </p>
                    <p className=" text-[14px] text-[#FAFAFA] " > +976 94993181 </p>
                </div>
            </div>
        </div>
        <div>
            <div className=" text-white text-[14px] mb-[10px] "  >
              Follow us
            </div>
            <div className=" md:flex md:gap-[10px] flex flex-col gap-[20px] " >
                <p className=" text-white text-[14px] " >Facebook</p>
                <p className=" text-white text-[14px] " >Instagram</p>
                <p className=" text-white text-[14px] " >Twitter</p>
                <a  href="https://www.youtube.com/watch?v=CQinsuKbGRk&list=RDMM&index=10 " className=" text-white text-[14px] underline " >Youtube</a>
            </div>
        </div>
        </div>
    )
}