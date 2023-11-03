import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)


    //const authToken = localStorage.getItem('authToken');
 
        // Include the token in the headers


    const response = await fetch('https://teal-cape-buffalo-sock.cyclic.app/api/adminRoute/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', /*Authorization: `Bearer ${authToken}`*/},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()


    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}