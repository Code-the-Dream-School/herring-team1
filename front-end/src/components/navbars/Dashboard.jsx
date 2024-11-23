import VolunteerDashboard from './VolunteerDashboard.jsx';
import OrganizationDashboard from './OrganizationDashboard.jsx';
import { useAuth } from '../../context/useAuth.jsx';

function Dashboard() {
  const { user } = useAuth();
  console.log(user);

  return user.isOrganization ? <OrganizationDashboard /> : <VolunteerDashboard />;
}

export default Dashboard;
