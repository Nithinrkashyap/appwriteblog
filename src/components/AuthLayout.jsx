import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    console.log("authstatus in AuthLayout", authStatus);
    //&authstatus is false
    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

        //let authValue = authStatus === true ? true : false

        //* authentication is false  authStatus is false
        if (authentication && authStatus !== authentication) {
            console.log("authlayout 1");
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            console.log("authlayout 2");
            navigate("/")
        }
        console.log("authlayout end");
        setLoader(false)
        //^ loader is false
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

