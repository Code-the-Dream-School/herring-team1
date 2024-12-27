import { services } from '../data/services';

export function formatServicesNames(orgServices) {
  if (!orgServices || orgServices.length === 0) {
    return 'No services available.';
  }

  // Map service IDs to service names and join them with ';'
  const serviceNames = orgServices.map((service) => {
    const serviceName = services.find((s) => s.id === service.service_id)?.name || '';
    return serviceName;
  });

  return serviceNames.join('; ');
}

export const formatStatus = (status) => {
  const requestStatus = {
    open: 'Open',
    in_progress: 'In progress',
    closed: 'Closed',
    canceled: 'Canceled',
  };

  return requestStatus[status] || status;
};
