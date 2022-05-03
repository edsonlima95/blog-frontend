import { getCookie, removeCookies, setCookies } from "cookies-next";
import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";


//Tipagem 

type Credentials = {
    email: string,
    password: string
}

type AuthContext = {
    login: (credentials: Credentials) => Promise<void>,
}

type ContextProvider = {
    children: ReactNode
}

//Cria um context
const AuthContext = createContext({} as AuthContext)

export function logout() {
    
    removeCookies('blog.token')
    sessionStorage.removeItem('blog.token')
    Router.push("/admin/login")
    
}



export function AuthProvider({ children }: ContextProvider) {

    
    async function login({ email, password }: Credentials) {

     
            const response = await api.post("/login", { email, password })

            const { token, user } = response.data
    
            //Salva os tokens no cookie pq no next o localStorage nao e acessivel pelo getServerSideProps
            setCookies('blog.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: '/'
            })
            
            sessionStorage.setItem('blog.user',JSON.stringify(user))
    
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
    
            Router.push("/admin")
        
    }



    return (

        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>

    )

}

export default AuthContext