import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

// Route: /oauth/callback?token=...
// The Express backend redirects here after a successful Google OAuth flow.
export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const { setTokenFromOAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      toast.error('Google sign-in failed. Please try again.');
      navigate('/login', { replace: true });
      return;
    }

    setTokenFromOAuth(token)
      .then(() => {
        toast.success('Signed in with Google!');
        navigate('/dashboard', { replace: true });
      })
      .catch(() => {
        toast.error('Could not complete sign-in. Please try again.');
        navigate('/login', { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
