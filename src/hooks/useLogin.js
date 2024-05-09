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


    //const authToken = localStorage.getItem('authToken');
 
        // Include the token in the headers


    const response = await fetch('http://localhost:8080/api/adminRoute/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', /*Authorization: `Bearer ${authToken}`*/},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    //console.log('json',json)
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
    }
  

  return { login, isLoading, error }
}