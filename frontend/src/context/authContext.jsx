import axios from "axios";
import Cookies from 'js-cookie';
import { AppRoutes } from "../constant/constant";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            console.log("token==>", token);
            getUser();
        } else {
            setLoading(false);
            console.log("Else from AuthCOntet")
        }
    }, []);

    const getUser = () => {
        console.log("👀 Request bhejne wala hu...");

        axios.get(AppRoutes.getMyInfo, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then((res) => {
            console.log("resInGetUser==>", res);
            setUser(res?.data?.data);
        }).catch((err) => {
            console.log("errInGetUser==>", err);
            setUser(null);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    };
    // if (loading) {
    //     return <PageLoader center={true} />
    // }
    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

