import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import Swal from 'sweetalert2'; 
import { ToastContainer, toast } from 'react-toastify';


export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  


  const login = async (email, password,) => {
    setIsLoading(true)
    setError(null)


    try{
    const response = await fetch('https://capstone-project-api-backend.vercel.app/api/adminRoute/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', /*Authorization: `Bearer ${authToken}`*/},
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
    const json = await response.json()


    if (response.ok) {
      sessionStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      toast.success(`Welcome ${json.firstName}!`);
    } else if (response.status === 403) {
      Swal.fire({
        icon: 'warning',
        title: 'Multiple Admin Login Detected',
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




   /* //console.log('json',json)
    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }
    if (response.ok) {
      // save the user to local storage
      sessionStorage.setItem('user', JSON.stringify(json))
      //localStorage.setItem('role', json.role);

      //console.log('role',json.role)
      //console.log('Logged-in user:', json.firstName, json.lastName);

      //old authContext
      dispatch({type: 'LOGIN', payload: json})
      toast.success("Welcome " + json.firstName + "!");
      // update the auth context
      //dispatch({ type: 'LOGIN', payload: { user: json.user, role: json.role } });

    }

      // update loading state
      setIsLoading(false)
    }*/
  

  return { login, isLoading, error }
}