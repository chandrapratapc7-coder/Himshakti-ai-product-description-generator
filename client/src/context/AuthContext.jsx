import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api, { setAuthToken, loginUser, registerUser, getMe, logoutUser, googleLoginUrl } from '../services/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('himshakti_token'));
  const [loading, setLoading] = useState(true);

  const attachToken = (t) => {
    setAuthToken(t);
    if (t) {
      localStorage.setItem('himshakti_token', t);
    } else {
      localStorage.removeItem('himshakti_token');
    }
    setToken(t);
  };

  const fetchMe = async () => {
    try {
      const { data } = await getMe();
      setUser(data.user);
    } catch {
      attachToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchMe();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    attachToken(data.token);
    setUser(data.user);
    toast.success(`Welcome back, ${data.user.name}!`);
  };

  const register = async (name, email, password) => {
    const { data } = await registerUser({ name, email, password });
    attachToken(data.token);
    setUser(data.user);
    toast.success(`Welcome to HimShakti, ${data.user.name}!`);
  };

  const loginWithGoogle = () => {
    window.location.href = googleLoginUrl();
  };

  const setTokenFromOAuth = async (t) => {
    attachToken(t);
    await fetchMe();
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      attachToken(null);
      setUser(null);
      toast('Logged out', { icon: '👋' });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, loginWithGoogle, setTokenFromOAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

// Re-exported so existing imports of `{ api }` from AuthContext keep working
export { api };
