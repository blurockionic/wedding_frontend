import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useAuthRedirect = (redirectPath = "/") => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
     
      navigate(redirectPath, { replace: true });
    }else{
      toast.error("You are not logged in. Please login to access this page.");
      navigate('/login', { replace: true });  // Redirect to login page if not logged in.
    }
  }, [isLoggedIn, navigate, redirectPath]);
};

export default useAuthRedirect;