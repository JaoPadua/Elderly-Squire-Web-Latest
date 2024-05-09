import {createContext,useReducer} from 'react'


export const usersContext = createContext()

export const usersReducer = (state,action) =>{
    switch(action.type){
        case 'SET_USERS':
            return {
                Users:action.payload
            }

        case 'CREATE_USERS':
            return{
                Users: [action.payload, ...state.Users]
            }
        default:
        return state
    }
    
}


export const UsersContextProvider = ({children}) => {

const [state,dispatch] = useReducer(usersReducer, {
    Users: null
})

dispatch({Type:'Set_USERS', payload: [{},{}]})


    return (
        <usersContext.Provider value = {{...state,dispatch}}>
        {children}
        </usersContext.Provider>
    )
}