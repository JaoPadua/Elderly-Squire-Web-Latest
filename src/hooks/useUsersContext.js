import { usersContext } from "../context/usersContext";
import { useContext } from "react";


export const useUsersContext = () =>{
    const context = useContext(usersContext)
   
    if(!context) {
        throw Error('useUserContext must be used inside an UserContextProvider')
    }
    return context

}