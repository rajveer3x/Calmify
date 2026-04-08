import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalmify } from '../context/CalmifyContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, authError, clearAuthError } = useCalmify();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setFormError('');
    clearAuthError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      const user = await login(formState);
      const hasTriggers = Array.isArray(user?.triggers) && user.triggers.length > 0;
      navigate(hasTriggers ? '/dashboard' : '/onboarding');
    } catch (error) {
      setFormError(error.response?.data?.message || 'Unable to sign in right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-serene-bg px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-serene-lowest p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(42,52,53,0.08)] relative z-10">
        
        <div className="text-center mb-10">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary to-primary-container rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
            <span className="text-4xl font-light text-white">C</span>
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-on-surface">
            Welcome to Calmify
          </h2>
          <p className="mt-3 text-on-surface/60 font-light">
            Your digital sanctuary for mindfulness.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="appearance-none rounded-full block w-full px-6 py-4 bg-serene-low placeholder-outline-variant text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formState.password}
                onChange={handleChange}
                className="appearance-none rounded-full block w-full px-6 py-4 bg-serene-low placeholder-outline-variant text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                placeholder="Password"
              />
            </div>
          </div>

          {(formError || authError) ? (
            <p className="text-sm text-red-600 font-medium px-2">
              {formError || authError}
            </p>
          ) : null}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-4 px-4 rounded-full text-white bg-gradient-to-r from-primary to-primary-dim font-bold tracking-widest uppercase text-sm hover:brightness-110 focus:outline-none transition-all duration-500 shadow-xl shadow-primary/20"
            >
              {isSubmitting ? 'Entering...' : 'Enter Sanctuary'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-container/20 rounded-l-[100px] blur-[120px] pointer-events-none -z-0" />
    </div>
  );
};

export default LoginPage;
