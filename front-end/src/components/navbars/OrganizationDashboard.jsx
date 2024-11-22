const organizationDashboard = [
  { text: 'Home', link: '/' },
  { text: 'Requests', link: '/requests' },
  { text: 'Approved Volunteers', link: '/volunteers' },
  { text: 'Pending Volunteers', link: '/applications' },
];

function OrganizationDashboard() {
  return (
    <div>
      <nav>
        <ul>
          {organizationDashboard.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default OrganizationDashboard;
