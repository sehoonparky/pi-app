"use client";

import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

export default function Hero() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isCentered, setIsCentered] = useState(true); // Track if it's in center
  const containerRef = useRef<HTMLDivElement>(null);
  const playButtonSize = 80; // w-20 = 80px

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const moveCursor = (e: MouseEvent) => {
      if (!containerRef.current) return;

      setIsCentered(false); // Play button is moving

      // Get the container's boundaries
      const rect = containerRef.current.getBoundingClientRect();

      // Check if mouse is inside the phone image
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return; // Don't update position if outside
      }

      // Calculate relative mouse position within the container
      const relativeX = e.clientX - rect.left - playButtonSize / 2;
      const relativeY = e.clientY - rect.top - playButtonSize / 2;

      // Ensure the button stays within the container
      const centerX = Math.min(
        Math.max(0, relativeX),
        rect.width - playButtonSize
      );
      const centerY = Math.min(
        Math.max(0, relativeY),
        rect.height - playButtonSize
      );

      setPosition({ x: centerX, y: centerY });
    };

    const resetToCenter = () => {
      setIsCentered(true);
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      setPosition({
        x: rect.width / 2 - playButtonSize / 2,
        y: rect.height / 2 - playButtonSize / 2,
      });
    };

    // Attach event listeners
    container.addEventListener("mousemove", moveCursor);
    container.addEventListener("mouseleave", resetToCenter);

    return () => {
      container.removeEventListener("mousemove", moveCursor);
      container.removeEventListener("mouseleave", resetToCenter);
    };
  }, []);

  return (
    <main className='bg-[#261339] sm:bg-[url("/main-bg.jpg")] sm-bg-cover sm-bg-center sm-bg-no-repeat min-h-screen relative '>
      <div className='container mx-auto max-w-[1425px] relative pb-[120px]'>
        <div className='px-4 lg:px-16'>
          <div className='flex flex-col lg:flex-row items-center justify-between pt-20 lg:mt-14'>
            {/* Left content */}
            <div className='lg:w-fit mt-32 '>
              <h1 className='text-white text-[29px] lg:text-[65px] font-bold leading-tight mb-8'>
                The First Digital Currency You Can Mine on Your Phone
              </h1>
              <p className='text-white text-[16px] lg:text-2xl mb-12'>
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
            <div className='hidden lg:block lg:w-1/2 mt-16 lg:mt-0'>
              <div
                className='relative inline-block group isolate'
                ref={containerRef}
              >
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
                      transition: isCentered
                        ? "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)" // Bouncy effect when returning
                        : "all 0.2s ease-out",
                    }}
                    className={`
                      flex items-center justify-center 
                      w-20 h-20 rounded-full 
                      border-2 border-white 
                      relative z-10 
                    `}
                  >
                    <FaPlay className='text-white text-xl ml-1 group-hover:text-opacity-80' />
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile Screen */}
            <div className='lg:hidden mt-16 mb-8'>
              <div className='bg-[url("/small-bg.jpg")] bg-cover bg-center bg-no-repeat min-w-[350px] h-[200px] relative'>
                {/* play button */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='bg-black/80 py-[20px] px-[48px] rounded-[20px]'>
                    <Link href='https://www.youtube-nocookie.com/watch?v=MsOaC61cR3U'>
                      <FaPlay className='text-white text-xl w-8 h-8' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
