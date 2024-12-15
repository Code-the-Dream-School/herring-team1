import { services } from '../data/services';

export function formatServices(orgServices) {
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

export function formatAddress(address) {
  const { address: street, city, state, zip_code } = address || {};

  return [street || '', city || '', state || '', zip_code || ''].filter(Boolean).join(', ');
}
