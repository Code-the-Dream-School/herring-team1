import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  const [imageHidden, setImageHidden] = useState(false);
  const [show404, setShow404] = useState(false);

  useEffect(() => {
    // Img disappears after 1 second
    const imageTimer = setTimeout(() => setImageHidden(true), 1000);

    // "404" appears after 10 seconds
    const textTimer = setTimeout(() => setShow404(true), 10000);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background relative">
      {/* Left section for image and 404 */}
      <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden flex items-center justify-center order-1 md:order-none">
        <img
          src="src\\components\\assets\\images_default\\404-1.jpg"
          alt="Sad elderly lady"
          className={`w-full h-full object-cover transition-opacity duration-[10000ms] ${
            imageHidden ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {show404 && (
          <div
            className={`absolute text-orange-500 font-bold transition-all duration-[2000ms] ${
              show404 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          >
            <span className="text-[6rem] sm:text-[10rem] md:text-[15rem] lg:text-[20rem]">404</span>
          </div>
        )}
      </div>

      {/* Right section for text and button */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-gray-800 text-center p-6 md:p-8 relative z-10 order-2 md:order-none">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-orange-500">
          Oops! Looks like we got lost.
        </h1>
        <p className="text-md sm:text-lg md:text-xl text-gray-600 mb-6">
          We could not find the page you are looking for. But do not worry, we will help you get back on track.
        </p>
        <p className="text-gray-600 opacity-60 text-sm">
          At Care Connect, we are here to guide and support you, always.
        </p>
        <div className="mb-6 animate-pulse">
          <span className="text-2xl sm:text-3xl font-semibold text-orange-400">❤️</span>
        </div>
        <Link to="/">
          <button
            className="bg-orangeButton text-gray-800 font-bold rounded-lg transition hover:bg-gray-400
            w-full sm:w-[150px] md:w-[250px] lg:w-[300px]
            h-10 sm:h-10 md:h-14 lg:h-16
            text-sm sm:text-md md:text-lg"
          >
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
