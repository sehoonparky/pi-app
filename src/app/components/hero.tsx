"use client";

import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

// bg-[#261339]

export default function Hero() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Get the container's boundaries
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate relative mouse position within the container
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      // Calculate the center position of the play button
      const playButtonSize = 80; // w-20 = 80px
      const centerX = Math.min(
        Math.max(playButtonSize / 2, relativeX),
        rect.width - playButtonSize / 2
      );
      const centerY = Math.min(
        Math.max(playButtonSize / 2, relativeY),
        rect.height - playButtonSize / 2
      );

      // Adjust position to center the cursor on the play button
      setPosition({
        x: centerX - playButtonSize / 2,
        y: centerY - playButtonSize / 2,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <main className='bg-[url("/main-bg.jpg")] bg-cover bg-center bg-no-repeat min-h-screen'>
      <div className='container mx-auto max-w-[1425px]'>
        <div className=' px-4 lg:px-16'>
          <div className='flex flex-col lg:flex-row items-center justify-between pt-20 lg:mt-14'>
            {/* Left content */}
            <div className='lg:w-fit mt-32'>
              <h1 className='text-white text-4xl lg:text-[65px] font-bold leading-tight mb-8'>
                The First Digital Currency You Can Mine on Your Phone
              </h1>
              <p className='text-white text-xl lg:text-2xl mb-12'>
                Start mining Pi cryptocurrency today with our free, energy-light
                mobile app!
              </p>
              <Link
                href='https://minepi.com/#download'
                className='inline-block group'
                role='download'
              >
                <div className='border-2 border-yellow-400 py-4 px-10 transition-colors group-hover:bg-yellow-400 rounded-sm'>
                  <div className='flex items-center gap-2.5'>
                    <span className='text-yellow-400 text-lg font-medium transition-colors group-hover:text-white'>
                      Download Pi App Now
                    </span>
                    <FaDownload className='text-yellow-400 transition-colors group-hover:text-white' />
                  </div>
                </div>
              </Link>
            </div>

            {/* Right content - Phone image */}
            <div className='lg:w-1/2 mt-16 lg:mt-0'>
              <div className='relative inline-block group z-0' ref={containerRef}>
                <Image
                  src='/pi_video-6.webp'
                  alt='Image of a cell phone'
                  width={400}
                  height={733}
                  className='ml-auto transition-transform duration-300 ease-in-out group-hover:scale-115'
                  priority
                />

                <Link
                  href='https://www.youtube-nocookie.com/watch?v=MsOaC61cR3U'
                  className='absolute inset-0'
                >
                  <span className='sr-only'>Play Video</span>

                  {/* Moving Play Button */}
                  <div
                    style={{
                      position: "absolute",
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                    }}
                    className={`
              flex items-center justify-center 
              w-20 h-20 rounded-full 
              border-2 border-white 
            `}
                  >
                    <FaPlay className='text-white text-xl ml-1 group-hover:text-opacity-80' />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
