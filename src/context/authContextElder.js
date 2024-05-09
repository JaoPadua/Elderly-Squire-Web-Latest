import {createContext, useReducer,useEffect} from 'react'

export const ElderAuthContext = createContext()


export const authReducer = (state,action) =>{
    switch(action.type){
        case 'LOGIN':
            return { ...state, user: action.payload }; // Include user role in the state
          case 'LOGOUT':
            return { ...state, user: null };
        case 'CREATE':
        return{user:action.payload}
    
        default:
            return state
    }
    
}

export const ElderAuthContextProvider = ({children})=>{


  
    const [state, dispatch] = useReducer(authReducer,
        {user:null})

        useEffect(() => {
            const elder = JSON.parse(sessionStorage.getItem('elderUser'))
            //const role = JSON.parse(localStorage.getItem('user'))
        
            if (elder) {
            //dispatch({ type: 'LOGIN', payload: { user } });
              dispatch({ type: 'LOGIN', payload: elder }) 
            }
          }, [])

    
    
    //console.log('AuthContext State:', state)

    return(
        <ElderAuthContext.Provider value= {{...state,dispatch}}>
            {children}
        </ElderAuthContext.Provider>
    )

}