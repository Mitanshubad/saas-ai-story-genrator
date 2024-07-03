import React from 'react';
import { Link,NavLink } from 'react-router-dom';

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8 text-center bg-white ">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl  text-gray-900 k">
        Turn your imagination into a real story
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        create your own story by giving the imagnination to our platfrom , you will aslo get images realted to the incidence in pdf format ,click on start creation to genrate your story
      </p>
      <NavLink
     to="story-genration"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Start Creation
        <svg
          className="w-3.5 h-3.5 ml-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </NavLink>
    </div>
  );
};

export default Description;
