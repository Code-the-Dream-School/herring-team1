import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div className="bg-background">
      {/*Hero*/}
      <div className="relative">
        <img src="src/assets/handsnarow.jpg" alt="Holding hands" className="w-full h-auto object-cover" />

        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
          <div className="text-left pl-8 mr-80 pt-8 hidden md:flex">
            <h1 className="text-gray-800  md:text-xl lg:text-2xl xl:text-3xl max-w-2xl">
              At <span className="font-bold">Care Connect</span>, we are devoted to enriching the lives of seniors by
              facilitating vital connections to essential support and resources.
            </h1>
          </div>

          <div className="space-x-8 justify-end items-end pr-8 pb-8 hidden sm:flex">
            <Link to="/login">
              <button
                className="bg-orangeButton text-gray-800 font-bold rounded-lg transition hover:bg-gray-400
    w-full sm:w-[150px] md:w-[250px] lg:w-[300px]
    h-8 sm:h-10 md:h-14 lg:h-16
    text-sm sm:text-sm md:text-md lg:text-lg"
              >
                Become a Volunteer
              </button>
            </Link>
            <Link to="/login">
              <button
                className="bg-yellowButton text-gray-800 font-bold rounded-lg transition hover:bg-gray-400
    w-full sm:w-[150px] md:w-[250px] lg:w-[300px]
    h-8 sm:h-10 md:h-14 lg:h-16
    text-sm sm:text-sm md:text-md lg:text-lg"
              >
                Partner with Us!
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mission section*/}
      <div className="py-12 bg-background">
        <div className="text-center mb-12">
          <h2 id="mission" className="font-bold text-gray-800 sm:text-sm md:text-lg lg:text-2xl">
            Our Mission
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 px-4">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 flex items-center justify-center">
              <img src="src/assets/old.png" alt="Old couple icon" />
            </div>
            <h3 className="sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold mt-6 h-16 text-gray-800">
              Promoting dignity and independence
            </h3>
            <p className="sm:text-sm md:text-md lg:text-lg mt-4 text-gray-800 items-start text-left">
              Our goal is to ensure that every senior has access to the help they need to live with dignity and
              independence. By fostering relationships between volunteers and organizations, we aim to create a
              supportive environment that enables s eniors to thrive.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 flex items-center justify-center">
              <img src="src/assets/handshake.png" alt="Hand shake icon" />
            </div>
            <h3 className="sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold mt-6 h-16 *:text-gray-800 ">
              Empowering connections
            </h3>
            <p className="sm:text-sm md:text-md lg:text-lg mt-4 text-gray-800 items-start text-left">
              We believe in the power of human connection. Our platform facilitates meaningful interactions that enrich
              the lives of seniors through companionship, assistance with daily tasks, and emotional support.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 flex items-center justify-center">
              <img src="src/assets/give-love.png" alt="Give love icon" />
            </div>
            <h3 className="sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold mt-6 h-16 text-gray-800 ">
              Building a caring community
            </h3>
            <p className="sm:text-sm md:text-md lg:text-lg mt-4 text-gray-800 items-start text-left">
              We are dedicated to cultivating a community of like-minded individuals and organizations committed to
              making a positive impact. Together, we can create a network of care that benefits both volunteers and the
              seniors they serve.
            </p>
          </div>
        </div>
      </div>

      {/* Volunteers Section */}
      <div className="py-12 bg-background">
        <div className="text-center mb-12">
          <h2 id="volunteers" className="font-bold text-gray-800 sm:text-sm md:text-lg lg:text-2xl">
            For Volunteers
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-4 items-start">
          <div className="flex justify-center">
            <img
              src="/src/assets/womanhelpsenior.jpg"
              alt="Volunteer woman helps with groceries"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="text-left">
            <p className="text-gray-800 sm:text-sm md:text-md lg:text-lg mb-12">
              Volunteering to assist seniors is a rewarding experience that benefits both you and those you serve. Your
              support can significantly enhance the quality of life for seniors who may feel isolated or need
              assistance. Helping others is proven to boost happiness and provide a sense of purpose, making a positive
              impact on your own life.
            </p>
            <Link to="/login">
              <button
                className="bg-orangeButton text-gray-800  font-bold rounded-lg transition hover:bg-gray-400
    w-full sm:w-[150px] md:w-[250px] lg:w-[300px]
    h-8 sm:h-10 md:h-14 lg:h-16
    text-sm sm:text-sm md:text-md lg:text-lg"
              >
                Become a Volunteer
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Organization Section */}
      <div className="py-12 bg-background mt-12 mb-12">
        <div className="text-center mb-12">
          <h2 id="organizations" className="font-bold text-gray-800 sm:text-sm md:text-lg lg:text-2xl">
            For Organizations
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 items-start">
          <div className="text-left space-y-4">
            <p className="text-gray-800 sm:text-sm md:text-md lg:text-lg mb-12">
              Partnering with us to assist seniors is a fulfilling opportunity that benefits both your organization and
              the community. Your involvement can expand your reach and improve the quality of life for seniors in need
              of support. Collaborating with dedicated volunteers can enhance your services, foster community
              connections, and create a lasting positive impact for both your organization and those you serve.
            </p>
            <Link to="/login">
              <button
                className="bg-yellowButton text-gray-800 font-bold rounded-lg transition hover:bg-gray-400
    w-full sm:w-[150px] md:w-[250px] lg:w-[300px]
    h-8 sm:h-10 md:h-14 lg:h-16
    text-sm sm:text-sm md:text-md lg:text-lg"
              >
                Partner with Us!
              </button>
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src="src/assets/oldmanwalker.jpg"
              alt="Old man walks with support"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
