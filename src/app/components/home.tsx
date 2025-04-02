import Image from "next/image";

export default function Home() {
  return (
    <main className='bg-white'>
      {/* Hero Section */}
      <div className='bg-[url("/curve-bg-1.png")] sm:bg-[url("/curve-bg.png")] bg-cover bg-center bg-no-repeat text-white text-center py-16 px-4 mx-2 sm:mx-0'>
        <div className='z-10 relative pb-24'>
          <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
            Mining crypto is hard.
          </h1>
          <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
            Investing in crypto is risky.
          </h1>
          <h1 className='text-2xl md:text-3xl font-semibold'>
            Too many of us are left out of the cryptocurrency revolution...
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className='px-6 pt-16 pb-16 max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-between bg-white'>
        {/* Left Text Content */}
        <div className='max-w-lg text-left md:text-left mb-12 md:mb-0'>
          <h1 className='text-3xl md:text-4xl font-semibold text-[#783a8c] mb-4 md:w-[300px]'>
            Pi makes crypto mining easy.
          </h1>
          <h4 className='text-[18px] md:text-[20px] text-gray-700 mb-8 md:w-[350px]'>
            Breakthrough tech allows you to mine Pi on your phone without
            draining your battery.
          </h4>
          <button
            type='button'
            className='bg-[#783a8c] hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-transform duration-300 ease-in-out text-white font-medium py-3 px-6 rounded-md inline-flex items-center'
          >
            Learn The Tech Behind Pi
            <span className='ml-2'>→</span>
          </button>
        </div>
        {/* Right Image */}
        <div className='relative w-[100%] h-[100%] md:w-100 md:h-100'>
          <Image
            src='/pi-coin.webp'
            alt='Pi Coin on Smartphone'
            width={500}
            height={300}
            style={{ objectFit: "contain" }}
            priority
            className='hover:-translate-y-2 transition-transform duration-300 ease-in-out pointer-events-none'
          />
        </div>
      </div>
    </main>
  );
}
