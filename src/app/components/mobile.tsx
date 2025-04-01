import Image from "next/image";
import Link from "next/link";

export default function mobile() {
  return (
    <div className='bg-linear-to-r from-[#82358e] to-[#483e89]'>
      <div className='flex flex-col items-center w-[90%] mx-auto pb-[3rem] sm:flex-row sm:items-center sm:justify-around sm:w-[57%] sm:gap-36 sm:mx-auto sm:py-24'>
        {/* Image section */}
        <Image src='/phone.webp' alt='mobile' width={323} height={473} />
        {/* Download section */}
        <div>
          <h3 className='sm:text-[35px] text-yellow-500'>
            Download the mobile app to start mining today! Join now.
          </h3>
          <p className='text-white my-9'>
            Keep your money! Mining Pi is free. All you need is an invitation
            from an existing trusted member on the network. If you have an
            invitation you can download the mobile app below.
          </p>
          <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
            <Link href='#' className='w-full sm:w-auto'>
              <Image
                src='/google_play.png'
                alt='google-play'
                width={170}
                height={569}
                className='w-full h-auto'
              />
            </Link>
            <Link href='#' className='w-full sm:w-auto'>
              <Image
                src='/apple_store.png'
                alt='app-store'
                width={170}
                height={569}
                className='w-full h-auto'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
