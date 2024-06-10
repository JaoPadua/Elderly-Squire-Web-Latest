import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { ToastContainer, toast } from 'react-toastify';


export const useElderLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
 


  const elderLogin = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://capstone-project-api-backend.vercel.app/api/elderPortal/ElderLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const json = await response.json();

      if (response.ok) {
        sessionStorage.setItem('elderUser', JSON.stringify(json));
        dispatch({ type: 'ELDER_LOGIN', payload: json });
        toast.success(`Welcome ${json.firstName}!`);
      } else if (response.status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Multiple Login Detected',
          text: 'You are already logged in from another session. Please log out from other sessions first.'
        });
      } else {
        setError(json.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  

  return { elderLogin, isLoading, error }
}