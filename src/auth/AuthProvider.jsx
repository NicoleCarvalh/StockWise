import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

function AuthProvider({children}) {
    const [credentials, setCredentials] = useState()

    useEffect(() => {
        const jsonData = localStorage.getItem("credentials")
        
        setCredentials(JSON.parse(jsonData))
    }, [])

    const isLogged = () => credentials == null ? false : true

    const handleCredentials = async (companyData, token) => {
        localStorage.removeItem("credentials")

        const credentialsToSave = {
            companyData,
            token
        }

        localStorage.setItem("credentials", JSON.stringify(credentialsToSave))

        setCredentials(credentialsToSave)
    }

    return (
        <AuthContext.Provider value={{credentials, isLogged, handleCredentials}}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext }