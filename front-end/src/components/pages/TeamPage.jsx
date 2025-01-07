//TeamPage
import johnImage from '../../assets/teammembers/john.jpg';
import kjImage from '../../assets/teammembers/kj.jpg';
import irynaImage from '../../assets/teammembers/iryna.jpg';
import veraImage from '../../assets/teammembers/vera.jpg';
import oxanaImage from '../../assets/teammembers/oxana.jpg';
import mariyaImage from '../../assets/teammembers/mariya.jpg';
import oksanaImage from '../../assets/teammembers/oksana.jpg';

const mentors = [
  {
    name: 'John McGarvey',
    description: 'Mentor',
    image: johnImage,
  },
  {
    name: 'KJ Loving',
    description: 'Mentor',
    image: kjImage,
  },
];

const teamMembers = [
  {
    name: 'Iryna Kolhanova',
    description: 'Full Stack Developer',
    image: irynaImage,
    github: 'https://github.com/IrynaKolh',
  },
  {
    name: 'Vera Fesianava',
    description: 'Full Stack Developer',
    image: veraImage,
    github: 'https://github.com/verafes',
  },
  {
    name: 'Oxana Michkasova',
    description: 'Designer Full Stack Developer',
    image: oxanaImage,
    github: 'https://github.com/oxangyal',
  },
  {
    name: 'Mariya Doronkina',
    description: 'Full Stack Developer',
    image: mariyaImage,
    github: 'https://github.com/mariyador',
  },
  {
    name: 'Oksana Feterovskaya',
    description: 'Full Stack Developer',
    image: oksanaImage,
    github: 'https://github.com/ofeterovskaya',
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen p-8 overflow-hidden">
      <h1 className="text-4xl font-bold bg-purple text-white text-center mb-8 p-4 rounded-lg">CareConnect Creators</h1>

      <h2 className="text-2xl font-semibold mb-4 text-center">Mentors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {mentors.map((mentor, index) => (
          <div key={index} className="p-4 rounded-lg shadow-custom text-center">
            <img src={mentor.image} alt={mentor.name} className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-bold">{mentor.name}</h3>
            <p>{mentor.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-center">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {teamMembers.slice(0, 3).map((member, index) => (
          <div key={index} className="p-4 rounded-lg shadow-custom text-center">
            <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p>{member.description}</p>
            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-purple hover:underline">
              GitHub
            </a>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.slice(3).map((member, index) => (
          <div key={index} className="p-4 rounded-lg shadow-custom text-center">
            <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p>{member.description}</p>
            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-purple hover:underline">
              GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
