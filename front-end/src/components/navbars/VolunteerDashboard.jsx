import { useState, useEffect } from 'react';
import VolunteerProfile from '../pages/volunteer/VolunteerProfile.jsx';
import Volunteering from '../pages/volunteer/Volunteering.jsx';
import Favorites from '../pages/volunteer/Favorites.jsx';
import defaultProfileImage from '../assets/images_default/profile_default.jpg';
import { getMyVolunteer, uploadProfileImage } from '../../utils/apiReqests';

const volunteerDashboard = [
  { text: 'Profile', link: '/profile' },
  { text: 'Volunteering', link: '/organizations' },
  { text: 'Favorites', link: '/favorites' },
];

function VolunteerDashboard() {
  const [currentPage, setCurrentPage] = useState('Profile');
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [registrationDate, setRegistrationDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        setLoading(true);
        const volunteerData = await getMyVolunteer();
        console.log(volunteerData);
        setUserProfileImage(volunteerData.profile_img?.url || defaultProfileImage);
        const formattedDate = new Date(volunteerData.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
        });
        setRegistrationDate(formattedDate);
      } catch (err) {
        console.error('Error fetching volunteer data:', err);
        setError('Failed to load volunteer data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const volunteerData = await getMyVolunteer();
      const response = await uploadProfileImage(volunteerData.id, file);
      setUserProfileImage(response.imageUrl || defaultProfileImage);
    } catch (err) {
      setError(err.error || 'Failed to upload image. Please try again.');
      console.error('Error uploading profile image:', err);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="flex flex-col md:flex-row w-full flex-grow sm:justify-around mb-4">
      <div className="flex flex-col w-full md:w-1/4">
        <div className="relative items-center xs:w-40 xl:w-60 mx-auto mt-20">
          <img
            className="w-full h-auto border rounded-[20px] object-cover"
            src={userProfileImage || defaultProfileImage}
            alt="Profile"
          />
          <label className="absolute bottom-0 right-0 bg-black text-white rounded-full p-3 cursor-pointer hover:bg-purple">
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
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
        {loading && <p className="text-center text-blue-500">Uploading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <p className="text-center text-xs mt-2 mb-10">Member since {registrationDate}</p>
        <div className="w-full">
          <nav className="flex flex-col sm:m-10 lg:m-20">
            <ul className="w-full">
              {volunteerDashboard.map((item, index) => (
                <li
                  key={index}
                  className={`py-2 cursor-pointer md:text-left xs:text-center ${
                    currentPage === item.text ? 'text-purple font-bold' : 'text-gray-800'
                  }`}
                  onClick={() => setCurrentPage(item.text)}
                >
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-full md:w-2/3">{renderContent()}</div>
    </div>
  );
}

export default VolunteerDashboard;
