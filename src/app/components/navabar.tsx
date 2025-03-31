"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

import {
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [chevronStates, setChevronStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Toggle dropdown on click
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
    setChevronStates((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Handle mouse enter on dropdown items
  const handleMouseEnter = (linkName: string): void => {
    if (
      linkName === "Pi BlockChain" ||
      linkName === "Developers" ||
      linkName === "Community"
    ) {
      setActiveDropdown(linkName);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = (event: React.MouseEvent): void => {
    // Check if we're moving to the dropdown menu
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (dropdownRef.current?.contains(relatedTarget)) {
      return;
    }
    setActiveDropdown(null);
  };

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // on large screens (>= 1024px)
  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Pi BlockChain", hasChevron: true },
    { name: "Developers", hasChevron: true },
    { name: "About Us", hasChevron: false },
    { name: "Community", hasChevron: true },
    { name: "Support", hasChevron: false },
  ];

  // Dropdown content for each menu
  const dropdownContent = {
    "Pi BlockChain": [
      { name: "Pi Node", href: "/pi-nod/e" },
      { name: "Pi BlockExplorer", href: "/pi-block-explorer/" },
      { name: "Pi Whitepaper", href: "/pi-white-paper/" },
      { name: "Roadmap", href: "/pi-roadmap/" },
      { name: "Sign In", href: "/sign-in" },
    ],
    Developers: [
      { name: "New Developers", href: "/developers/" },
      { name: "Why Build on Pi", href: "/wh-buid-on-pi/" },
      { name: "Pi Hackathon", href: "/pi-hackathon/" },
      { name: "KYB Verified Businesses", href: "/kyb-list/" },
      { name: "KYB Your Business", href: "/kyb-business/" },
      { name: "Partner With Pi", href: "/partner/" },
    ],
    Community: [
      { name: "Blog", href: "/blog/" },
      { name: "Media Outreach", href: "/newsroom/" },
      { name: "Safety Center", href: "/safety/" },
    ],
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 w-full
        ${isScrollingUp ? "bg-[#261339]" : "lg:bg-[#593b8b]"}
        z-[1200] transition-colors duration-300
      `}
    >
      <div className='container mx-auto max-w-[1425px] transition-all duration-300'>
        <div className='px-4 sm:px-4 lg:px-8'>
          <nav className='flex justify-between items-center py-2 lg:mt-3.5'>
            {/* Logo */}
            <div className='flex items-center'>
              <Link
                href='/'
                className='relative w-[120px] h-[30px] md:w-[220px] md:h-[60px]'
              >
                <Image
                  src='/pi-network.webp'
                  alt='piLogo'
                  fill
                  sizes='(max-width: 412px) 100px, 220px'
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Link>
            </div>

            {/* Center Links (Desktop) */}
            <div
              className='hidden md:flex items-center space-x-8'
              ref={dropdownRef}
            >
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className='relative group'
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.hasChevron ? (
                    <button
                      type='button'
                      onClick={() => toggleDropdown(link.name)}
                      className='relative flex items-center text-stone-300 transition-colors focus:outline-none cursor-pointer'
                    >
                      <span className='relative group'>
                        {link.name}
                        <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-stone-300 transition-all duration-300 group-hover:w-full'></span>
                      </span>
                      <FaChevronDown className='ml-2 text-stone-300' />
                    </button>
                  ) : (
                    <Link
                      href='https://minepi.com/pi-blockchain/'
                      className='relative flex items-center text-stone-300 transition-colors cursor-pointer'
                    >
                      <span className='relative group'>
                        {link.name}
                        <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-stone-300 transition-all duration-300 group-hover:w-full'></span>
                      </span>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {link.hasChevron && activeDropdown === link.name && (
                    <div
                      className='absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-[101] opacity-100 transition-opacity duration-300'
                      onMouseEnter={() => setActiveDropdown(link.name)}
                    >
                      <div className='py-1'>
                        {dropdownContent[
                          link.name as keyof typeof dropdownContent
                        ].map((item, index) => (
                          <div key={index}>
                            <Link
                              href={item.href}
                              className='block px-4 py-2 text-sm text-gray-700'
                            >
                              <span className='relative inline-block before:content-[""] before:absolute before:block before:w-[0%] before:h-[2px] before:bottom-[-2px] before:left-0 before:bg-gray-700 before:transition-all before:duration-300 hover:before:w-[100%]'>
                                {item.name}
                              </span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Social Icons */}
              <ul className='flex items-center space-x-4 ml-4'>
                <li className='transition-transform hover:scale-125 duration-200'>
                  <Link
                    href='https://twitter.com/pi_network'
                    target='_blank'
                    className='text-stone-300 transition-colors'
                  >
                    <Image
                      src='/icons8-x.svg'
                      alt='x-icon'
                      width={20}
                      height={20}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.facebook.com/PiNetwork/'
                    target='_blank'
                    className='text-stone-300 transition-colors'
                  >
                    <FaFacebook size={20} className='' />
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.youtube.com/channel/UC5KVbmYpYhKkVjkRyUeRdbA'
                    target='_blank'
                    className='text-stone-300 transition-colors'
                  >
                    <FaYoutube size={20} />
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://www.instagram.com/pi_network/'
                    target='_blank'
                    className='text-stone-300 transition-colors'
                  >
                    <FaInstagram size={20} />
                  </Link>
                </li>
              </ul>

              {/* Search Link */}
              <span
                className='ml-6 px-6 py-2 text-stone-300 transition-colors cursor-pointer'
                onClick={() => setOpenSearch(!openSearch)}
              >
                <FaSearch size={24} />
              </span>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden flex items-center space-x-4 sticky ${
                isScrollingUp ? "bg-[#261339]" : "lg:bg-purple-950"
              }`}
            >
              <FaSearch size={24} onClick={() => setOpenSearch(!openSearch)} />
              <button
                type='button'
                onClick={toggleMenu}
                className='text-white transition-colors'
              >
                {isOpen ? (
                  <FaTimes size={24} className='z-[999]' />
                ) : (
                  <div>
                    <Image
                      src='/align-left.svg'
                      alt='hamburger-icon'
                      width={25}
                      height={25}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                )}
              </button>
            </div>

            {/* Sliding Drawer */}
            <div
              className={`md:hidden fixed top-0 right-0 w-full h-full bg-[#261339e5] z-50 p-6 transform transition-transform duration-300 ${
                isOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {/* Close button at the top */}
              <div className='flex justify-end mb-4'>
                <button
                  type='button'
                  onClick={toggleMenu}
                  className='text-white'
                  title='button'
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Mobile Nav Items */}
              <nav className='flex flex-col space-y-4 mb-6 mt-40'>
                {navLinks.map((link, index) => (
                  <div key={index} className='relative'>
                    <button
                      type='button'
                      onClick={() => toggleDropdown(link.name)}
                      className='flex items-center text-stone-300 transition-colors w-full text-left cursor-pointer'
                    >
                      {link.name}
                      {chevronStates[link.name] ? (
                        <FaChevronUp className='ml-2 text-stone-300' />
                      ) : (
                        <FaChevronDown className='ml-2 text-stone-300' />
                      )}
                    </button>

                    {/* Mobile Dropdown */}
                    {link.hasChevron && chevronStates[link.name] && (
                      <div className='pl-4 mt-2 space-y-2'>
                        {dropdownContent[
                          link.name as keyof typeof dropdownContent
                        ].map((item, index) => (
                          <Link
                            key={index}
                            href={item.href}
                            className='block py-1 text-sm text-stone-300 hover:text-white cursor-pointer'
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Social Icons (Mobile) */}
              <div className='flex items-center space-x-4 mt-20'>
                <Link
                  href='https://twitter.com/pi_network'
                  target='_blank'
                  className='text-stone-300 transition-colors'
                >
                  <Image
                    src='/icons8-x.svg'
                    alt='x-icon'
                    width={24}
                    height={24}
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </Link>
                <Link
                  href='https://www.facebook.com/PiNetwork/'
                  target='_blank'
                  className='text-stone-300 transition-colors'
                >
                  <FaFacebook size={24} />
                </Link>
                <Link
                  href='https://www.youtube.com/channel/UC5KVbmYpYhKkVjkRyUeRdbA'
                  target='_blank'
                  className='text-stone-300 transition-colors'
                >
                  <FaYoutube size={24} />
                </Link>
                <Link
                  href='https://www.instagram.com/pi_network/'
                  target='_blank'
                  className='text-stone-300 transition-colors'
                >
                  <FaInstagram size={24} />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/*Search Bar Mobile*/}
      <div className='w-full'>
        {openSearch && (
          <div
            className={clsx(
              "bg-[#593b8b] p-4 w-full transition-all duration-300 h-[150px]", // Base styles that apply to all screen sizes
              "absolute top-0 right-0 ", // Mobile styles (default)
              "sm:fixed sm:top-0 sm:left-0 sm:z-50 sm:h-[200px]" // Desktop styles (sm and above)
            )}
          >
            <div className='flex items-center justify-between border-b border-yellow-400 p-1 sm:w-[80vw] sm:mx-auto'>
              <input
                type='text'
                placeholder='Search'
                className={clsx(
                  "placeholder:text-white border-none outline-none bg-transparent text-white w-[90%] pb-2 pt-4",
                  "sm:mt-14 sm:placeholder:text-4xl"
                )}
              />
              <button
                type='button'
                title='button'
                onClick={() => setOpenSearch(!openSearch)}
                className='text-stone-300 pb-2'
              >
                <FaTimes size={20} className='cursor-pointer'/>
              </button>
            </div>

            <p
              className={clsx(
                "text-white text-2xl",
                "hidden",
                "sm:block sm:w-[80vw] sm:mx-auto sm:mt-3"
              )}
            >
              Hit enter to search or ESC to close
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
