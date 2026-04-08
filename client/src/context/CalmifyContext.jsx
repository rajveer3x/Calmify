import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import api, { getStoredToken, setStoredToken } from '../lib/api';

const CalmifyContext = createContext(null);

const normalizeResource = (resource) => ({
  ...resource,
  id: resource.id || resource._id,
});

export const CalmifyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [recommendedResources, setRecommendedResources] = useState([]);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isLoadingResources, setIsLoadingResources] = useState(false);
  const [authError, setAuthError] = useState('');
  const bootstrapAttempted = useRef(false);

  const clearSession = () => {
    setStoredToken(null);
    setCurrentUser(null);
    setRecommendedResources([]);
  };

  const fetchRecommendedResources = async () => {
    setIsLoadingResources(true);

    try {
      const { data } = await api.get('/resources/recommended');
      setRecommendedResources(data.map(normalizeResource));
      return data;
    } finally {
      setIsLoadingResources(false);
    }
  };

  const hydrateSession = async () => {
    if (!getStoredToken()) {
      setIsBootstrapping(false);
      return;
    }

    try {
      const [{ data: user }, { data: resources }] = await Promise.all([
        api.get('/users/me'),
        api.get('/resources/recommended'),
      ]);

      setCurrentUser(user);
      setRecommendedResources(resources.map(normalizeResource));
      setAuthError('');
    } catch (error) {
      clearSession();
      setAuthError(error.response?.data?.message || 'Your session has expired. Please sign in again.');
    } finally {
      setIsBootstrapping(false);
    }
  };

  useEffect(() => {
    if (bootstrapAttempted.current) {
      return;
    }

    bootstrapAttempted.current = true;
    hydrateSession();
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);

    setStoredToken(data.token);
    setCurrentUser(data.user);
    setAuthError('');

    const userHasTriggers = Array.isArray(data.user?.triggers) && data.user.triggers.length > 0;

    if (userHasTriggers) {
      await fetchRecommendedResources();
    } else {
      setRecommendedResources([]);
    }

    return data.user;
  };

  const completeOnboarding = async (triggers) => {
    const { data } = await api.post('/users/onboarding', { triggers });
    setCurrentUser(data);
    await fetchRecommendedResources();
    return data;
  };

  const logout = () => {
    clearSession();
    setAuthError('');
  };

  const value = {
    authError,
    clearAuthError: () => setAuthError(''),
    completeOnboarding,
    currentUser,
    fetchRecommendedResources,
    isAuthenticated: Boolean(currentUser && getStoredToken()),
    isBootstrapping,
    isLoadingResources,
    login,
    logout,
    recommendedResources,
  };

  return <CalmifyContext.Provider value={value}>{children}</CalmifyContext.Provider>;
};

export const useCalmify = () => {
  const context = useContext(CalmifyContext);

  if (!context) {
    throw new Error('useCalmify must be used within a CalmifyProvider');
  }

  return context;
};
