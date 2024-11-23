import VolunteerDashboard from './VolunteerDashboard.jsx';
import OrganizationDashboard from './OrganizationDashboard.jsx';

function Dashboard() {
  const isOrganizarion = JSON.parse(sessionStorage.getItem('isOrganization'));
  return isOrganizarion ? <OrganizationDashboard /> : <VolunteerDashboard />;
}

export default Dashboard;
