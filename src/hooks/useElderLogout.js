import {useAuthContext} from './useAuthContext'
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
}
    
