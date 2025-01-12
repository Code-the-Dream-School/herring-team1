import VolunteerDashboard from './VolunteerDashboard.jsx';
import OrganizationDashboard from './OrganizationDashboard.jsx';
import { useGlobal } from '../../context/useGlobal.jsx';

function Dashboard() {
  const { user } = useGlobal();

  return user.isOrganization ? <OrganizationDashboard /> : <VolunteerDashboard />;
}

export default Dashboard;
