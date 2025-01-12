import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas';
import { useGlobal } from '../../context/useGlobal.jsx';
import { login, getMyOrganization, getMyVolunteer } from '../../utils/apiReqests';

function Login() {
  const navigate = useNavigate();
  const { dispatch } = useGlobal();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await login(values.email, values.password);
      const auth = response.data;
      localStorage.setItem('user', JSON.stringify(auth.user));
      localStorage.setItem('x_csrf_token', response.headers.get('x-csrf-token'));
      dispatch({ type: 'SET_USER', payload: auth.user });
      dispatch({ type: 'SET_IS_LOGGED_IN', payload: true });
      try {
        if (auth.user.isOrganization) {
          const response = await getMyOrganization();
          dispatch({ type: 'SET_MY_ORGANIZATION', payload: response.organization });
        } else {
          const response = await getMyVolunteer();
          dispatch({ type: 'SET_VOLUNTEER', payload: response.volunteer });
        }
      } catch (error) {
        console.log(error);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error.message || 'Login failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-4 border shadow-lg rounded-xl focus:outline-none focus:ring-2 ${
            touched.email && errors.email ? 'border-red-500' : 'focus:ring-purple-500'
          }`}
        />
        {touched.email && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-4 border shadow-lg rounded-xl focus:outline-none focus:ring-2 ${
            touched.password && errors.password ? 'border-red-500' : 'focus:ring-purple-500'
          }`}
        />
        {touched.password && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
      </div>

      <div className="flex justify-between pt-7">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-2/5 px-4 py-2 sm:text-xl bg-orange text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Loading...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-2/5 px-4 py-2 sm:text-xl bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50"
        >
          Cancel
        </button>
      </div>

      {/* Global form error */}
      {errors.submit && <div className="text-red-500 text-sm mt-2">{errors.submit}</div>}
    </form>
  );
}

export default Login;
