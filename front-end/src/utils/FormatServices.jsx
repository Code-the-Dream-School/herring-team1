import { FaQuestionCircle } from 'react-icons/fa';
import { servicesMap } from '../data/services.jsx';

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
        const serviceName = serviceDetails?.label || 'Unknown Service';

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
  const serviceDetails = servicesMap.find((s) => s.label === serviceName);

  // add icon and name from the servicesMap array
  const serviceIcon = serviceDetails?.icon || <FaQuestionCircle className="mr-2 text-gray-500" />;
  const formattedName = serviceDetails?.label || 'Unknown Service';

  return (
    <div className="flex items-center">
      {serviceIcon}
      <span>{formattedName}</span>
    </div>
  );
}

export function getServiceIcon(serviceName) {
  const serviceDetails = servicesMap.find((s) => s.label === serviceName);
  return serviceDetails?.icon;
}

export default formatServices;
