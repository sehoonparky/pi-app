export default function Featured() {
  return (
    <div className='bg-white'>
      <div className='w-full max-w-6xl mx-auto py-16 px-'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6'>
          {/* Decentralized Card */}
          <div className='bg-white shadow-2xl p-8 flex flex-col items-center text-center w-[70%] sm:w-[90%] mx-auto'>
            <div className='w-16 h-16 mb-6'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-full h-full'
              >
                <path
                  d='M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeDasharray='1 3'
                />
                <path
                  d='M12 4C16.4183 4 20 7.58172 20 12'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
                <circle cx='12' cy='4' r='1' fill='#8e44ad' />
                <circle cx='4' cy='12' r='1' fill='#8e44ad' />
                <circle cx='12' cy='20' r='1' fill='#8e44ad' />
                <circle cx='20' cy='12' r='1' fill='#8e44ad' />
                <circle cx='18.1213' cy='5.87868' r='1' fill='#8e44ad' />
                <circle cx='5.87868' cy='18.1213' r='1' fill='#8e44ad' />
                <circle cx='5.87868' cy='5.87868' r='1' fill='#8e44ad' />
                <circle cx='18.1213' cy='18.1213' r='1' fill='#8e44ad' />
              </svg>
            </div>
            <h3 className='text-xl font-medium text-gray-700 mb-3'>
              Decentralized
            </h3>
            <p className='text-gray-500'>
              Secure, Immutable, non-counterfeitable and interoperable digital
              money.
            </p>
          </div>

          {/* Mobile First Card */}
          <div className='bg-white shadow-2xl p-8 flex flex-col items-center text-center w-[70%] sm:w-[90%] mx-auto'>
            <div className='w-16 h-16 mb-6'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-full h-full'
              >
                <rect
                  x='6'
                  y='2'
                  width='12'
                  height='20'
                  rx='2'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                />
                <path
                  d='M12 18H12.01'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
                <path
                  d='M17 8.5C18.1046 8.5 19 7.60457 19 6.5C19 5.39543 18.1046 4.5 17 4.5C15.8954 4.5 15 5.39543 15 6.5C15 7.60457 15.8954 8.5 17 8.5Z'
                  fill='white'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                />
                <path
                  d='M17 8.5L19.5 11'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <h3 className='text-xl font-medium text-gray-700 mb-3'>
              Mobile First
            </h3>
            <p className='text-gray-500'>
              Works on your mobile phone and does not drain your battery.
            </p>
          </div>

          {/* User & Planet-Friendly Card */}
          <div className='bg-white shadow-2xl p-8 flex flex-col items-center text-center w-[70%] sm:w-[90%] mx-auto'>
            <div className='w-16 h-16 mb-6'>
              <svg
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-full h-full'
              >
                <circle
                  cx='12'
                  cy='12'
                  r='8'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                />
                <path
                  d='M12 4C14.6667 7.33333 16 9.33333 16 12C16 14.6667 14.6667 16.6667 12 20'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                />
                <path
                  d='M12 4C9.33333 7.33333 8 9.33333 8 12C8 14.6667 9.33333 16.6667 12 20'
                  stroke='#8e44ad'
                  strokeWidth='1.5'
                />
                <path d='M4 12H20' stroke='#8e44ad' strokeWidth='1.5' />
              </svg>
            </div>
            <h3 className='text-xl font-medium text-gray-700 mb-3'>
              User & Planet-Friendly
            </h3>
            <p className='text-gray-500'>
              Easy to use, secure at scale, without the massive electrical
              waste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
