import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi } from '../services/api.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Fetch current user on mount if token exists ────────────────────────────
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await authApi.getMe();
          if (res.data?.success) {
            const fetchedUser = res.data.data.user;
            setUser(fetchedUser);
            localStorage.setItem('user', JSON.stringify(fetchedUser));
          }
        } catch {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // ── Login Action ────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(credentials);
      if (res.data?.success) {
        const { token: jwtToken, user: loggedUser } = res.data.data;
        setUser(loggedUser);
        setToken(jwtToken);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        setIsLoading(false);
        return loggedUser;
      } else {
        throw new Error(res.data?.message || 'Login failed');
      }
    } catch (err) {
      setIsLoading(false);
      const msg = err.response?.data?.message || err.message || 'Invalid credentials';
      throw new Error(msg);
    }
  }, []);

  // ── Register Action ─────────────────────────────────────────────────────────
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const res = await authApi.signup(userData);
      if (res.data?.success) {
        const { token: jwtToken, user: registeredUser } = res.data.data;
        setUser(registeredUser);
        setToken(jwtToken);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(registeredUser));
        setIsLoading(false);
        return registeredUser;
      } else {
        throw new Error(res.data?.message || 'Registration failed');
      }
    } catch (err) {
      setIsLoading(false);
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      throw new Error(msg);
    }
  }, []);

  // ── Logout Action ───────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, []);

  const isAuthenticated = Boolean(user && token);

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    setUser,
    setToken,
    setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export default AuthContext;
