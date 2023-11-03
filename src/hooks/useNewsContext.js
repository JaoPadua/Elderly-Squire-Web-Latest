import { NewsContext } from "../context/newsContext";
import { useContext } from "react";


export const useNewsContext = () =>{
    const context = useContext(NewsContext)
   
    if(!context) {
        throw Error('useNewsContext must be used inside an NewsContextProvider')
    }
    return context

}