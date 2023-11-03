import { createContext, useReducer } from 'react'

export const NewsContext = createContext()

export const newsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return { 
        newss: action.payload 
      }
    case 'CREATE_NEWS':
      return { 
        newss: [action.payload, ...state.newss] 
      }
    default:
      return state
  }
}

export const NewsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, { 
    newss: null
  })
  
  return (
    <NewsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </NewsContext.Provider>
  )
}