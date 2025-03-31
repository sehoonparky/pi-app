import Link from "next/link";

export default function Sticky() {
  return (
    <div className='bg-[#cccccc] fixed bottom-0 right-0 left-0 py-4 rounded-3xl'>
      <div className='flex flex-row sm:flex-row justify-between items-center mx-5 sm:mx-[80px]'>
        {/* Pi Network Section */}
        <div className='text-[#676767]'>
          <h3 className='font-black text-[14px]'>Pi Network</h3>
          <p className='font-normal text-[14px]'>Start mining. Easy as Pi!</p>
        </div>

        {/* Download Section */}
        <div className='bg-[#fbb44a] flex flex-row text-[#593b8b] pt-[5px] pb-[5px] pl-[15px] pr-[15px]'>
          <Link href='#'> Downlaod</Link>
        </div>
      </div>
    </div>
  );
}
