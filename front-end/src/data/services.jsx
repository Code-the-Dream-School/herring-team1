import {
  FaUtensils,
  FaCar,
  FaGraduationCap,
  FaFutbol,
  FaLandmark,
  FaHome,
  FaBalanceScale,
  FaPalette,
  FaTheaterMasks,
  FaClinicMedical,
} from 'react-icons/fa';

export const servicesMap = [
  { value: 1, label: 'Food service', icon: <FaUtensils className="mr-2" /> },
  { value: 2, label: 'Transportation', icon: <FaCar className="mr-2" /> },
  { value: 3, label: 'Education', icon: <FaGraduationCap className="mr-2" /> },
  { value: 4, label: 'Sports&Recreation', icon: <FaFutbol className="mr-2" /> },
  { value: 5, label: 'Attractions', icon: <FaLandmark className="mr-2" /> },
  { value: 6, label: 'Housing&Facilities', icon: <FaHome className="mr-2" /> },
  { value: 7, label: 'Legal&Advocacy', icon: <FaBalanceScale className="mr-2" /> },
  { value: 8, label: 'Hobbies&Crafts', icon: <FaPalette className="mr-2" /> },
  { value: 9, label: 'Arts&Culture', icon: <FaTheaterMasks className="mr-2" /> },
  { value: 10, label: 'Health&Medicine', icon: <FaClinicMedical className="mr-2" /> },
];
