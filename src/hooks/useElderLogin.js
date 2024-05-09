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


    //const authToken = localStorage.getItem('authToken');
 
        // Include the token in the headers


    const response = await fetch('http://localhost:8080/api/elderPortal/ElderLogin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', /*Authorization: `Bearer ${authToken}`*/},
      body: JSON.stringify({ email, password})
    })
    const json = await response.json()

    //console.log('json',json)
    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }
    if (response.ok) {
      // save the user to local storage
      sessionStorage.setItem('elderUser', JSON.stringify(json))
      //console.log('Logged-in elderUser:', json.firstName, json.lastName);
      //localStorage.setItem('role', json.role);
      //console.log('role',json.role)
      dispatch({type: 'ELDER_LOGIN', payload: json})
      toast.success("Welcome " + json.firstName + "!");
      // update loading state
      setIsLoading(false)
       // Display toast notification after successful login
       
     
    }
      
    }
  

  return { elderLogin, isLoading, error }
}