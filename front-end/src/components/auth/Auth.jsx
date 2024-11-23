import { Outlet, useLocation, Link } from 'react-router-dom';

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === '/auth/login';

  return (
    <main className="bg-main flex-grow flex justify-center p-6">
      <div className="w-full xs:max-w-xs md:max-w-lg md:p-8">
        <div className="relative flex justify-center sm:px-2 mb-6">
          <Link
            to="/auth/register"
            className={`w-1/2 p-4 shadow-lg font-title font-medium border-b-2 rounded-2xl text-2xl transition flex justify-center items-center
            ${!isLogin ? 'sm:z-10 bg-white border-purple-500 sm:-mr-8' : 'bg-light_grey text-purple-500 border-transparent hover:bg-gray-200'}`}
          >
            Register
          </Link>
          <Link
            to="/auth/login"
            className={`w-1/2 p-4 shadow-lg font-title font-medium border-b-2 rounded-2xl text-2xl transition flex justify-center items-center
            ${isLogin ? 'sm:z-10 bg-white border-purple-500 sm:-ml-8' : 'bg-light_grey text-purple-500 border-transparent hover:bg-gray-200'}`}
          >
            Login
          </Link>
        </div>
        <Outlet />
      </div>
    </main>
  );
}

export default Auth;
