import {createContext, useReducer,useEffect} from 'react'

export const AuthContext = createContext()


export const authReducer = (state,action) =>{
    switch(action.type){
        case 'LOGIN':
            return { ...state, user: action.payload }; // Include user role in the state
          case 'LOGOUT':
            return { ...state, user: null };
        case 'CREATE':
        return{user:action.payload}
        case 'ELDER_LOGIN': // New action type for elder users
        return { ...state, elderUser: action.payload };
        case 'ELDER_LOGOUT': // New action type for elder users
        return { ...state, elderUser: null };
    
        default:
            return state
    }
    
}

export const AuthContextProvider = ({children})=>{


  
    const [state, dispatch] = useReducer(authReducer,
        {user:null,
        elderUser: null
        })
        // Initialize elderUser to null

        useEffect(() => {
            const user = JSON.parse(sessionStorage.getItem('user'))
            const elderUser = JSON.parse(sessionStorage.getItem('elderUser'));
            //const role = JSON.parse(localStorage.getItem('user'))
        
            if (user) {
            //dispatch({ type: 'LOGIN', payload: { user } });
              dispatch({ type: 'LOGIN', payload: user }) 
            }
            if (elderUser) { // Check for elderUser in sessionStorage
                dispatch({ type: 'ELDER_LOGIN', payload: elderUser });
              }
          }, [])

    
    
    //console.log('AuthContext State:', state)

    return(
        <AuthContext.Provider value= {{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}