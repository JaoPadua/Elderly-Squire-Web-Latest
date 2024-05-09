import {useAuthContext} from './useAuthContext'


export const useLogout= () =>{

    const {dispatch} = useAuthContext()

    const logout=()=>{
        // remove user from storage
        sessionStorage.removeItem('user')

        //dispatch logout Action
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}