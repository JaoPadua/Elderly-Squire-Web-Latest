import {useAuthContext} from './useAuthContext'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {useEffect } from 'react'

export const useLogout= () =>{

    const {dispatch} = useAuthContext()
    const navigate = useNavigate();
    const logout= async ()=>{

        try {
            const adminUser = JSON.parse(sessionStorage.getItem('user'));

            if (!adminUser) {
                // If elderUser is not found in session storage, assume the user is already logged out
                navigate('/loginDisplay');
                return;
            }

            const { email } = adminUser; // Extract email from admin object

            const response = await fetch('https://capstone-project-api-backend.vercel.app/api/adminRoute/logoutAdmin', {
                method: 'POST',
                credentials: 'include', // Send cookies, required for session handling
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if(response.ok){
                // remove user from storage
                sessionStorage.removeItem('user')
                //dispatch logout Action
                dispatch({type: 'LOGOUT'})

                 // Show success message
                 Swal.fire({
                     icon: 'success',
                     title: 'Logged out successfully',
                     showConfirmButton: false,
                     timer: 1500
                     
                 });
                 navigate('/loginDisplay');
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Logout failed',
                    text: 'Failed to logout. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error during logout:', error);
            Swal.fire({
                icon: 'error',
                title: 'Logout failed',
                text: 'Something went wrong. Please try again later.'
            });
        }
            
        }

          // Add the beforeunload event listener to trigger logout when the browser is closed
    useEffect(() => {
        const handleBeforeUnload = async (event) => {
            await logout();
        };
    
        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Empty dependency array ensures that this effect runs only once
    
     
    

    return {logout}
}