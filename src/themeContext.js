import {createContext, useState} from "react";

export const DarkModeContext = createContext()

//Provider:
export const DarkModeProvider = ({children}) => {
    const [ darkMode, setDarkMode ] = useState(false)
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }
    return (
        <DarkModeContext.Provider value={ { darkMode, toggleDarkMode } }>
            { children }
        </DarkModeContext.Provider>
    )
}