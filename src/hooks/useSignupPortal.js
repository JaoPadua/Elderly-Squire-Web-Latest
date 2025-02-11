import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignupPortal = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://capstone-project-api-backend.vercel.app/api/elderPortal/ElderSignup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName, lastName, email, password, role})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'CREATE', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}