import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas';
import { useAuth } from '../../context/useAuth.jsx';
import { register } from '../../utils/apiReqests';

function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await register(values.email, values.password, values.confirmPassword, values.isOrganization);
      const auth = response.data;
      localStorage.setItem('user', JSON.stringify(auth.user));
      localStorage.setItem('x_csrf_token', response.headers.get('x-csrf-token'));
      setUser(auth.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: error.message || 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isOrganization: false,
    },
    validationSchema: registerSchema,
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

      <div>
        <label htmlFor="password_confirmation" className="block font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-4 border shadow-lg rounded-xl focus:outline-none focus:ring-2 ${
            touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'focus:ring-purple-500'
          }`}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
        )}
      </div>

      <div className="flex items-center justify-between md:p-5 flex-wrap">
        <label className="flex items-center sm:text-xl">
          <input
            type="radio"
            name="isOrganization"
            value={true}
            checked={values.isOrganization === true}
            onChange={() => handleChange({ target: { name: 'isOrganization', value: true } })}
            className="mr-2 border-gray-300 text-gray-600 focus:ring-gray-600"
          />
          Organization
        </label>
        <label className="flex items-center sm:text-xl">
          <input
            type="radio"
            name="isOrganization"
            value={false}
            checked={values.isOrganization === false}
            onChange={() => handleChange({ target: { name: 'isOrganization', value: false } })}
            className="mr-2 border-gray-300 text-gray-600 focus:ring-gray-600"
          />
          Volunteer
        </label>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-2/5 px-4 py-2 sm:text-xl bg-orange text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Loading...' : 'Register'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-2/5 px-4 py-2 sm:text-xl bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50"
        >
          Cancel
        </button>
      </div>

      {errors.submit && <div className="text-red-500 text-sm mt-2">{errors.submit}</div>}
    </form>
  );
}

export default Register;
