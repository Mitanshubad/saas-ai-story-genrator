import React, { useState } from 'react';
import Description from './Description';

const Homepage = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State to track active carousel item index

  // Function to handle clicking on the previous button
  const handlePrevClick = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? 4 : prevIndex - 1));
  };

  // Function to handle clicking on the next button
  const handleNextClick = () => {
    setActiveIndex(prevIndex => (prevIndex === 4 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <div id="controls-carousel" className="relative w-full" data-carousel="static">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* Use activeIndex state to control visibility */}
          <div className={`duration-700 ease-in-out ${activeIndex === 2 ? 'block' : 'hidden'}`} data-carousel-item>
            <img src="https://www.shutterstock.com/image-photo/create-your-own-story-written-600nw-378537394.jpg" className="lg:object-none  absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          <div className={`duration-700 ease-in-out ${activeIndex === 1 ? 'block' : 'hidden'}`} data-carousel-item="active">
            <img src="https://www.shutterstock.com/image-photo/create-your-own-story-shown-260nw-2313986335.jpg" className="lg:object-none absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          <div className={`duration-700 ease-in-out ${activeIndex === 0 ? 'block' : 'hidden'}`} data-carousel-item>
            <img src="https://media.slidesgo.com/storage/56208764/responsive-images/0-create-your-own-story___media_library_original_655_368.jpg" className="lg:object-none  absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          <div className={`duration-700 ease-in-out ${activeIndex === 3 ? 'block' : 'hidden'}`} data-carousel-item>
            <img src="https://www.shutterstock.com/image-vector/your-story-matters-sign-on-260nw-2064525593.jpg" className="lg:object-none absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
          <div className={`duration-700 ease-in-out ${activeIndex === 4 ? 'block' : 'hidden'}`} data-carousel-item>
            <img src="https://c8.alamy.com/comp/R85AX4/word-writing-text-create-your-own-story-business-concept-for-be-the-creator-of-your-demonstratingal-destiny-and-chances-color-pages-of-open-book-phot-R85AX4.jpg" className="lg:object-none absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
          </div>
        </div>

        {/* Previous Button */}
        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={handlePrevClick}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        {/* Next Button */}
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={handleNextClick}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
       

       <Description/>


    </div>
  );
};

export default Homepage;
