import { useAuthContext } from './useAuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {useEffect } from 'react'

export const useElderLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const elderLogout = async () => {
        try {
            const elderUser = JSON.parse(sessionStorage.getItem('elderUser'));

            if (!elderUser) {
                // If elderUser is not found in session storage, assume the user is already logged out
                navigate('/ElderPortalLogin');
                return;
            }

            const { email } = elderUser; // Extract email from elderUser object

            const response = await fetch('https://capstone-project-api-backend.vercel.app/api/elderPortal/logout', {
                method: 'POST',
                credentials: 'include', // Send cookies, required for session handling
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                // Remove user from storage
                sessionStorage.removeItem('elderUser');

                // Dispatch logout action
                dispatch({ type: 'ELDER_LOGOUT' });

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Logged out successfully',
                    showConfirmButton: false,
                    timer: 1500
                    
                });
                navigate('/ElderPortalLogin');
            } else {
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
        await elderLogout();
    };

    // Add event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up event listener when component unmounts
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []); // Empty dependency array ensures that this effect runs only once



    
    return { elderLogout };
};



/*import {useAuthContext} from './useAuthContext'
import Swal from 'sweetalert2'; 

export const useElderLogout= () =>{

    const {dispatch} = useAuthContext()

    const elderLogout=()=>{
        // remove user from storage
        sessionStorage.removeItem('elderUser')
        
        //dispatch logout Action
        dispatch({type: 'ELDER_LOGOUT'})


       
    }
 
    return {elderLogout}
}*/
    
