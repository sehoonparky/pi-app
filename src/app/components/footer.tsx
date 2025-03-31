import Image from "next/image";
import Link from "next/link";

export default function footer() {
  return (
    <div className='bg-[#252525]'>
      <main className='flex flex-col sm:items-center justify-around sm:flex sm:flex-row sm:pb-16 sm:pt-14 ml-4 mr-4'>
        {/*Left Section*/}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-14 sm:gap-10 mt-10 mb-10'>
          {/* First Column */}
          <ul className='flex flex-col gap-4 sm:text-2xl'>
            <li>
              <Link href='/pi-whitepaper'>Pi Whitepaper</Link>
            </li>
            <li>
              <Link href='/support-&-faq'>Support & FAQ</Link>
            </li>
            <li>
              <Link href='/community'>Community Code of Conduct</Link>
            </li>
            <li>
              <Link href='/terms-of-service'>Terms of Service</Link>
            </li>
          </ul>
          {/* Second Column */}
          <ul className='flex flex-col gap-4 sm:text-2xl'>
            <li>
              <Link href='/privacy-policy'> Privacy Policy</Link>
            </li>
            <li>
              <Link href='/developer-terms'>Developer Terms of Use</Link>
            </li>
            <li>
              <Link href='/pi-trademark'>Pi Trademark</Link>
            </li>
            <li>
              <Link href='/safety-center'>Safety Center</Link>
            </li>
          </ul>
        </div>
        {/* Logo Section */}
        <Image
          src='/Pi-Network.png'
          alt='pi newtwork'
          width={320}
          height={120}
          className='mt-16 mb-52'
        />
      </main>
    </div>
  );
}
