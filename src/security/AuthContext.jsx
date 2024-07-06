import { createContext, useContext } from "react";

export const AuthContext = createContext();


export default function Auth(){
    return(
        useContext(AuthContext)
    );
}


