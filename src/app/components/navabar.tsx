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
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    // Clear any existing timeout to close dropdown
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }

    if (
      linkName === "Pi BlockChain" ||
      linkName === "Developers" ||
      linkName === "Community"
    ) {
      setActiveDropdown(linkName);
    }
  };

  // Handle mouse leave with a small delay
  const handleMouseLeave = (): void => {
    // Set a small delay before closing the dropdown to prevent accidental closures
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay
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
      // Clear any existing timeout on cleanup
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Detect scroll direction - now for both mobile and desktop
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      lastScrollY.current = currentScrollY;
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
      { name: "Pi Node", href: "/pi-node/" },
      { name: "Pi BlockExplorer", href: "/pi-block-explorer/" },
      { name: "Pi Whitepaper", href: "/pi-white-paper/" },
      { name: "Roadmap", href: "/pi-roadmap/" },
      { name: "Sign In", href: "/sign-in" },
    ],
    Developers: [
      { name: "New Developers", href: "/developers/" },
      { name: "Why Build on Pi", href: "/why-build-on-pi/" },
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

  // Get background color based on scroll direction
  const getHeaderBgClass = () => {
    return isScrollingUp ? "bg-[#261339]" : "bg-[#593b8b]";
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 w-full
        ${getHeaderBgClass()}
        z-[1200] transition-colors duration-300
      `}
    >
      {/*Search Bar - Moved to top so it fully covers the navbar*/}
      {openSearch && (
        <div className='fixed top-0 left-0 right-0 bg-[#593b8b] p-4 w-full h-[150px] sm:h-[200px] z-[1300] transition-all duration-300'>
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
              onClick={() => setOpenSearch(false)}
              className='text-stone-300 pb-2'
            >
              <FaTimes size={20} className='cursor-pointer' />
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

      {/* Only show navbar content when search is not open */}
      {!openSearch && (
        <div className='container mx-auto max-w-[1425px] transition-all duration-300'>
          <div className='px-4 sm:px-4 lg:px-8'>
            <nav className='flex justify-between items-center py-2 lg:mt-3.5 overflow-visible'>
              {/* Logo */}
              <div className='flex items-center z-[999]'>
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
                        className='absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white z-[1300] opacity-100 transition-opacity duration-300 block'
                        onMouseEnter={() => handleMouseEnter(link.name)}
                        onMouseLeave={handleMouseLeave}
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
                    <div className='transform transition-transform duration-300 hover:-translate-y-2'>
                      <Link
                        href='https://twitter.com/pi_network'
                        target='_blank'
                        className='text-stone-300 block'
                      >
                        <Image
                          src='/icons8-x.svg'
                          alt='x-icon'
                          width={24}
                          height={24}
                          style={{ filter: "brightness(0) invert(1)" }}
                        />
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className='transform transition-transform duration-300 hover:-translate-y-2'>
                      <Link
                        href='https://www.facebook.com/PiNetwork/'
                        target='_blank'
                        className='text-stone-300 block'
                      >
                        <FaFacebook size={24} />
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className='transform transition-transform duration-300 hover:-translate-y-2'>
                      <Link
                        href='https://www.youtube.com/channel/UC5KVbmYpYhKkVjkRyUeRdbA'
                        target='_blank'
                        className='text-stone-300 block'
                      >
                        <FaYoutube size={24} />
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className='transform transition-transform duration-300 hover:-translate-y-2'>
                      <Link
                        href='https://www.instagram.com/pi_network/'
                        target='_blank'
                        className='text-white block'
                      >
                        <FaInstagram size={24} />
                      </Link>
                    </div>
                  </li>
                </ul>

                {/* Search Link */}
                <span
                  className='ml-6 px-6 py-2 text-white transition-colors cursor-pointer'
                  onClick={() => setOpenSearch(true)}
                >
                  <FaSearch size={24} />
                </span>
              </div>

              {/* Mobile Menu */}
              <div className={`md:hidden flex items-center space-x-4 z-[99]`}>
                <FaSearch
                  size={23}
                  className='text-white cursor-pointer'
                  onClick={() => setOpenSearch(true)}
                />
                {isOpen ? (
                  <button
                    type='button'
                    onClick={toggleMenu}
                    className='text-white'
                    title='button'
                  >
                    <FaTimes size={25} />
                  </button>
                ) : (
                  <button
                    title='button'
                    type='button'
                    onClick={toggleMenu}
                    className='text-white transition-colors'
                  >
                    <Image
                      src='/align-left.svg'
                      alt='hamburger-icon'
                      width={25}
                      height={25}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </button>
                )}
              </div>

              {/* Sliding Drawer */}
              <div
                className={`md:hidden fixed top-0 right-0 w-full h-full bg-linear-to-b from-[#5c4286] to-[#282131] opacity-90 z-50 p-6 transform transition-transform duration-300 ${
                  isOpen ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {/* Mobile Nav Items */}
                <nav className='flex flex-col space-y-4 mb-6 mt-40'>
                  {navLinks.map((link, index) => (
                    <div key={index} className='relative'>
                      {link.hasChevron ? (
                        // For links with dropdown content
                        <button
                          type='button'
                          onClick={() => toggleDropdown(link.name)}
                          className='flex items-center justify-between w-full text-white transition-colors text-left cursor-pointer text-[20px]'
                        >
                          <span>{link.name}</span>
                          <div>
                            {chevronStates[link.name] ? (
                              <FaChevronUp className='text-white' />
                            ) : (
                              <FaChevronDown className='text-white' />
                            )}
                          </div>
                        </button>
                      ) : (
                        // For links without dropdown content
                        <Link
                          href='#'
                          className='block w-full text-white text-[20px] py-2'
                        >
                          {link.name}
                        </Link>
                      )}

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

                {/* Social Icons */}
                <ul className='flex items-center space-x-4'>
                  <li className='relative group'>
                    <div className='transform transition-all duration-300 hover:-translate-y-2 overflow-hidden'>
                      <Link
                        href='https://twitter.com/pi_network'
                        target='_blank'
                        className='text-stone-300 flex items-center justify-center h-10 w-10 rounded-full hover:bg-white hover:bg-opacity-20'
                      >
                        <Image
                          src='/icons8-x.svg'
                          alt='x-icon'
                          width={24}
                          height={24}
                          style={{ filter: "brightness(0) invert(1)" }}
                        />
                      </Link>
                    </div>
                  </li>
                  <li className='relative group'>
                    <div className='transform transition-all duration-300 hover:-translate-y-2 overflow-hidden'>
                      <Link
                        href='https://www.facebook.com/PiNetwork/'
                        target='_blank'
                        className='text-stone-300 flex items-center justify-center h-10 w-10 rounded-full hover:bg-white hover:bg-opacity-20'
                      >
                        <FaFacebook size={24} />
                      </Link>
                    </div>
                  </li>
                  <li className='relative group'>
                    <div className='transform transition-all duration-300 hover:-translate-y-2 overflow-hidden'>
                      <Link
                        href='https://www.youtube.com/channel/UC5KVbmYpYhKkVjkRyUeRdbA'
                        target='_blank'
                        className='text-stone-300 flex items-center justify-center h-10 w-10 rounded-full hover:bg-white hover:bg-opacity-20'
                      >
                        <FaYoutube size={24} />
                      </Link>
                    </div>
                  </li>
                  <li className='relative group'>
                    <div className='transform transition-all duration-300 hover:-translate-y-2 overflow-hidden'>
                      <Link
                        href='https://www.instagram.com/pi_network/'
                        target='_blank'
                        className='text-stone-300 flex items-center justify-center h-10 w-10 rounded-full hover:bg-white hover:bg-opacity-20'
                      >
                        <FaInstagram size={24} />
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
