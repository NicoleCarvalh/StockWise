import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

function AuthProvider({children}) {
    const [credentials, setCredentials] = useState(JSON.parse(localStorage.getItem("credentials")) ?? null)

    useEffect(() => {
        const jsonData = localStorage.getItem("credentials")
        
        setCredentials(JSON.parse(jsonData))
    }, [])

    // useEffect(() => {
    //     const jsonData = localStorage.getItem("credentials")
        
    //     setCredentials(JSON.parse(jsonData))
    // }, [credentials])

    const isLogged = () => {
        const jsonData = localStorage.getItem("credentials")

        return jsonData ? true : false
    }

    const handleCredentials = async (companyData, token) => {
        localStorage.removeItem("credentials")

        const credentialsToSave = {
            companyData,
            token
        }

        localStorage.setItem("credentials", JSON.stringify(credentialsToSave))

        setCredentials(credentialsToSave)
    }

    const logOut = () => {
        localStorage.removeItem("credentials")
    }

    const refreshCrendentials = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/company/validate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
        }).then(json => json.json()).then(data =>{
            if(data?.error) return
            
            if(data?.company) handleCredentials(data.company, data.token)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <AuthContext.Provider value={{credentials, isLogged, handleCredentials, logOut, refreshCrendentials}}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext }