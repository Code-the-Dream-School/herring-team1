import { useState } from 'react';

import VolunteerProfile from '../pages/volunteer/VolunteerProfile.jsx';
import Volunteering from '../pages/volunteer/Volunteering.jsx';
import Favorites from '../pages/volunteer/Favorites.jsx';
import defaultProfileImage from '../assets/images_default/profile_default.jpg';

const volunteerDashboard = [
  { text: 'Profile', link: '/profile' },
  { text: 'Volunteering', link: '/organizations' },
  { text: 'Favorites', link: '/favorites' },
];

function VolunteerDashboard() {
  const [currentPage, setCurrentPage] = useState('Profile');
  const userProfileImage = null;

  const renderContent = () => {
    switch (currentPage) {
      case 'Profile':
        return <VolunteerProfile />;
      case 'Volunteering':
        return <Volunteering />;
      case 'Favorites':
        return <Favorites />;
      default:
        return <div>Select a page from the navigation.</div>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full flex-grow sm:justify-around mb-4">
      <div className="flex flex-col w-1/4">
        <div className="relative w-60 mx-auto mt-10 p-3">
          <img
            className="h-full w-full border rounded-[20px] object-cover"
            src={userProfileImage || defaultProfileImage}
            alt="Profile"
          />
          <label className="absolute bottom-0 right-0 bg-black text-white rounded-full p-3 cursor-pointer hover:bg-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(event) => console.log(event.target.files[0])}
            />
          </label>
        </div>
        <p className="flex justify-center items-center text-xs">Member since ...</p>
        <div>
          <nav className="ml-20 mt-10">
            <ul>
              {volunteerDashboard.map((item, index) => (
                <li
                  key={index}
                  className={`mt-2 cursor-pointer  ${currentPage === item.text ? 'text-purple font-bold' : 'text-gray-800'}`}
                  onClick={() => setCurrentPage(item.text)}
                >
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-2/3">{renderContent()}</div>
    </div>
  );
}

export default VolunteerDashboard;
