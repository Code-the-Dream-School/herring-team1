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
  FaQuestionCircle,
} from 'react-icons/fa';

// services array with icons
export const servicesMap = [
  { value: 1, name: 'Food service', icon: <FaUtensils className="mr-2" /> },
  { value: 2, name: 'Transportation', icon: <FaCar className="mr-2" /> },
  { value: 3, name: 'Education', icon: <FaGraduationCap className="mr-2" /> },
  { value: 4, name: 'Sports&Recreation', icon: <FaFutbol className="mr-2" /> },
  { value: 5, name: 'Attractions', icon: <FaLandmark className="mr-2" /> },
  { value: 6, name: 'Housing&Facilities', icon: <FaHome className="mr-2" /> },
  { value: 7, name: 'Legal&Advocacy', icon: <FaBalanceScale className="mr-2" /> },
  { value: 8, name: 'Hobbies&Crafts', icon: <FaPalette className="mr-2" /> },
  { value: 9, name: 'Arts&Culture', icon: <FaTheaterMasks className="mr-2" /> },
  { value: 10, name: 'Health&Medicine', icon: <FaClinicMedical className="mr-2" /> },
];

// format services
function formatServices(services) {
  if (!services || services.length === 0) {
    return 'No services available.';
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
      {services.map((service) => {
        // matching service from the servicesMap array
        const serviceDetails = servicesMap.find((s) => s.value === service.service_id);

        // adding icon and name from the servicesMap array
        const serviceIcon = serviceDetails?.icon || <FaQuestionCircle className="mr-2 text-gray-500" />;
        const serviceName = serviceDetails?.name || 'Unknown Service';

        return (
          <div key={service.id} className="flex items-center">
            {serviceIcon}
            <span>{serviceName}</span>
          </div>
        );
      })}
    </div>
  );
}

// format one service
export function formatService(serviceName) {
  // matching service from the servicesMap array
  const serviceDetails = servicesMap.find((s) => s.name === serviceName);

  // add icon and name from the servicesMap array
  const serviceIcon = serviceDetails?.icon || <FaQuestionCircle className="mr-2 text-gray-500" />;
  const formattedName = serviceDetails?.name || 'Unknown Service';

  return (
    <div className="flex items-center">
      {serviceIcon}
      <span>{formattedName}</span>
    </div>
  );
}

export function getServiceIcon(serviceName) {
  const serviceDetails = servicesMap.find((s) => s.name === serviceName);
  return serviceDetails?.icon;
}

export default formatServices;
